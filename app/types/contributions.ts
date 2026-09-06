export interface ContributionDay {
    date: string
    count: number
    github: number
    gitlab: number
    level: number
}

export interface ContributionMonth {
    label: string
    column: number
}

export interface ContributionsResponse {
    from: string
    to: string
    total: number
    totals: {
        github: number
        gitlab: number
    }
    sources: {
        github: boolean
        gitlab: boolean
    }
    months: ContributionMonth[]
    weeks: (ContributionDay | null)[][]
}
