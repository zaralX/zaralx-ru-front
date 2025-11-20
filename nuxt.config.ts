// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    srcDir: 'app',
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},

    css: ['~/assets/css/main.css'],

    vite: {
        plugins: [
            tailwindcss(),
        ],
    },

    icon: {
        mode: 'css',
        cssLayer: 'base',
        componentName: 'Icon',
    },

    shadcn: {
        /**
         * Prefix for all the imported component
         */
        prefix: 'Sh',
        /**
         * Directory that the component lives in.
         * @default "./components/ui"
         */
        componentDir: './app/components/ui'
    },

    app: {
        head: {
            htmlAttrs: {
                lang: 'ru',
            },
            title: 'zaralx.ru',
            titleTemplate: '%s',
            charset: 'utf-8',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5 shrink-to-fit=no'},
                {
                    name: 'description',
                    content: 'zaralX - Универсальный разработчик, который готов реализовать вашу идею.'
                },
                {property: 'og:title', content: 'zaralX Website'},
                {
                    property: 'og:description',
                    content: 'zaralX - Универсальный разработчик, который готов реализовать вашу идею.'
                },
                {property: 'og:site_name', content: 'zaralX Website'},
                {property: 'og:locale', content: 'ru_RU'},
                {property: 'og:image', content: 'https://zaralx.ru/zaralx_ave_nobg.png'},
                {property: 'og:canonical', content: 'https://zaralx.ru'},
                {property: 'og:url', content: 'https://zaralx.ru'},
                {property: 'og:type', content: 'website'},
            ],
            link: [
                {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
                {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous'},
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400..900&family=Unbounded:wght@200..900&display=swap',
                },
                {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
            ],
        },
        pageTransition: {name: 'page', mode: 'out-in'},
        layoutTransition: {name: 'layout', mode: 'out-in'}
    },

    modules: ['@nuxt/icon', 'shadcn-nuxt', '@nuxtjs/device', '@nuxt/image'],
})