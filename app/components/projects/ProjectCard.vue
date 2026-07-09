<script setup lang="ts">
import type { Project } from "~/types/project";

defineProps<{
  project: Project
}>()
</script>

<template>
  <div class="group relative rounded-lg bg-stone-900 border border-stone-800 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-stone-600">
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
         :style="{ background: `radial-gradient(24rem 12rem at 50% 0%, ${project.accent}22, transparent)` }"></div>

    <div class="aspect-video w-full overflow-hidden bg-stone-950 relative">
      <video v-if="project.video" :src="project.video" class="w-full h-full object-cover" muted autoplay loop playsinline />
      <NuxtImg v-else-if="project.image" :src="project.image" :alt="project.title"
               class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <div v-else class="w-full h-full flex items-center justify-center"
           :style="{ background: `linear-gradient(135deg, ${project.accent}33, transparent 70%)` }">
        <p class="font-unbounded text-xl text-stone-400">{{ project.title }}</p>
      </div>
      <div class="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-stone-900 to-transparent"></div>
    </div>

    <div class="p-4 flex flex-col gap-2 flex-1 relative">
      <h2 class="text-xl font-unbounded bg-size-[300%] text-transparent bg-clip-text animate-[animated-gradient_6s_ease_infinite_alternate] bg-gradient-to-r"
          :class="project.gradient">
        {{ project.title }}
      </h2>
      <p class="text-stone-400 text-sm flex-1">{{ project.description }}</p>
      <p v-if="project.review" class="text-stone-500 text-xs italic border-l-2 pl-2" :style="{ borderColor: project.accent }">
        «{{ project.review }}» — заказчик
      </p>
      <div class="flex flex-wrap gap-1.5">
        <span v-for="tag in project.tags" :key="tag"
              class="text-xs px-2 py-0.5 rounded-full bg-black/30 border border-stone-800 text-stone-400">
          {{ tag }}
        </span>
      </div>
      <div v-if="project.links.length" class="flex flex-wrap gap-2 mt-2">
        <ShButton v-for="link in project.links" :key="link.href" as="a" target="_blank" :href="link.href"
                  variant="ghost" size="sm" class="bg-black/25" :icon="link.icon">
          {{ link.label }}
        </ShButton>
      </div>
    </div>
  </div>
</template>
