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
        name: 'LoginPage',
        path: '/login',
        meta: {
            layout: 'basic'
        },
        component: () => import('/src/pages/Login.vue')
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
        name: 'ProjectsPage',
        path: '/projects/:projectId?',
        meta: {
            layout: 'basic'
        },
        component: () => import('/src/pages/Projects.vue')
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