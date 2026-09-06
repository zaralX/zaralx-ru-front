<script setup lang="ts">
import type {ActivityResponse} from "~/types/activity";
import type {ContributionsResponse} from "~/types/contributions";
import {projects} from "~/data/projects";

const {data: activity} = await useFetch<ActivityResponse>("/api/activity")
const {data: contributions} = await useFetch<ContributionsResponse>("/api/contributions")

const numberFormatter = new Intl.NumberFormat('ru-RU')

const stats = computed(() => [
  {
    value: numberFormatter.format(projects.length),
    label: 'проектов в портфолио',
    to: '/projects'
  },
  {
    value: contributions.value ? numberFormatter.format(contributions.value.total) : null,
    label: 'коммитов за последний год',
    to: '#activity'
  },
  {
    value: activity.value?.stats ? numberFormatter.format(activity.value.stats.publicRepos) : null,
    label: 'публичных репозиториев',
    href: 'https://github.com/zaralX?tab=repositories'
  },
  {
    value: activity.value?.stats ? `с ${activity.value.stats.since}` : null,
    label: 'в разработке',
    href: 'https://github.com/zaralX'
  }
].filter(stat => stat.value !== null))
</script>

<template>
  <div v-if="stats.length" class="px-4 md:px-8 lg:px-32 xl:px-64">
    <div class="mx-auto grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-stone-800 bg-stone-800 md:grid-cols-4">
      <template v-for="stat in stats" :key="stat.label">
        <NuxtLink v-if="stat.to" :to="stat.to"
                  class="group bg-stone-950 px-4 py-5 text-center transition-colors duration-200 hover:bg-stone-900">
          <p class="font-unbounded text-2xl text-stone-100 md:text-3xl">{{ stat.value }}</p>
          <p class="mt-1 text-xs text-stone-500 group-hover:text-stone-400">{{ stat.label }}</p>
        </NuxtLink>
        <a v-else :href="stat.href" target="_blank"
           class="group bg-stone-950 px-4 py-5 text-center transition-colors duration-200 hover:bg-stone-900">
          <p class="font-unbounded text-2xl text-stone-100 md:text-3xl">{{ stat.value }}</p>
          <p class="mt-1 text-xs text-stone-500 group-hover:text-stone-400">{{ stat.label }}</p>
        </a>
      </template>
    </div>
  </div>
</template>
