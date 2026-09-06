<script setup lang="ts">
import {projects} from "~/data/projects";

interface Service {
  title: string
  icon: string
  color: string
  description: string
  stack: string[]
  proofs: string[]
}

const services: Service[] = [
  {
    title: "Веб-сервисы и панели",
    icon: "lucide:layout-dashboard",
    color: "#38bdf8",
    description: "Сайты, личные кабинеты и биллинг: интерфейс, бэкенд, база, деплой бла бла бла. ",
    stack: ["Nuxt", "Vue", "Fastify", "PostgreSQL", "Docker"],
    proofs: ["FreshDonate", "FreshMarket"],
  },
  {
    title: "Minecraft-разработка",
    icon: "mdi:minecraft",
    color: "#4ade80",
    description: "Плагины и целые игровые режимы: экономика, производительность, уникальность, работа с NMS.",
    stack: ["Paper", "Bukkit", "Folia", "Kotlin", "Java"],
    proofs: ["Столбы для origon.pro", "Cristalix Dungeons"],
  },
  {
    title: "API и интеграции",
    icon: "dashicons:rest-api",
    color: "#fb923c",
    description: "Производительный бек под ваш проект? Telegram/Discord бот? Да как нефиг - сделаю",
    stack: ["REST", "Node.js", "Redis", "Документация"],
    proofs: ["zaralX Assets"],
  },
  {
    title: "Десктопные приложения",
    icon: "lucide:app-window-mac",
    color: "#a78bfa",
    description: "Приложения с автообновлением и работой с файловой системой - на Tauri (Клянусь не electron - это фуфуфу).",
    stack: ["Rust", "Tauri", "Nuxt"],
    proofs: ["Cast Launcher"],
  },
]

function proofLink(title: string) {
  return projects.find(project => project.title === title)?.links?.[0]?.href
}
</script>

<template>
  <div class="px-4 md:px-8 lg:px-32 xl:px-64">
    <h2 class="font-unbounded text-center text-3xl">Что я могу сделать</h2>
    <p class="text-stone-400 mt-3 text-center">Вообще - любой каприз за Ваши деньги, но это основные направления.</p>

    <div class="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-2">
      <div v-for="service in services" :key="service.title"
           class="group relative overflow-hidden rounded-lg border border-stone-800 bg-stone-900 p-5 transition-colors duration-300 hover:border-stone-700">
        <div class="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity duration-300 group-hover:opacity-25"
             :style="{ backgroundColor: service.color }"></div>

        <div class="flex items-center gap-3">
          <div class="flex size-10 shrink-0 items-center justify-center rounded-md bg-black/30">
            <Icon :name="service.icon" class="text-xl" :style="{ color: service.color }" />
          </div>
          <h3 class="font-unbounded text-lg">{{ service.title }}</h3>
        </div>

        <p class="mt-3 text-sm text-stone-400">{{ service.description }}</p>

        <div class="mt-4 flex flex-wrap gap-1.5">
          <span v-for="item in service.stack" :key="item"
                class="rounded-sm bg-black/30 px-2 py-0.5 text-xs text-stone-400">{{ item }}</span>
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-stone-800 pt-3 text-xs">
          <span class="text-stone-600">Например:</span>
          <a v-for="proof in service.proofs" :key="proof"
             :href="proofLink(proof)" target="_blank"
             class="inline-flex items-center gap-1 text-stone-400 underline decoration-stone-700 underline-offset-4 transition-colors duration-200 hover:text-stone-200">
            {{ proof }}
            <Icon name="lucide:arrow-up-right" class="text-sm" />
          </a>
        </div>
      </div>
    </div>

    <p class="mt-8 text-center text-sm text-stone-500">
      Нужно что-то другое?
      <a href="https://t.me/zWork1" target="_blank" class="text-orange-400 underline decoration-orange-400/40 underline-offset-4 hover:text-orange-300">
        Напишите - разберёмся
      </a>
    </p>
  </div>
</template>
