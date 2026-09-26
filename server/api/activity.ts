import type {
    ActivityChannel,
    ActivityEvent,
    ActivityFocus,
    ActivityResponse,
    ActivitySource,
    ActivityStats
} from "~/types/activity";

const GITHUB_LOGIN = "zaralX"
const GITLAB_LOGIN = "zaralXlab"

/** Год регистрации на GitHub - величина неизменная, за ней незачем ходить в API */
const GITHUB_SINCE = 2020

const FETCH_TIMEOUT = 5000
const FEED_LIMIT = 6
const FOCUS_WINDOW_DAYS = 30

interface RawEvent {
    id: string
    source: ActivitySource
    kind: "push" | "issue" | "pull" | "merged" | "review" | "release" | "repo"
    repo: string
    url: string
    message?: string
    date: string
    /** null - источник не сказал, сколько коммитов было в пуше */
    commits: number | null
    pushes: number
}

export default defineCachedEventHandler(async (): Promise<ActivityResponse> => {
    const problems: string[] = []
    const sources = {github: "failed" as ActivityChannel, gitlab: "failed" as ActivityChannel}

    const [github, gitlab, stats] = await Promise.all([
        getGithubEvents(problems, sources),
        getGitlabEvents(problems, sources),
        getGithubStats(problems)
    ])

    const raw = [...github, ...gitlab].sort((a, b) => b.date.localeCompare(a.date))

    return {
        focus: getFocus(raw),
        events: collapse(raw).slice(0, FEED_LIMIT),
        stats,
        sources,
        problems
    }
}, {
    name: "activity",
    getKey: () => "all",
    maxAge: 60 * 30,
    swr: true
});

function note(problems: string[], label: string, error: unknown) {
    const reason = error instanceof Error ? error.message : String(error)
    const short = `${label}: ${reason.slice(0, 160)}`

    // Дублируем в лог сервера - в ответе остаётся только короткая причина
    console.error(`[activity] ${short}`)
    problems.push(short)
}

// --- GitHub -----------------------------------------------------------------

/**
 * Сначала официальное API, при отказе - публичный Atom-фид с github.com.
 * Фид живёт на другом хосте и не знает про лимиты api.github.com,
 * поэтому переживает и блокировку по IP, и исчерпанный анонимный лимит.
 */
async function getGithubEvents(problems: string[], sources: ActivityResponse["sources"]): Promise<RawEvent[]> {
    try {
        const events = await getGithubEventsFromApi()
        sources.github = "api"
        return events
    } catch (error) {
        note(problems, "GitHub API (события)", error)
    }

    try {
        const events = await getGithubEventsFromAtom()
        sources.github = "atom"
        return events
    } catch (error) {
        note(problems, "GitHub Atom (события)", error)
        return []
    }
}

function githubHeaders() {
    const token = process.env.GITHUB_TOKEN

    return {
        "User-Agent": "zaralx-ru-app",
        "Accept": "application/vnd.github.v3+json",
        ...(token ? {"Authorization": `Bearer ${token}`} : {})
    }
}

async function getGithubEventsFromApi(): Promise<RawEvent[]> {
    const data: any[] = await $fetch(`https://api.github.com/users/${GITHUB_LOGIN}/events/public`, {
        query: {per_page: 100},
        headers: githubHeaders(),
        timeout: FETCH_TIMEOUT
    })

    return (data ?? [])
        .map(event => {
            const kind = githubApiKind(event)
            if (!kind) return null

            return {
                id: `gh-${event.id}`,
                source: "github" as const,
                kind,
                repo: event.repo.name,
                url: `https://github.com/${event.repo.name}`,
                message: event.payload?.issue?.title || event.payload?.pull_request?.title || event.payload?.release?.name || undefined,
                date: event.created_at,
                commits: event.payload?.size ?? event.payload?.commits?.length ?? 1,
                pushes: 1
            }
        })
        .filter((event): event is RawEvent => event !== null)
}

function githubApiKind(event: any): RawEvent["kind"] | null {
    switch (event.type) {
        case "PushEvent":
            return "push"
        case "IssuesEvent":
            return event.payload?.action === "opened" ? "issue" : null
        case "PullRequestEvent":
            if (event.payload?.pull_request?.merged) return "merged"
            return event.payload?.action === "opened" ? "pull" : null
        case "ReleaseEvent":
            return "release"
        case "CreateEvent":
            return event.payload?.ref_type === "repository" ? "repo" : null
        default:
            return null
    }
}

const ATOM_KINDS: Record<string, RawEvent["kind"]> = {
    push: "push",
    issue_created: "issue",
    pr_created: "pull",
    pr_merged: "merged",
    reviewcomment_create: "review",
    release_created: "release",
    repo_created: "repo"
}

async function getGithubEventsFromAtom(): Promise<RawEvent[]> {
    const xml: string = await $fetch(`https://github.com/${GITHUB_LOGIN}.atom`, {
        headers: {"User-Agent": "zaralx-ru-app"},
        timeout: FETCH_TIMEOUT,
        responseType: "text"
    })

    const events: RawEvent[] = []

    for (const entry of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
        const body = entry[1]!

        const id = body.match(/<id>tag:github\.com,\d+:([a-z_]+)\/(\d+)<\/id>/)
        const kind = id ? ATOM_KINDS[id[1]!] : undefined
        if (!id || !kind) continue

        const href = body.match(/<link[^>]+href="([^"]+)"/)?.[1]
        const repo = href?.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)/)?.[1]
        if (!repo) continue

        const published = body.match(/<published>([^<]+)<\/published>/)?.[1]
        const date = published ? new Date(published) : null
        if (!date || Number.isNaN(date.getTime())) continue

        events.push({
            id: `gh-${id[2]}`,
            source: "github",
            kind,
            repo,
            url: `https://github.com/${repo}`,
            date: date.toISOString(),
            commits: null,
            pushes: 1
        })
    }

    if (!events.length) throw new Error("фид не содержит понятных событий")

    return events
}

