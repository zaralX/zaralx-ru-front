// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  srcDir: 'app',
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [
      tailwindcss(),
    ],
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5 shrink-to-fit=no' },
        { hid: 'description', name: 'description', content: 'zaralX - Универсальный разработчик, который готов реализовать вашу идею.' },
        { property: 'og:title', content: 'zaralX Website' },
        { property: 'og:description', content: 'zaralX - Универсальный разработчик, который готов реализовать вашу идею.' },
        { property: 'og:site_name', content: 'zaralX Website' },
        { property: 'og:locale', content: 'ru_RU' },
        { property: 'og:image', content: 'https://zaralx.ru/zaralx_ave_nobg.png' },
        { property: 'og:canonical', content: 'https://zaralx.ru' },
        { property: 'og:url', content: 'https://zaralx.ru' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Fira+Code:wght@300..700&family=Geist:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Onest:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Rubik+Mono+One&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },

  modules: [
    '@nuxt/icon',
    'shadcn-nuxt',
  ],
})