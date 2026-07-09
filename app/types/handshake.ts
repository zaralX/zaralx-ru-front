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
    /** id человека, через которого знакомство; пусто = корень карты */
    via?: string
}