async function getGithubStats(problems: string[]): Promise<ActivityStats> {
    try {
        const profile: any = await $fetch(`https://api.github.com/users/${GITHUB_LOGIN}`, {
            headers: githubHeaders(),
            timeout: FETCH_TIMEOUT
        })

        return {publicRepos: profile?.public_repos ?? null, since: GITHUB_SINCE}
    } catch (error) {
        note(problems, "GitHub API (профиль)", error)
    }

    try {
        // На странице профиля счётчик лежит рядом с вкладкой Repositories
        const html: string = await $fetch(`https://github.com/${GITHUB_LOGIN}`, {
            headers: {"User-Agent": "zaralx-ru-app"},
            timeout: FETCH_TIMEOUT,
            responseType: "text"
        })

        const counter = html.match(/Repositories\s*<span title="([\d,]+)"/)?.[1]

        return {publicRepos: counter ? Number(counter.replace(/,/g, "")) : null, since: GITHUB_SINCE}
    } catch (error) {
        note(problems, "GitHub HTML (профиль)", error)
        return {publicRepos: null, since: GITHUB_SINCE}
    }
}

// --- GitLab -----------------------------------------------------------------

async function getGitlabEvents(problems: string[], sources: ActivityResponse["sources"]): Promise<RawEvent[]> {
    try {
        const token = process.env.GITLAB_TOKEN
        const headers = {
            "User-Agent": "zaralx-ru-app",
            ...(token ? {"PRIVATE-TOKEN": token} : {})
        }

        const user: any[] = await $fetch("https://gitlab.com/api/v4/users", {
            query: {username: GITLAB_LOGIN},
            headers,
            timeout: FETCH_TIMEOUT
        })

        const userId = user?.[0]?.id
        if (!userId) throw new Error("пользователь не найден")

        const data: any[] = await $fetch(`https://gitlab.com/api/v4/users/${userId}/events`, {
            query: {per_page: 30},
            headers,
            timeout: FETCH_TIMEOUT
        })

        sources.gitlab = "api"

        return (data ?? [])
            .filter(event => event.target_title && event.push_data)
            .map(event => ({
                id: `gl-${event.id}`,
                source: "gitlab" as const,
                kind: "push" as const,
                repo: event.target_title,
                url: `https://gitlab.com/${GITLAB_LOGIN}`,
                message: event.push_data?.commit_title || undefined,
                date: event.created_at,
                commits: event.push_data?.commit_count ?? 1,
                pushes: 1
            }))
    } catch (error) {
        note(problems, "GitLab API", error)
        return []
    }
}

// --- Сборка ------------------------------------------------------------------

/**
 * Пуши в один репозиторий за день сливаем в одну запись,
 * иначе лента превращается в шесть одинаковых строк.
 */
function collapse(events: RawEvent[]): ActivityEvent[] {
    const merged: RawEvent[] = []

    for (const event of events) {
        const previous = merged[merged.length - 1]

        if (previous && event.kind === "push" && previous.kind === "push"
            && previous.repo === event.repo && previous.date.slice(0, 10) === event.date.slice(0, 10)) {
            previous.commits = previous.commits === null || event.commits === null
                ? null
                : previous.commits + event.commits
            previous.pushes += event.pushes
            continue
        }

        merged.push({...event})
    }

    return merged.map(event => ({
        id: event.id,
        source: event.source,
        action: describe(event),
        repo: event.repo,
        url: event.url,
        message: event.message,
        date: event.date
    }))
}

function describe(event: RawEvent): string {
    switch (event.kind) {
        case "push":
            if (event.commits !== null) {
                return `запушил ${event.commits} ${plural(event.commits, ["коммит", "коммита", "коммитов"])} в`
            }

            return event.pushes > 1 ? `запушил ${event.pushes} раза в` : "запушил в"
        case "issue":
            return "открыл задачу в"
        case "pull":
            return "открыл pull request в"
        case "merged":
            return "влил pull request в"
        case "review":
            return "оставил ревью в"
        case "release":
            return "выпустил релиз в"
        case "repo":
            return "создал репозиторий"
    }
}

/**
 * "Сейчас пилю" - репозиторий, в который больше всего пушил за последний месяц.
 */
function getFocus(events: RawEvent[]): ActivityFocus | null {
    const since = Date.now() - FOCUS_WINDOW_DAYS * 24 * 60 * 60 * 1000

    interface Counter {
        repo: string
        url: string
        source: ActivitySource
        commits: number | null
        pushes: number
    }

    const counters = new Map<string, Counter>()

    for (const event of events) {
        if (event.kind !== "push" || new Date(event.date).getTime() < since) continue

        const counter = counters.get(event.repo)
            ?? {repo: event.repo, url: event.url, source: event.source, commits: 0, pushes: 0}

        counter.commits = counter.commits === null || event.commits === null
            ? null
            : counter.commits + event.commits
        counter.pushes += event.pushes

        counters.set(event.repo, counter)
    }

    const top = [...counters.values()].sort((a, b) => b.pushes - a.pushes)[0]
    if (!top) return null

    return {
        repo: top.repo,
        url: top.url,
        source: top.source,
        count: top.commits ?? top.pushes,
        unit: top.commits === null ? "pushes" : "commits"
    }
}

function plural(count: number, forms: [string, string, string]) {
    const tens = count % 100
    const ones = count % 10

    if (tens > 10 && tens < 20) return forms[2]
    if (ones === 1) return forms[0]
    if (ones > 1 && ones < 5) return forms[1]

    return forms[2]
}
