<script setup>

const props = defineProps({
  status: {type: String, default: "incomplete"},
  title: {type: String},
})

</script>

<template>
<div class="bg-[rgb(19,19,19)] rounded-lg p-2 flex gap-2 static z-10 snap-center">
  <div>
    <div v-if="props.status === 'incomplete'">
      <div class="w-6 h-6 border-2 border-neutral-700 rounded-md"></div>
    </div>
    <div v-if="props.status === 'processing'">
      <div class="w-6 h-6 border-2 border-orange-500 z-10 bg-orange-500 rounded-md flex justify-center items-center text-xs">
        <i class="pi pi-spinner animate-spin"></i>
      </div>
    </div>
    <div class="w-6 h-6 relative" v-if="props.status === 'completed'">
      <div class="absolute blur-xs w-6 h-6 border-2 border-green-500 bg-green-500 rounded-md flex justify-center items-center text-xs">
        <i class="pi pi-check"></i>
      </div>
      <div class="absolute w-6 h-6 border-2 border-green-500 z-10 bg-green-500 rounded-md flex justify-center items-center text-xs">
        <i class="pi pi-check"></i>
      </div>
    </div>
  </div>
  <div>
    <p v-if="status === 'incomplete'" class="text-neutral-200">{{title}}</p>
    <p v-if="status === 'processing'" class="text-orange-400">{{title}}</p>
    <p v-if="status === 'completed'" class="line-through text-neutral-200">{{title}}</p>
  </div>
</div>
</template>
