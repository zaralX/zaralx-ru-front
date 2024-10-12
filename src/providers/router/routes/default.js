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
        path: '/:pathMatch(.*)*',
        name: 'NotFoundPage',
        meta: {
            layout: 'empty'
        },
        component: () => import('/src/pages/Error.vue')
    },
]