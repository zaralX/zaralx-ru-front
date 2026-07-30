<script setup lang="ts">
import { animate, onScroll } from "animejs";
import ServerCard from "~/components/tfgm/ServerCard.vue";

useSeoMeta({
  title: 'TerraFirmaGreg Modern RU - публичный сервер',
  description: 'Публичный сервер на сборке TerraFirmaGreg Modern. Старт 5 августа в 13:00 МСК.',
  ogTitle: 'TerraFirmaGreg Modern RU',
  ogDescription: 'Публичное выживание на TFG Modern. Старт 5 августа в 13:00 МСК.',
  ogImage: 'https://zaralx.ru/img/tfgm/hero.webp',
})

const START_AT = '2026-08-05T13:00:00+03:00'

const links = {
  chat: 'https://zaralx.ru/tfgm-tg',
  channel: 'https://t.me/underzaral',
  discord: 'https://zaralx.ru/tfgm-ds',
}

const itemIcon = (item: string) => `https://assets.zaralx.ru/api/v1/minecraft/vanilla/item/${item}/icon`

const ages = [
  { item: 'stone_pickaxe', label: 'Каменный век' },
  { item: 'iron_ingot', label: 'Металлургия' },
  { item: 'redstone', label: 'Эпоха энергии' },
  { item: 'dragon_egg', label: 'Космос' },
  { item: 'end_crystal', label: 'Фантастический век' },
]

const roles = [
  {
    item: 'book',
    title: 'РПшеры',
    text: 'Сборка сама по себе приближена к реальности - от варки пельменей до городов с инфраструктурой. Но к РП никто не принуждает.',
  },
  {
    item: 'iron_pickaxe',
    title: 'Фармеры',
    text: 'Пройти всё за пару дней не выйдет. Придётся реально сидеть, играть и взаимодействовать с остальными.',
  },
  {
    item: 'piston',
    title: 'Технари',
    text: 'Поэтапное развитие по квестам через все века энергетики - от ручного горна до полноценной автоматизации.',
  },
  {
    item: 'bricks',
    title: 'Строители',
    text: 'Куча материалов и механик, которых нет в ванилле. Другой взгляд на то, как вообще строить.',
  },
  {
    item: 'compass',
    title: 'Путешественники',
    text: 'Будут цениться: можно продавать информацию о месторождениях и редкие ресурсы с других континентов.',
  },
]

const facts = [
  { key: 'Старт', value: '5 августа, 13:00 МСК' },
  { key: 'Сборка', value: 'TFGModern, 1.20.1' },
  { key: 'Войсчат', value: 'есть, в игре' },
  { key: 'Лицензия', value: 'не требуется' },
  { key: 'Правила', value: 'обсуждаем в чате' },
]

const checklist = [
  {
    done: true,
    title: 'Узнать о сервере',
    text: 'Ай да молодец.',
  },
  {
    done: false,
    title: 'Вступить в один из чатов',
    text: 'Присоединись в дискорд сервера или в телеграм чтобы быть в курсе событий и попасть в вайтлист.',
  },
  {
    done: false,
    title: 'Позвать друзей',
    text: 'Чем нас больше - тем лучше!',
  },
]

onMounted(() => {
  animate('#tfgm-hero-bg', {
    y: '12%',
    ease: 'linear',
    autoplay: onScroll({
      sync: 1,
      enter: 'max top',
      leave: 'min bottom',
    }),
  })
})
</script>

