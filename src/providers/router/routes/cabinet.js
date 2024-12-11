export default [
    {
        name: 'CabinetPage',
        path: '/cabinet',
        meta: {
            layout: 'cabinet'
        },
        component: () => import('/src/pages/cabinet/Cabinet.vue')
    }
]