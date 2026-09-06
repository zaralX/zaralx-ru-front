import type {ActivityEvent, ActivityFocus, ActivityResponse, ActivitySource, ActivityStats} from "~/types/activity";

const GITHUB_LOGIN = "zaralX"
const GITLAB_LOGIN = "zaralXlab"

const FETCH_TIMEOUT = 5000
const FEED_LIMIT = 6
const FOCUS_WINDOW_DAYS = 30

interface RawEvent {
    id: string
    source: ActivitySource
    kind: "push" | "issue" | "pull" | "release" | "repo"
    repo: string
    url: string
    message?: string
    date: string
    commits: number
}

export default defineCachedEventHandler(async (): Promise<ActivityResponse> => {
    const [github, gitlab, stats] = await Promise.all([
        getGithubEvents().catch(() => []),
        getGitlabEvents().catch(() => []),
        getGithubStats().catch(() => null)
    ])

    const raw = [...github, ...gitlab].sort((a, b) => b.date.localeCompare(a.date))

    return {
        focus: getFocus(raw),
        events: collapse(raw).slice(0, FEED_LIMIT),
        stats
    }
}, {
    name: "activity",
    getKey: () => "all",
    maxAge: 60 * 30,
    swr: true
});

function collapse(events: RawEvent[]): ActivityEvent[] {
    const merged: RawEvent[] = []

    for (const event of events) {
        const previous = merged[merged.length - 1]

        if (previous && event.kind === "push" && previous.kind === "push"
            && previous.repo === event.repo && previous.date.slice(0, 10) === event.date.slice(0, 10)) {
            previous.commits += event.commits
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
            return `запушил ${event.commits} ${plural(event.commits, ["коммит", "коммита", "коммитов"])} в`
        case "issue":
            return "открыл задачу в"
        case "pull":
            return "открыл pull request в"
        case "release":
            return "выпустил релиз в"
        case "repo":
            return "создал репозиторий"
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

async function getGithubEvents(): Promise<RawEvent[]> {
    const data: any[] = await $fetch(`https://api.github.com/users/${GITHUB_LOGIN}/events/public`, {
        query: {per_page: 100},
        headers: githubHeaders(),
        timeout: FETCH_TIMEOUT
    })

    return (data ?? [])
        .map(event => {
            const kind = githubKind(event)
            if (!kind) return null

            return {
                id: `gh-${event.id}`,
                source: "github" as const,
                kind,
                repo: event.repo.name,
                url: `https://github.com/${event.repo.name}`,
                message: event.payload?.issue?.title || event.payload?.pull_request?.title || event.payload?.release?.name || undefined,
                date: event.created_at,
                commits: event.payload?.size ?? event.payload?.commits?.length ?? 1
            }
        })
        .filter((event): event is RawEvent => event !== null)
}

function githubKind(event: any): RawEvent["kind"] | null {
    switch (event.type) {
        case "PushEvent":
            return "push"
        case "IssuesEvent":
            return event.payload?.action === "opened" ? "issue" : null
        case "PullRequestEvent":
            return event.payload?.action === "opened" ? "pull" : null
        case "ReleaseEvent":
            return "release"
        case "CreateEvent":
            return event.payload?.ref_type === "repository" ? "repo" : null
        default:
            return null
    }
}

async function getGitlabEvents(): Promise<RawEvent[]> {
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
    if (!userId) return []

    const data: any[] = await $fetch(`https://gitlab.com/api/v4/users/${userId}/events`, {
        query: {per_page: 30},
        headers,
        timeout: FETCH_TIMEOUT
    })

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
            commits: event.push_data?.commit_count ?? 1
        }))
}

async function getGithubStats(): Promise<ActivityStats> {
    const [profile, repos] = await Promise.all([
        $fetch<any>(`https://api.github.com/users/${GITHUB_LOGIN}`, {
            headers: githubHeaders(),
            timeout: FETCH_TIMEOUT
        }),
        $fetch<any[]>(`https://api.github.com/users/${GITHUB_LOGIN}/repos`, {
            query: {per_page: 100},
            headers: githubHeaders(),
            timeout: FETCH_TIMEOUT
        })
    ])

    return {
        publicRepos: profile?.public_repos ?? 0,
        stars: (repos ?? []).reduce((acc, repo) => acc + (repo.stargazers_count ?? 0), 0),
        since: new Date(profile?.created_at ?? Date.now()).getFullYear()
    }
}

function getFocus(events: RawEvent[]): ActivityFocus | null {
    const since = Date.now() - FOCUS_WINDOW_DAYS * 24 * 60 * 60 * 1000
    const counters = new Map<string, ActivityFocus>()

    for (const event of events) {
        if (event.kind !== "push" || new Date(event.date).getTime() < since) continue

        const focus = counters.get(event.repo) ?? {repo: event.repo, url: event.url, source: event.source, commits: 0}

        focus.commits += event.commits
        counters.set(event.repo, focus)
    }

    return [...counters.values()].sort((a, b) => b.commits - a.commits)[0] ?? null
}

function plural(count: number, forms: [string, string, string]) {
    const tens = count % 100
    const ones = count % 10

    if (tens > 10 && tens < 20) return forms[2]
    if (ones === 1) return forms[0]
    if (ones > 1 && ones < 5) return forms[1]

    return forms[2]
}
