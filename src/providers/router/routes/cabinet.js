export default [
    {
        name: 'CabinetPage',
        path: '/cabinet',
        meta: {
            layout: 'basic'
        },
        component: () => import('/src/pages/cabinet/Cabinet.vue')
    }
]