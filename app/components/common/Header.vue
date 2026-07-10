<script setup lang="ts">
const scrollY = ref(0)
const menuOpen = ref(false)

const handleScroll = () => {
  scrollY.value = window.scrollY
}

const route = useRoute()
watch(() => route.path, () => {
  menuOpen.value = false
})

onMounted(() => {
  scrollY.value = window.scrollY
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
<div class="h-10 z-50 relative">
  <div class="flex items-center fixed left-0 w-full px-4 sm:px-8 md:px-32">
    <NuxtLink to="/" id="header-title" class="p-2 rounded-lg font-unbounded group w-32" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 || menuOpen }">
      <p class="absolute blur group-hover:opacity-100 opacity-0 select-none duration-1000 group-hover:animate-[light-shake_1s_ease-in-out]">ZARALX.RU</p>
      <p class="group-hover:animate-[light-shake_1s_ease-in-out]">ZARALX.RU</p>
    </NuxtLink>
    <div class="flex-1 flex items-center justify-center">
      <div class="space-x-2 rounded-lg hidden sm:block" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <NuxtLink to="/projects">
          <ShButton variant="ghost">Проекты</ShButton>
        </NuxtLink>
        <NuxtLink to="/handshakes">
          <ShButton variant="ghost">Знакомства</ShButton>
        </NuxtLink>
        <NuxtLink to="/experiments">
          <ShButton variant="ghost">Эксперименты</ShButton>
        </NuxtLink>
      </div>
    </div>
    <div class="hidden sm:flex items-center justify-end text-lg gap-4 w-32">
      <a href="https://github.com/zaralX" target="_blank" aria-label="GitHub" class="text-stone-400 hover:text-stone-200 duration-200 rounded-lg aspect-square w-8 flex justify-center items-center" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <Icon name="lucide:github" />
      </a>
      <a href="https://gitlab.com/zaralXlab" target="_blank" aria-label="GitLab" class="text-stone-400 hover:text-stone-200 duration-200 rounded-lg aspect-square w-8 flex justify-center items-center" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <Icon name="lucide:gitlab" />
      </a>
      <a href="https://zWork1.t.me" target="_blank" aria-label="Telegram" class="text-stone-400 hover:text-stone-200 duration-200 rounded-lg aspect-square w-8 flex justify-center items-center" :class="{ 'backdrop-blur bg-black/50': scrollY > 0 }">
        <Icon name="iconoir:telegram" />
      </a>
    </div>
    <button class="sm:hidden text-stone-300 hover:text-white duration-200 rounded-lg w-10 h-10 flex justify-center items-center text-xl"
            :class="{ 'backdrop-blur bg-black/50': scrollY > 0 || menuOpen }"
            aria-label="Меню"
            @click="menuOpen = !menuOpen">
      <Icon :name="menuOpen ? 'lucide:x' : 'lucide:menu'" />
    </button>
  </div>

  <Transition name="mobile-menu">
    <div v-if="menuOpen" class="sm:hidden fixed top-14 left-0 w-full px-4 z-40">
      <div class="rounded-lg backdrop-blur bg-black/80 border border-stone-800 p-2 flex flex-col gap-1">
        <NuxtLink to="/projects" class="w-full">
          <ShButton variant="ghost" class="w-full justify-start text-left" icon="lucide:folder-code">Проекты</ShButton>
        </NuxtLink>
        <NuxtLink to="/handshakes" class="w-full">
          <ShButton variant="ghost" class="w-full justify-start text-left" icon="lucide:heart-handshake">Знакомства</ShButton>
        </NuxtLink>
        <NuxtLink to="/experiments" class="w-full">
          <ShButton variant="ghost" class="w-full justify-start text-left" icon="lucide:flask-conical">Эксперименты</ShButton>
        </NuxtLink>
        <div class="h-px bg-stone-800 my-1"></div>
        <div class="flex justify-center gap-6 py-1 text-lg">
          <a href="https://github.com/zaralX" target="_blank" aria-label="GitHub" class="text-stone-400 hover:text-stone-200 duration-200">
            <Icon name="lucide:github" />
          </a>
          <a href="https://gitlab.com/zaralXlab" target="_blank" aria-label="GitLab" class="text-stone-400 hover:text-stone-200 duration-200">
            <Icon name="lucide:gitlab" />
          </a>
          <a href="https://zWork1.t.me" target="_blank" aria-label="Telegram" class="text-stone-400 hover:text-stone-200 duration-200">
            <Icon name="iconoir:telegram" />
          </a>
        </div>
      </div>
    </div>
  </Transition>
</div>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
