export default [
    {
        name: 'MainPage',
        path: '/',
        meta: {
            layout: 'basic'
        },
        component: () => import('/src/pages/Index.vue')
    },
    {
        name: 'AboutPage',
        path: '/about',
        meta: {
            layout: 'basic'
        },
        component: () => import('/src/pages/About.vue')
    },
    {
        name: 'GiveawayPage',
        path: '/giveaway',
        meta: {
            layout: 'basic'
        },
        component: () => import('/src/pages/Giveaway.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFoundPage',
        meta: {
            layout: 'empty'
        },
        component: () => import('/src/pages/Error.vue')
    },
]