import type {ContributionDay, ContributionMonth, ContributionsResponse} from "~/types/contributions";

const GITHUB_LOGIN = "zaralX"
const GITLAB_LOGIN = "zaralXlab"

const DAY_MS = 24 * 60 * 60 * 1000

const FETCH_TIMEOUT = 5000

export default defineCachedEventHandler(async (): Promise<ContributionsResponse> => {
    const [github, gitlab] = await Promise.all([
        getGithubDays().catch(() => null),
        getGitlabDays().catch(() => null)
    ])

    const {from, to} = getWindow(github)

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

/**
 * Границы скользящего года задаёт сам GitHub - забираем их из его же ответа,
 * чтобы сетка на сайте совпадала с календарём на профиле.
 */
function getWindow(github: Map<string, number> | null): {from: Date; to: Date} {
    const dates = github ? [...github.keys()].sort() : []

    if (dates.length) {
        return {from: parseISODate(dates[0]!), to: parseISODate(dates[dates.length - 1]!)}
    }

    const to = startOfDay(new Date())

    return {from: startOfWeek(new Date(to.getTime() - 364 * DAY_MS)), to}
}

/**
 * Календарь берём со страницы профиля, а не через GraphQL.
 * GraphQL с fine-grained токеном видит только те репозитории, на которые токен выдан,
 * и теряет вклады в чужие и организационные репозитории - на проде выходило 701 вместо 1499.
 */
async function getGithubDays(): Promise<Map<string, number>> {
    // from/to тут не работают: GitHub понимает их как "покажи календарный год"
    // и отдаёт 1 января - 31 декабря. Без параметров возвращается ровно скользящий год.
    const html: string = await $fetch(`https://github.com/users/${GITHUB_LOGIN}/contributions`, {
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

async function getGitlabDays(): Promise<Map<string, number>> {
    const token = process.env.GITLAB_TOKEN

    const data: Record<string, number> = await $fetch(`https://gitlab.com/users/${GITLAB_LOGIN}/calendar.json`, {
        headers: {
            "User-Agent": "zaralx-ru-app",
            ...(token ? {"PRIVATE-TOKEN": token} : {})
        },
        timeout: FETCH_TIMEOUT
    })

    const days = new Map<string, number>()

    for (const [date, count] of Object.entries(data ?? {})) {
        days.set(date, Number(count) || 0)
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

function parseISODate(date: string): Date {
    return new Date(`${date}T00:00:00Z`)
}

function toISODate(date: Date): string {
    return date.toISOString().slice(0, 10)
}
