export type ActivitySource = 'github' | 'gitlab'

export interface ActivityEvent {
    id: string
    source: ActivitySource
    action: string
    repo: string
    url: string
    message?: string
    date: string
}

export interface ActivityFocus {
    repo: string
    url: string
    source: ActivitySource
    commits: number
}

export interface ActivityStats {
    publicRepos: number
    stars: number
    since: number
}

export interface ActivityResponse {
    focus: ActivityFocus | null
    events: ActivityEvent[]
    stats: ActivityStats | null
}
