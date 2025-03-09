<script setup>

import {onMounted, ref} from "vue";

const {aboutPageShowcased} = useUser();

const props = defineProps({
  icon: {type: String, default: 'pi-align-left'},
  title: {type: String, default: 'title.md'},
  inclass: {type: String, default: ''},
  delay: {type: Number, default: 100},
})

const showing = ref(false);

onMounted(() => {
  setTimeout(() => {
    showing.value = true;
    aboutPageShowcased.value = true;
  }, aboutPageShowcased.value ? props.delay : 0);
})
</script>

<template>
  <transition name="show">
    <div v-if="showing" class="w-full rounded-lg bg-neutral-900 group transition-all shadow-lg hover:scale-[1.02] duration-500">
      <div :class="props.inclass" class="w-full h-full rounded-lg bg-gradient-to-tr from-neutral-700/20 to-neutral-800/40 p-[3px]">
        <div class="bg-neutral-900 rounded-md p-2 md:p-4">
          <div class="flex items-center gap-2 md:gap-4 opacity-50">
            <i class="pi" :class="props.icon"></i>
            <p>{{props.title}}</p>
          </div>
          <div class="mt-2 md:mt-4 h-full">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.show-enter-active,
.show-leave-active {
  transition: all 1s ease;
}

.show-enter-from,
.show-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(95%);
}
</style>