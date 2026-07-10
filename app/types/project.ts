export interface ProjectLink {
    label: string
    href: string
    icon: string
}

export interface Project {
    title: string
    description: string
    tags: string[]
    image?: string
    video?: string
    review?: string
    gradient: string
    accent: string
    links: ProjectLink[]
}
