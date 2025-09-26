<template>
  <div class="absolute left-0 top-0 w-full h-screen overflow-hidden opacity-25">
    <div class="absolute left-0 top-0 w-full h-screen transform -translate-y-2">
      <span
          v-for="(s, i) in meteorStyles"
          :key="i"
          class="pointer-events-none absolute -left-1/2 h-1 w-1 animate-meteor rounded-full bg-rose-500 shadow-[0_0_0_1px_#ffffff10]"
          :style="s"
      >
        <div :style="{ width: s['--w'] }" class="pointer-events-none absolute -z-10 h-[4px] w-[100px] rotate-[180deg] bg-gradient-to-l translate-x-0.5 from-rose-500 to-transparent"/>
        <div :style="{ width: s['--w'] }" class="pointer-events-none absolute -z-10 h-[4px] w-[100px] rotate-[180deg] bg-gradient-to-l translate-x-0.5 from-rose-500 to-transparent blur-xs"/>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from "vue";

const props = withDefaults(
    defineProps<{
      number?: number;
      class?: any;
    }>(),
    {
      number: Math.ceil(window.innerWidth / 20) + 30,
    }
);

const meteorStyles = ref<CSSProperties[]>([]);

const setStyles = () => {
  const diagonal = Math.ceil(Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2)) / 1.5;

  meteorStyles.value = [...Array.from({ length: props.number })].map(() => {
    const width = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
    const speed = Math.floor(Math.random() * 32) + 4;
    return {
      top: -5 + "px",
      left: Math.floor(Math.random() * window.innerWidth * 1.5) - window.innerWidth / 2 + "px",
      animationDelay: (Math.random() * 16) + 0.2 + "s",
      animationDuration: speed + "s",
      opacity: speed / 16,
      '--o': speed / 16,
      '--d': `${diagonal}px`,
      '--w': `${width}px`,
    }
  });
};


onMounted(() => {
  setStyles();
});

watch(() => props.number, setStyles, { immediate: true });
</script>