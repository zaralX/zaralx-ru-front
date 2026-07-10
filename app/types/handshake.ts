export interface HandshakeContacts {
    telegram?: string
    github?: string
    site?: string
}

export interface HandshakePerson {
    id: string
    name: string
    image?: string
    contacts?: HandshakeContacts
    note?: string
    /** id людей, через которых знакомство (первый - основная связь); пусто = корень карты */
    via?: string[]
}
