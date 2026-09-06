<script setup lang="ts">
import {handshakesSeed} from "~/data/handshakes";
import {projects} from "~/data/projects";

const reviews = projects
    .filter(project => project.review)
    .map(project => ({
      text: project.review!,
      project: project.title,
      href: project.links?.[0]?.href,
      accent: project.accent
    }))
</script>

<template>
<!--  <div v-if="reviews.length" class="px-4 md:px-8 lg:px-32 xl:px-64">-->
<!--    <h2 class="font-unbounded text-center text-3xl">Что говорят</h2>-->

<!--    <div class="mx-auto mt-10 grid max-w-4xl gap-4" :class="reviews.length > 1 ? 'md:grid-cols-2' : ''">-->
<!--      <figure v-for="review in reviews" :key="review.project"-->
<!--              class="relative overflow-hidden rounded-lg border border-stone-800 bg-stone-900 p-6">-->
<!--        <div class="absolute -left-4 -top-6 font-unbounded text-8xl leading-none opacity-10"-->
<!--             :style="{ color: review.accent }">&ldquo;</div>-->

<!--        <blockquote class="relative text-stone-300">{{ review.text }}</blockquote>-->

<!--        <figcaption class="mt-4 flex items-center gap-2 border-t border-stone-800 pt-4 text-sm text-stone-500">-->
<!--          <Icon name="lucide:badge-check" :style="{ color: review.accent }" />-->
<!--          Заказчик проекта-->
<!--          <a v-if="review.href" :href="review.href" target="_blank"-->
<!--             class="text-stone-300 underline decoration-stone-700 underline-offset-4 hover:text-white">{{ review.project }}</a>-->
<!--          <span v-else class="text-stone-300">{{ review.project }}</span>-->
<!--        </figcaption>-->
<!--      </figure>-->
<!--    </div>-->

<!--    <div class="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-stone-500">-->
<!--      <NuxtLink to="/projects" class="inline-flex items-center gap-1.5 hover:text-stone-300">-->
<!--        <Icon name="lucide:folder-open" />-->
<!--        Ещё {{ projects.length - reviews.length }} проектов в портфолио-->
<!--      </NuxtLink>-->
<!--      <NuxtLink to="/handshakes" class="inline-flex items-center gap-1.5 hover:text-stone-300">-->
<!--        <Icon name="lucide:handshake" />-->
<!--        {{ handshakesSeed.length }} человек в цепочке рукопожатий-->
<!--      </NuxtLink>-->
<!--    </div>-->
<!--  </div>-->
</template>
