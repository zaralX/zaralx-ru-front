import type { HandshakePerson } from "~/types/handshake";

export const handshakesSeed: HandshakePerson[] = [
    {
        id: "zaralx",
        name: "zaralX",
        image: "/img/profile.jpg",
        contacts: {
            telegram: "zWork1",
            github: "zaralX",
            site: "https://zaralx.ru",
        },
        note: "Это я :)",
    },
    {
        id: "example-friend",
        name: "Пример: Друг",
        via: "zaralx",
        contacts: {
            telegram: "username",
        },
        note: "Это пример — отредактируй или удали меня",
    },
    {
        id: "example-colleague",
        name: "Пример: Коллега",
        via: "zaralx",
    },
    {
        id: "example-chain",
        name: "Пример: Знакомый друга",
        via: "example-friend",
        note: "Два рукопожатия от zaralX",
    },
];
