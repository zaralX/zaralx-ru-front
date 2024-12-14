export default [
    {
        name: 'ToolsPage',
        path: '/tools',
        meta: {
            layout: 'basic'
        },
        component: () => import('/src/pages/tools/Tools.vue')
    }
]