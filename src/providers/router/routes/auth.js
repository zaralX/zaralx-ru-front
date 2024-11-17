export default [
    {
        name: 'AuthDiscordPage',
        path: '/auth/discord/end',
        meta: {
            layout: 'empty'
        },
        component: () => import('/src/pages/auth/discord/DiscordAuthEnd.vue')
    },
    {
        name: 'AuthTelegramPage',
        path: '/auth/telegram/end',
        meta: {
            layout: 'empty'
        },
        component: () => import('/src/pages/auth/telegram/TelegramAuthEnd.vue')
    }
]