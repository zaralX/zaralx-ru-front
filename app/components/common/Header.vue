<script setup lang="ts">


const scrollY = ref(0)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
<div class="h-10 z-50 relative">
  <div class="flex items-center fixed left-0 w-full px-32">
    <NuxtLink to="/" id="header-title" class="p-2 rounded-lg font-unbounded group w-32" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
      <p class="absolute blur group-hover:opacity-100 opacity-0 select-none duration-1000 group-hover:animate-[light-shake_1s_ease-in-out]">ZARALX.RU</p>
      <p class="group-hover:animate-[light-shake_1s_ease-in-out]">ZARALX.RU</p>
    </NuxtLink>
    <div class="flex-1 flex items-center justify-center">
      <div class="space-x-2 rounded-lg" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <NuxtLink to="/experiments">
          <ShButton variant="ghost">Проекты</ShButton>
        </NuxtLink>
        <NuxtLink to="/experiments">
          <ShButton variant="ghost">Эксперименты</ShButton>
        </NuxtLink>
      </div>
    </div>
    <div class="flex items-center justify-end text-lg gap-4 w-32">
      <a href="https://github.com/zaralX" target="_blank" class="text-stone-400 hover:text-stone-200 duration-200 rounded-lg aspect-square w-8 flex justify-center items-center" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <Icon name="lucide:github" />
      </a>
      <a href="https://gitlab.com/zaralXlab" target="_blank" class="text-stone-400 hover:text-stone-200 duration-200 rounded-lg aspect-square w-8 flex justify-center items-center" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <Icon name="lucide:gitlab" />
      </a>
      <a href="https://zWork1.t.me" target="_blank" class="text-stone-400 hover:text-stone-200 duration-200 rounded-lg aspect-square w-8 flex justify-center items-center" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <Icon name="iconoir:telegram" />
      </a>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>