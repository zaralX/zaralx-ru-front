<script setup lang="ts">

</script>

<template>
  <div class="bg-stone-900 h-auto mt-[127px] px-64 space-y-8">
    <h2 class="font-unbounded text-center text-3xl -translate-y-12">Обо мне</h2>

    <div class="grid grid-cols-2 gap-4 text-stone-300">
      <div class="h-full flex flex-col justify-center">
        <p class="text-lg font-medium font-unbounded relative">
          Привет, я
          <span class="bg-gradient-to-r from-amber-400 bg-size-[300%] via-orange-400 to-yellow-400 inline-block text-transparent bg-clip-text animate-[animated-gradient_6s_ease_infinite_alternate] font-bold underline decoration-orange-400">
                zaralx
              </span>
          <i class="-translate-x-14 translate-y-3 rounded-full w-12 h-2 blur-xl absolute bg-amber-600 animate-[pulse_4s_cubic-bezier(0.6,0.2,0.5,1)_infinite]"></i>
        </p>
        <p>
          Меня зовут Михаил, но в онлайн-пространстве меня знают как <span class="font-medium text-orange-400">zaralx</span>.
        </p>
        <p>Моё любимое дело - создавать нестандартные разработки: от коммерческих приложений до игровых модов и фреймворков.</p>
        <p>Я знаком с более чем <span class="text-rose-500">20 языками</span> программирования, но особенно увлечён веб-разработкой и современными фреймворками.
        </p>
        <p>
          В то же время мне не чуждо погрузиться в систему: написать сервер на
          <span class="inline-flex items-center gap-1 bg-black/25 rounded-sm px-2 py-0.5 text-orange-500">
            <Icon name="teenyicons:rust-solid" class="text-sm" /> Rust
          </span>, <span class="inline-flex items-center gap-1 bg-black/25 rounded-sm px-2 py-0.5 text-blue-500">
            <Icon name="devicon-plain:bash" class="text-sm" /> Shell
          </span> скрипт или мод для <span class="inline-flex items-center gap-1 bg-black/25 rounded-sm px-2 py-0.5 text-green-500">
            <Icon name="mdi:minecraft" class="text-sm" /> Minecraft
          </span>.
        </p>
        <p class="text-stone-500 italic text-sm mt-2">Готов воплощать идеи - от концепции до рабочего решения.</p>
      </div>

      <div class="w-full max-h-96 overflow-hidden relative">
        <div class="w-96 mr-0 ml-auto -translate-y-12">
          <img src="/img/developer.png" alt="" class="absolute blur">
          <img src="/img/developer.png" alt="" class="relative">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>