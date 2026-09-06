import type { Project } from "~/types/project";

export const projects: Project[] = [
  {
    title: "Cast Launcher",
    description: "Десктопный лаунчер Minecraft на Rust и Tauri: ставит ваниллу, Forge, NeoForge и Fabric, ищет модпаки на Modrinth, а свои сборки раздаёт через каталог CastPacks - установка в один клик и автообновление. Сам подбирает или качает Java, умеет импортировать инстансы из PrismLauncher и Modrinth App.",
    tags: ["Rust", "Tauri", "Nuxt", "Minecraft", "Open Source"],
    image: "/img/projects/cast_launcher.webp",
    gradient: "from-sky-400 via-cyan-300 to-blue-400",
    accent: "#28b9f5",
    links: [
      { label: "Исходный код", href: "https://github.com/zaralX/cast-launcher", icon: "lucide:github" },
      { label: "Скачать", href: "https://github.com/zaralX/cast-launcher/releases/latest", icon: "lucide:arrow-down-to-line" },
    ],
  },
  {
    title: "FreshMarket",
    description: "Маркетплейс, полностью повторяющий работу реальных маркетплейсов внутри Minecraft: банковская система, покупка товаров с доставкой, управление магазином в команде и аналитика продаж.",
    tags: ["Minecraft", "Маркетплейс", "Банковская система", "Аналитика"],
    image: "/img/projects/freshmarket_v2.webp",
    gradient: "from-blue-400 via-sky-300 to-sky-400",
    accent: "#38bdf8",
    links: [
      { label: "Сайт", href: "https://fresh.zaralx.ru/", icon: "lucide:external-link" },
    ],
  },
  {
    title: "Cristalix Dungeons",
    description: "Игровой режим про подземелья внутри Minecraft: исследуйте таинственные данжи, сражайтесь с толпами монстров, побеждайте боссов и улучшайте добытую амуницию.",
    tags: ["Minecraft", "Игровой режим", "PvE"],
    video: "https://s3.zaralx.ru/zaralx_ru/cristalix_dungeons_trailer",
    gradient: "from-teal-400 via-green-300 to-emerald-400",
    accent: "#34d399",
    links: [
      { label: "Сайт", href: "https://cristalix.gg", icon: "lucide:external-link" },
    ],
  },
  {
    title: "zaralX Assets",
    description: "API-сервис с иконками предметов и блоков, скинами игроков и файлами локализации из Minecraft. Удобное REST API с документацией для простого внедрения в свой проект.",
    tags: ["REST API", "Minecraft", "Документация"],
    image: "/img/projects/zaralx_assets.webp",
    gradient: "from-red-500 via-amber-500 to-orange-400",
    accent: "#fb923c",
    links: [
      { label: "Исходный код", href: "https://github.com/zaralX/zaralx-assets", icon: "lucide:github" },
      { label: "Сайт", href: "https://assets.zaralx.ru/", icon: "lucide:external-link" },
    ],
  },
  {
    title: "Столбы для origon.pro",
    description: "PvP-миниигра \"Столбы\" с нуля за 30 дней: Paper 1.21.1, Kotlin. Восстановление арен через WorldEdit-схематики вместо перезагрузки миров, группы арен с автоподбором по слотам и пати, сужающийся ворлдбордер, выдача предметов (рандом / Nexo), Party с VIP-слотами, статистика, настраиваемые скорборды, локализация через MiniMessage и PlaceholderAPI.",
    review: "Отличная работа. Сервер с этим плагином работает уже порядка 2х недель без нареканий и замечаний, что указывает на качество выполненной работы.",
    tags: ["Minecraft", "Paper-плагин", "Kotlin", "PvP", "На заказ"],
    image: "/img/projects/origon_pillars.webp",
    gradient: "from-violet-400 via-purple-300 to-fuchsia-400",
    accent: "#a78bfa",
    links: [
      { label: "origon.pro", href: "https://origon.pro", icon: "lucide:external-link" },
    ],
  },
  {
    title: "FreshDonate",
    description: "Open-source платформа доната для Minecraft-серверов с 0% комиссии: self-hosted через Docker на своём VPS, приём RUB / USD / EUR и криптовалюты, плагин для автоматической выдачи покупок. Nuxt 4, Fastify 5, PostgreSQL, Redis.",
    tags: ["Nuxt", "Fastify", "PostgreSQL", "Open Source", "Minecraft"],
    image: "https://fd.zaralx.ru/_ipx/_/panel-screenshot.webp",
    gradient: "from-green-400 via-emerald-300 to-teal-400",
    accent: "#4ade80",
    links: [
      { label: "Сайт", href: "https://fd.zaralx.ru", icon: "lucide:external-link" },
    ],
  },
  {
    title: "SPm Combat",
    description: "Игра-пародия на популярный в 2024 году Hamster Combat, но со своими фичами. Работает на сервере СПм.",
    tags: ["Minecraft", "Веб", "Кликер"],
    image: "/img/projects/spm-combat-banner.webp",
    gradient: "from-yellow-400 via-amber-300 to-orange-400",
    accent: "#facc15",
    links: [
      { label: "Сайт", href: "https://spmk.zaralx.ru/", icon: "lucide:external-link" },
    ],
  },
  {
    title: "BridgeBuilders",
    description: "Bukkit-плагин с игрой \"Мосты\": ваша задача - вместе с командой как можно быстрее собрать ресурсы для строителя.",
    tags: ["Minecraft", "Bukkit-плагин"],
    image: "https://i.ytimg.com/vi/-WimqjhG9G0/hqdefault.jpg",
    gradient: "from-cyan-400 via-sky-300 to-blue-400",
    accent: "#22d3ee",
    links: [
      { label: "Видео", href: "https://www.youtube.com/shorts/-WimqjhG9G0", icon: "lucide:youtube" },
      { label: "Купить", href: "https://zWork1.t.me/", icon: "lucide:shopping-cart" },
    ],
  },
  {
    title: "Grief Mod",
    description: "Bukkit-плагин с ограничениями для новых игроков: PvP и гриферство недоступны, пока игрок не наберёт 24 часа онлайна на сервере.",
    tags: ["Minecraft", "Bukkit-плагин", "Open Source"],
    gradient: "from-red-400 via-rose-300 to-red-500",
    accent: "#f87171",
    links: [
      { label: "Исходный код", href: "https://github.com/zaralX/GriefMod", icon: "lucide:github" },
    ],
  },
  {
    title: "InfinityButtonSimulator",
    description: "Bukkit-плагин с простой игрой-симулятором и таблицей лидеров. Создан за 24 часа.",
    tags: ["Minecraft", "Bukkit-плагин", "За 24 часа"],
    image: "https://i.ytimg.com/vi/v8jNgkoQlmQ/hqdefault.jpg",
    gradient: "from-fuchsia-400 via-pink-300 to-rose-400",
    accent: "#e879f9",
    links: [
      { label: "Исходный код", href: "https://github.com/zaralX/InfinityButtonSimulator", icon: "lucide:github" },
      { label: "Видео", href: "https://www.youtube.com/watch?v=v8jNgkoQlmQ", icon: "lucide:youtube" },
    ],
  },
  {
    title: "zaralx.ru",
    description: "Этот сайт: портфолио на Nuxt с кастомными анимациями на Anime.js, экспериментами и интеграциями. Собирается в Docker и деплоится через CI/CD.",
    tags: ["Nuxt", "Vue", "Tailwind", "Anime.js", "Docker"],
    image: "/img/projects/website_this.webp",
    gradient: "from-amber-400 via-orange-400 to-yellow-400",
    accent: "#fbbf24",
    links: [
      { label: "Исходный код", href: "https://github.com/zaralX/zaralx-ru-front", icon: "lucide:github" },
    ],
  },
]
