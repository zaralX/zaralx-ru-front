<script setup>
import MiniSkillAbout from "./MiniSkillAbout.vue";

const props = defineProps({
  title: String,
  main: Array,
  low: Array,
  basic: Array,
})
</script>

<template>
  <div class="rounded-lg p-2 border-[3px] border-neutral-800 border-dotted hover:border-neutral-600 duration-200">
    <p class="font-onest text-xl mb-2">{{props.title}}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
      <MiniSkillAbout v-for="skill in props.main" :icon="skill.icon" :name="skill.name" :subtitle="skill.subtitle" :color="skill.color" />
    </div>
    <div class="flex flex-col gap-2 mt-2">
      <MiniSkillAbout v-for="skill in props.low" low :percent="skill.percent" :icon="skill.icon" :name="skill.name" :color="skill.color" />
      <div class="flex gap-2 mt-2">
        <MiniSkillAbout v-for="skill in props.basic" basic :icon="skill.icon" :name="skill.name" :color="skill.color" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>