<script setup>

const props = defineProps({
  name: String,
  icon: String,
  subtitle: String,
  percent: {type: Number, default: 50},
  low: {type: Boolean, default: false},
  basic: {type: Boolean, default: false},
  color: {type:String, default:'sky-400'},
})

const randomDelay = () => Math.floor(Math.random() * 500) + 100

</script>

<template>
  <div v-if="basic">
    <div :style="{'background-color': props.color + '50'}" class="flex items-center gap-1 rounded-lg px-2 py-1 border-[2px] border-neutral-800 relative">
      <i class="pi pi-check-circle -top-1 -left-1 absolute text-xs text-green-400"></i>
      <i class="pi pi-check-circle -top-1 -left-1 absolute text-xs text-green-400 blur-sm"></i>
      <img v-if="!props.icon.startsWith('devicon')" class="w-4 aspect-square" :src="props.icon" alt="icon">
      <i v-else :class="props.icon"></i>
      <div class="h-full w-full rounded-xl text-xs">
        {{props.name}}
      </div>
    </div>
  </div>
  <div v-else-if="low">
    <div class="flex items-center gap-1 transition-all duration-500 opacity-anim">
      <img v-if="!props.icon.startsWith('devicon')" class="w-5 aspect-square" :src="props.icon" alt="icon">
      <i v-else :class="props.icon"></i>
      <div class="w-full rounded-xl bg-neutral-800 relative h-5 overflow-hidden">
        <div :style="{'background-color': props.color, width: props.percent + '%', 'animation-delay': randomDelay() + 'ms'}" class="absolute h-full rounded-xl left-to-r-anim"></div>
        <div :style="{'background-color': props.color, right: 90 - props.percent + '%', 'animation-delay': randomDelay() + 'ms'}" class="absolute w-full h-full opacity-50 rounded-xl left-to-r-anim"></div>
        <div :style="{'background-color': props.color, right: 75 - props.percent + '%', 'animation-delay': randomDelay() + 'ms'}" class="absolute w-full h-full opacity-25 rounded-xl left-to-r-anim"></div>
        <p class="font-onest text-xs px-2 py-0.5 absolute z-10 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{{props.name}}</p>
      </div>
    </div>
  </div>
  <div v-else :class="props.subtitle === 'Inactive' ? 'opacity-75' : ''" class="bg-[rgb(19,19,19)] rounded-md border-[3px] border-neutral-800 relative pt-6 overflow-hidden">
    <div class="absolute top-0 flex items-center gap-1 p-2">
      <img v-if="!props.icon.startsWith('devicon')" class="w-5 aspect-square" :src="props.icon" alt="icon">
      <i v-else :class="props.icon"></i>
      <p>{{props.name}}</p>
    </div>
    <div class="bottom-to-t-anim min-h-16 flex flex-col justify-end">
      <div :style="{'background-color': props.color, 'animation-delay': randomDelay() + 'ms'}" class="opacity-50 absolute bottom-2 w-full h-8 md:h-16 animation-delay-300 md:animate-clip-fluid rounded-b-sm"></div>
      <div :style="{'background-color': props.color, 'animation-delay': randomDelay() + 'ms'}" class="w-full h-8 md:h-16 md:animate-clip-fluid rounded-b-sm"></div>
      <div :style="{'background-color': props.color, 'animation-delay': randomDelay() + 'ms'}" class="opacity-25 absolute bottom-1 w-full h-8 md:h-16 md:animate-clip-fluid animation-delay-500 rounded-b-sm"></div>
      <div :style="{'background-color': props.color, 'animation-delay': randomDelay() + 'ms'}" class="absolute blur-lg z-20 opacity-25 w-full h-8 hidden md:block bottom-0 rounded-b-sm"></div>
      <div class="absolute z-10 bottom-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-lg pl-1">
        {{props.subtitle}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.left-to-r-anim {
  animation: from-null-to-exist-lr 2s ease-in-out;
}

@keyframes from-null-to-exist-lr {
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(0);
  }
}

.bottom-to-t-anim {
  animation: from-null-to-exist-bt 2s ease-in-out;
}

@keyframes from-null-to-exist-bt {
  0% {
    transform: translateY(150%);
  }
  100% {
    transform: translateY(0);
  }
}

.opacity-anim {
  animation: opacity 1.5s ease-out;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>