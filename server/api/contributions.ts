import type {ContributionDay, ContributionMonth, ContributionsResponse} from "~/types/contributions";

const GITHUB_LOGIN = "zaralX"
const GITLAB_LOGIN = "zaralXlab"

const DAY_MS = 24 * 60 * 60 * 1000

const FETCH_TIMEOUT = 5000

export default defineCachedEventHandler(async (): Promise<ContributionsResponse> => {
    const to = startOfDay(new Date())
    const from = startOfWeek(new Date(to.getTime() - 364 * DAY_MS))

    const [github, gitlab] = await Promise.all([
        getGithubDays(from, to).catch(() => null),
        getGitlabDays(from, to).catch(() => null)
    ])

    const days: ContributionDay[] = []

    for (let time = from.getTime(); time <= to.getTime(); time += DAY_MS) {
        const date = toISODate(new Date(time))
        const githubCount = github?.get(date) ?? 0
        const gitlabCount = gitlab?.get(date) ?? 0

        days.push({
            date,
            count: githubCount + gitlabCount,
            github: githubCount,
            gitlab: gitlabCount,
            level: 0
        })
    }

    applyLevels(days)

    return {
        from: toISODate(from),
        to: toISODate(to),
        total: days.reduce((acc, day) => acc + day.count, 0),
        totals: {
            github: days.reduce((acc, day) => acc + day.github, 0),
            gitlab: days.reduce((acc, day) => acc + day.gitlab, 0)
        },
        sources: {
            github: github !== null,
            gitlab: gitlab !== null
        },
        months: buildMonths(days),
        weeks: buildWeeks(days)
    }
}, {
    name: "contributions",
    getKey: () => toISODate(new Date()),
    maxAge: 60 * 30,
    swr: true
});

async function getGithubDays(from: Date, to: Date): Promise<Map<string, number>> {
    const token = process.env.GITHUB_TOKEN

    return token
        ? await getGithubDaysByApi(from, to, token)
        : await getGithubDaysByCalendar(from, to)
}

async function getGithubDaysByApi(from: Date, to: Date, token: string): Promise<Map<string, number>> {
    const query = `query($login: String!, $from: DateTime!, $to: DateTime!) {
        user(login: $login) {
            contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                    weeks { contributionDays { date contributionCount } }
                }
            }
        }
    }`

    const data: any = await $fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "User-Agent": "zaralx-ru-app"
        },
        timeout: FETCH_TIMEOUT,
        body: {
            query,
            variables: {
                login: GITHUB_LOGIN,
                from: from.toISOString(),
                to: to.toISOString()
            }
        }
    })

    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
    if (!weeks) throw new Error("GitHub GraphQL: пустой календарь")

    const days = new Map<string, number>()

    for (const week of weeks) {
        for (const day of week.contributionDays ?? []) {
            days.set(day.date, Number(day.contributionCount) || 0)
        }
    }

    return days
}

async function getGithubDaysByCalendar(from: Date, to: Date): Promise<Map<string, number>> {
    const html: string = await $fetch(`https://github.com/users/${GITHUB_LOGIN}/contributions`, {
        query: {
            from: toISODate(from),
            to: toISODate(to)
        },
        headers: {
            "User-Agent": "zaralx-ru-app",
            "X-Requested-With": "XMLHttpRequest"
        },
        timeout: FETCH_TIMEOUT
    })

    const counts = new Map<string, number>()

    for (const match of html.matchAll(/<tool-tip[^>]*\sfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
        const text = match[2]!
        const amount = text.match(/^([\d,]+)\s+contribution/)

        counts.set(match[1]!, amount ? Number(amount[1]!.replace(/,/g, "")) : 0)
    }

    const days = new Map<string, number>()

    for (const match of html.matchAll(/<td[^>]*class="ContributionCalendar-day"[^>]*>/g)) {
        const cell = match[0]
        const date = cell.match(/data-date="([^"]+)"/)?.[1]
        const id = cell.match(/\sid="([^"]+)"/)?.[1]

        if (date) days.set(date, (id && counts.get(id)) || 0)
    }

    if (!days.size) throw new Error("GitHub: календарь не распознан")

    return days
}

async function getGitlabDays(from: Date, to: Date): Promise<Map<string, number>> {
    const token = process.env.GITLAB_TOKEN

    const data: Record<string, number> = await $fetch(`https://gitlab.com/users/${GITLAB_LOGIN}/calendar.json`, {
        headers: {
            "User-Agent": "zaralx-ru-app",
            ...(token ? {"PRIVATE-TOKEN": token} : {})
        },
        timeout: FETCH_TIMEOUT
    })

    const days = new Map<string, number>()
    const fromDate = toISODate(from)
    const toDate = toISODate(to)

    for (const [date, count] of Object.entries(data ?? {})) {
        if (date >= fromDate && date <= toDate) days.set(date, Number(count) || 0)
    }

    return days
}

function applyLevels(days: ContributionDay[]) {
    const active = days.filter(day => day.count > 0).map(day => day.count).sort((a, b) => a - b)
    if (!active.length) return

    const quartile = (part: number) => active[Math.min(active.length - 1, Math.floor(active.length * part))]!

    const thresholds = [quartile(0.25), quartile(0.5), quartile(0.75)]

    for (const day of days) {
        if (day.count <= 0) continue

        day.level = 1 + thresholds.filter(threshold => day.count > threshold).length
    }
}

function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
    const weeks: (ContributionDay | null)[][] = []

    for (const day of days) {
        const weekday = new Date(day.date).getUTCDay()

        if (!weeks.length || weekday === 0) weeks.push(new Array(7).fill(null))

        weeks[weeks.length - 1]![weekday] = day
    }

    return weeks
}

function buildMonths(days: ContributionDay[]): ContributionMonth[] {
    const formatter = new Intl.DateTimeFormat("ru-RU", {month: "short", timeZone: "UTC"})
    const months: ContributionMonth[] = []

    let previous = ""

    days.forEach((day, index) => {
        const date = new Date(day.date)
        const key = `${date.getUTCFullYear()}-${date.getUTCMonth()}`

        if (key === previous) return
        previous = key

        const column = Math.floor((index + new Date(days[0]!.date).getUTCDay()) / 7)

        if (months.length && column - months[months.length - 1]!.column < 3) return

        months.push({
            label: formatter.format(date).replace(".", ""),
            column
        })
    })

    return months
}

function startOfDay(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
}

function startOfWeek(date: Date): Date {
    return new Date(date.getTime() - date.getUTCDay() * DAY_MS)
}

function toISODate(date: Date): string {
    return date.toISOString().slice(0, 10)
}