<template>
  <div class="-mt-14 md:-mt-18">
    <section class="relative min-h-[42rem] overflow-hidden border-b-4 border-black/80 lg:min-h-[46rem]">
      <NuxtImg
          id="tfgm-hero-bg"
          src="/img/tfgm/hero.webp"
          alt="Деревня на закате в TerraFirmaGreg Modern"
          class="absolute inset-0 h-[115%] w-full object-cover object-center"
          preload
      />
      <div class="absolute inset-0 bg-stone-950/25 sm:bg-stone-950/40"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/45 to-stone-950/70 sm:bg-gradient-to-r sm:from-stone-950 sm:via-stone-950/80 sm:to-stone-950/10"></div>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-stone-950 to-transparent"></div>

      <div class="relative px-4 pb-16 pt-28 sm:px-8 md:px-32 md:pt-36">
        <div class="max-w-3xl">
          <p class="font-montserrat text-base text-amber-500/90 sm:text-lg">
            Заходи к нам на
          </p>

          <h1 class="mt-3 font-unbounded text-4xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
            TerraFirmaGreg<br>
            Modern
            <span class="ml-1 inline-block -rotate-3 border-2 border-amber-700 bg-amber-600 px-2 pb-1 align-middle font-montserrat text-2xl text-stone-950 sm:text-4xl">RU</span>
          </h1>

          <p class="mt-6 max-w-xl text-lg text-stone-300">
            Новый майнкрафт, который придётся учить заново. Практически все ванильные механики переработаны, это новая игра которую мы пройдём сообща!
          </p>

          <div class="mt-8">
            <ServerCard :target="START_AT" />
          </div>

          <div class="mt-6 flex flex-wrap items-center gap-3">
            <a :href="links.chat" target="_blank" rel="noopener" class="mc-btn mc-btn-primary">
              <Icon name="iconoir:telegram" class="text-xl" />
              Вступить в чат
            </a>
            <a :href="links.discord" target="_blank" rel="noopener" class="mc-btn mc-btn-secondary">
              <Icon name="iconoir:discord" class="text-xl" />
              Discord
            </a>
            <a :href="links.channel" target="_blank" rel="noopener"
               class="font-montserrat text-lg text-stone-400 underline decoration-stone-700 underline-offset-4 hover:text-stone-200">
              тгк с владельца →
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden border-b-4 border-black/80 bg-[#171310]">
      <div class="absolute inset-0 opacity-25"
           style="background-image: url('/img/tfgm/tex/deepslate.png'); background-size: 48px; image-rendering: pixelated;"></div>
      <div class="relative flex overflow-hidden py-5">
        <div v-for="copy in 2" :key="copy" class="flex shrink-0 animate-[tfgm-ticker_38s_linear_infinite] items-center">
          <template v-for="(age, index) in ages" :key="`${copy}-${age.item}`">
            <div class="flex shrink-0 items-center gap-3 px-6">
              <img :src="itemIcon(age.item)" alt="" loading="lazy" class="pixel size-10">
              <span class="font-montserrat text-xl text-stone-300">{{ age.label }}</span>
            </div>
            <span v-if="index < ages.length" class="font-montserrat text-xl text-stone-600">—</span>
          </template>
        </div>
      </div>
    </section>

    <section class="px-4 py-20 sm:px-8 md:px-32">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-4">
          <p class="font-montserrat text-lg text-stone-600">01</p>
          <h2 class="mt-1 font-unbounded text-3xl leading-tight sm:text-4xl">
            Что это<br>вообще такое
          </h2>
        </div>

        <div class="space-y-5 text-lg text-stone-300 lg:col-span-8">
          <p>
            TerraFirmaGreg Modern - это не "майнкрафт с модами", а другая игра на его движке.
            TerraFirmaCraft переписывает выживание, GregTech - технологии. Здесь всё построено
            на реалистичном развитии из камешек и палочек
          </p>
          <p>
            Несколько месяцев назад мы компанией запускали эту сборку - и зашло всем,
            даже тем, кто обычно душниловку не переваривает. А теперь вы можете поиграть
            с нами или со своими друзьями бесплатно на нашем сервере.
          </p>

          <figure class="!mt-10 flex justify-end gap-4 flex-wrap">
            <NuxtImg src="/img/tfgm/photo.webp" width="1200"
                     alt="Фоточка"
                     class="w-full max-w-96 border-4 border-black/70 mr-0" />
            <NuxtImg src="/img/tfgm/photo2.png" width="1200"
                     alt="Фоточка 2"
                     class="w-full max-w-96 border-4 border-black/70 mr-0" />
          </figure>
        </div>
      </div>
    </section>

    <section class="relative border-y-4 border-black/80 bg-[#14110f]">
      <div class="absolute inset-0 opacity-20"
           style="background-image: url('/img/tfgm/tex/stone.png'); background-size: 40px; image-rendering: pixelated;"></div>

      <div class="relative grid lg:grid-cols-12">
        <div class="relative min-h-64 lg:col-span-5 lg:min-h-full overflow-hidden">
          <NuxtImg src="/img/tfgm/garden.png" width="1200"
                   alt="Теплица в TerraFirmaGreg Modern"
                   class="h-[120%] w-full object-cover" />
          <div class="absolute inset-0 bg-gradient-to-r from-transparent to-[#14110f] lg:block hidden"></div>
        </div>

        <div class="px-4 py-16 sm:px-8 md:px-16 lg:col-span-7 lg:py-20">
          <p class="font-montserrat text-lg text-stone-600">02</p>
          <h2 class="mt-1 font-unbounded text-3xl leading-tight sm:text-4xl">Кому зайдёт</h2>
          <p class="mt-4 max-w-xl text-stone-400">
            Сборка охватывает сразу кучу разных игроков - и все они нужны друг другу.
            Поэтому она раскрывается именно на сервере.
          </p>

          <ul class="mt-10 space-y-0">
            <li v-for="role in roles" :key="role.title"
                class="flex gap-4 border-t border-dashed border-stone-800 py-5 first:border-t-0 first:pt-0">
              <img :src="itemIcon(role.item)" alt="" loading="lazy" class="pixel mt-1 size-9 shrink-0">
              <div>
                <p class="font-unbounded text-lg">{{ role.title }}</p>
                <p class="mt-1 max-w-xl text-stone-400">{{ role.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden border-b-4 border-black/80">
      <NuxtImg src="/img/tfgm/expedition.webp" width="1400"
               alt="Лодка в тумане - экспедиция на другой континент"
               class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-stone-950/75"></div>

      <div class="relative px-4 py-20 sm:px-8 md:px-32 lg:py-28">
        <div class="ml-auto max-w-2xl">
          <p class="font-montserrat text-lg text-white/50">живой пример</p>
          <blockquote class="mt-4 font-unbounded text-xl leading-relaxed sm:text-2xl">
            Нужна особая глина. Спавнится она только под определённым цветком,
            а растёт он вообще на другом континенте - экспедиция туда займёт часы.
            Кому-то будет впадлу, и он просто купит глину у другого игрока.
          </blockquote>
          <p class="mt-6 max-w-xl text-lg text-stone-300">
            Скажете, какой смысл? А в этом и прикол: одному в кайф именно путешествовать и добывать,
            но душно сидеть с механизмами. Другому наоборот - готов часами ковать инструменты,
            но никуда не поедет.
          </p>
        </div>
      </div>
    </section>

    <section class="px-4 py-20 sm:px-8 md:px-32">
      <div class="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-5">
          <p class="font-montserrat text-lg text-stone-600">03</p>
          <h2 class="mt-1 font-unbounded text-3xl leading-tight sm:text-4xl">Детали</h2>

          <dl class="mc-panel mt-6 space-y-3 p-5">
            <div v-for="fact in facts" :key="fact.key" class="flex items-baseline gap-x-2">
              <dt class="shrink-0 font-montserrat text-lg text-stone-500">{{ fact.key }}</dt>
              <span class="h-px min-w-4 flex-1 border-b border-dotted border-stone-700"></span>
              <dd class="text-right font-montserrat text-lg text-stone-200">{{ fact.value }}</dd>
            </div>
          </dl>

          <p class="mt-4 font-montserrat text-base text-stone-500">
            Остались вопросы? Всегда рады ответить в любом чате
          </p>
        </div>

        <div class="lg:col-span-7 lg:text-right">
          <p class="font-montserrat text-lg text-stone-600">04</p>
          <h2 class="mt-1 font-unbounded text-3xl leading-tight sm:text-4xl">Что сделать до старта</h2>

          <ul class="mt-8 space-y-6">
            <li v-for="task in checklist" :key="task.title" class="flex lg:flex-row-reverse gap-4">
              <span class="mt-0.5 flex size-7 shrink-0 items-center justify-center border-2 font-montserrat text-lg"
                    :class="task.done
                      ? 'border-lime-700 bg-lime-900/40 text-lime-400'
                      : 'border-stone-700 bg-black/40 text-stone-700'">
                {{ task.done ? '✓' : '' }}
              </span>
              <div>
                <p class="font-unbounded text-lg" :class="task.done ? 'text-stone-500 line-through' : ''">
                  {{ task.title }}
                </p>
                <p class="mt-1 max-w-xl text-stone-400">{{ task.text }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden border-t-4 border-black/80">
      <div class="absolute inset-0 opacity-30"
           style="background-image: url('/img/tfgm/tex/dirt.png'); background-size: 44px; image-rendering: pixelated;"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-stone-950/60 to-stone-950"></div>

      <div class="relative px-4 py-20 sm:px-8 md:px-32">
        <div class="grid items-end gap-10 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <h2 class="font-unbounded text-3xl leading-tight sm:text-4xl">
              Залетай сейчас к нам
            </h2>
            <p class="mt-4 max-w-xl text-lg text-stone-300">
              В чате все обсуждения и вайтлист, заходи чтобы ничего не пропустить
            </p>

            <div class="mt-8 flex flex-wrap items-center gap-3">
              <a :href="links.chat" target="_blank" rel="noopener" class="mc-btn mc-btn-primary">
                <Icon name="iconoir:telegram" class="text-xl" />
                Telegram-чат
              </a>
              <a :href="links.discord" target="_blank" rel="noopener" class="mc-btn mc-btn-secondary">
                <Icon name="iconoir:discord" class="text-xl" />
                Discord
              </a>
            </div>
          </div>

          <div class="lg:col-span-5">
            <NuxtImg src="/img/tfgm/sail.webp" width="900"
                     alt="Парусник в TerraFirmaGreg Modern"
                     class="w-full border-4 border-black/70" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
