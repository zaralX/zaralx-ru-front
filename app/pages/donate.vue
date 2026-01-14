<script setup lang="ts">
import { onMounted, computed } from 'vue'
import {animate, random, stagger} from "animejs";
import ExperimentsParticleCircleComponent from "~/components/experiments/particleCircle/Component.vue";
import RecentCard from "~/components/sponsors/RecentCard.vue";
import type {Donation} from "~/types/donate";

type Donator = {
  name: string
  value: number
}

const { data } = await useFetch<{ recent: Donation[], top: Donator[] }>("/api/donates");

const lastDonations = ref<Donation[]>(data.value?.recent || [])

const donators = ref<Donator[]>(data.value?.top || [])

const lowest = computed(() => Math.min(...donators.value.map((d: Donator) => d.value)))
const highest = computed(() => Math.max(...donators.value.map((d: Donator) => d.value)))

const rotation = ref(0)
const offset = 100

const minOffset = 10
const maxOffset = 100

const minTextSize = 0.75
const maxTextSize = 2.0

const positions = computed(() => {
  const n = donators.value.length
  return donators.value.map((donator: Donator, index: number) => {
    const angle = (index / n) * Math.PI * 2 + rotation.value

    const t = (donator.value - lowest.value) / (highest.value - lowest.value || 1)
    const radius = maxOffset - t * (maxOffset - minOffset)

    return {
      ...donator,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  })
})

onMounted(async () => {
  // donators.value = data || []
  animate(rotation, {
    value: Math.PI * 2,
    duration: 10000,
    ease: 'linear',
    loop: true,
    update: () => {
      // computed positions автоматически обновляются
    }
  })
})
</script>

<template>
  <div class="px-4 sm:px-8 md:px-32 overflow-hidden">
    <div class="pt-16 text-center">
      <h1 class="text-3xl font-unbounded">Спонсоры</h1>
      <p class="text-slate-400 text-lg">Спасибо вам за поддержку, вы лучшие!</p>
    </div>
    <div class="md:h-[50vh] md:grid md:grid-cols-3">
      <div class="justify-center items-center hidden md:flex">
        <div class="bg-stone-800 relative z-10 rounded-sm overflow-hidden border-1 border-blue-600 transform transition-all hover:rotate-y-15 hover:rotate-x-15 hover:-skew-3 hover:scale-115">
          <div class="bg-blue-600 p-2 font-semibold flex text-lg items-center">
            <NuxtImg class="w-8" src="https://cdn.prod.website-files.com/68a8369cf1325df8d6f45a0f/68ad8012c8e19135fcab9569_contact-icon-star.svg" />
            Tribute
          </div>
          <div class="bg-stone-900 rounded-sm p-1 flex flex-col gap-1">
            <NuxtLink to="https://t.me/tribute/app?startapp=dDuX">
              <ShButton variant="ghost" icon="lucide-external-link">Международный донат</ShButton>
            </NuxtLink>
            <NuxtLink to="https://t.me/tribute/app?startapp=sKMw" class="w-full">
              <ShButton variant="ghost" icon="lucide-external-link" class="w-full">Приватка</ShButton>
            </NuxtLink>
          </div>
        </div>
        <div class="absolute bg-blue-600 w-48 h-32 rounded-sm blur-xl animate-pulse"></div>
      </div>
      <div class="relative w-full h-full flex justify-center items-center">
        <p
            v-for="donator in positions"
            class="absolute"
            :style="{
      transform: `translate(${donator.x}px, ${donator.y}px)`,
      fontSize: `${minTextSize + (donator.value - lowest) / (highest - lowest) * (maxTextSize - minTextSize)}rem`}"
        >
          {{ donator.name }}
        </p>

        <ExperimentsParticleCircleComponent color="#FF6900" class="md:scale-300 pointer-events-none" :size="2" :radius="$device.isMobile ? 150 : 200" square />
      </div>
      <div class="md:flex justify-center items-center space-y-2">
        <div class="bg-stone-800 relative z-10 min-w-48 rounded-sm overflow-hidden border-1 border-orange-600 transform transition-all hover:rotate-y-15 hover:rotate-x-15 hover:-skew-3 hover:scale-115">
          <div class="bg-orange-600 p-2 font-semibold flex text-lg items-center">
            <NuxtImg class="w-8" src="https://cdn.prod.website-files.com/68a8369cf1325df8d6f45a0f/68ad8012c8e19135fcab9569_contact-icon-star.svg" />
            Donate
          </div>
          <div class="bg-stone-900 rounded-sm p-1 flex flex-col gap-1">
            <NuxtLink to="https://www.tbank.ru/cf/81YON86acu8" class="w-full">
              <ShButton variant="ghost" icon="lucide-external-link" class="w-full">T-Bank</ShButton>
            </NuxtLink>
            <NuxtLink to="https://yookassa.ru/my/i/aWQhLKeW7H2f/l" class="w-full">
              <ShButton variant="ghost" icon="lucide-external-link" class="w-full">Другой способ</ShButton>
            </NuxtLink>
          </div>
        </div>
        <div class="hidden md:block absolute bg-orange-600 w-48 h-32 rounded-sm blur-xl animate-pulse"></div>
        <div class="block md:hidden bg-stone-800 relative z-10 rounded-sm overflow-hidden border-1 border-blue-600 transform transition-all hover:rotate-y-15 hover:rotate-x-15 hover:-skew-3 hover:scale-115">
          <div class="bg-blue-600 p-2 font-semibold flex text-lg items-center">
            <NuxtImg class="w-8" src="https://cdn.prod.website-files.com/68a8369cf1325df8d6f45a0f/68ad8012c8e19135fcab9569_contact-icon-star.svg" />
            Tribute
          </div>
          <div class="bg-stone-900 rounded-sm p-1 flex flex-col gap-1">
            <NuxtLink to="https://t.me/tribute/app?startapp=dDuX" class="w-full">
              <ShButton variant="ghost" icon="lucide-external-link" class="w-full">Международный донат</ShButton>
            </NuxtLink>
            <NuxtLink to="https://t.me/tribute/app?startapp=sKMw" class="w-full">
              <ShButton variant="ghost" icon="lucide-external-link" class="w-full">Приватка</ShButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="py-16 text-center">
      <h1 class="text-3xl font-unbounded -translate-y-8">Последние донаты</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <RecentCard v-for="donation in lastDonations" :name="donation.name" :amount="donation.value" />
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>