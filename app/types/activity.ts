export type ActivitySource = 'github' | 'gitlab'

/** api - официальное API, atom - публичный фид github.com, failed - не достучались */
export type ActivityChannel = 'api' | 'atom' | 'html' | 'failed'

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
    count: number
    /** Фид не отдаёт число коммитов, поэтому там считаем пуши */
    unit: 'commits' | 'pushes'
}

export interface ActivityStats {
    publicRepos: number | null
    since: number
}

export interface ActivityResponse {
    focus: ActivityFocus | null
    events: ActivityEvent[]
    stats: ActivityStats | null
    sources: {
        github: ActivityChannel
        gitlab: ActivityChannel
    }
    /** Короткие причины отказов - чтобы не лезть в логи сервера */
    problems: string[]
}
