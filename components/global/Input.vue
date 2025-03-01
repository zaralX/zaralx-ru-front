<script setup>
const model = defineModel()

const props = defineProps({
  placeholder: { type: String, default: "Введите.." },
  name: { type: String, default: "Имя" },
  max: { type: Number, default: 16 },
})
</script>

<template>
  <div>
    <p class="text-sm text-neutral-500">{{ props.name }}</p>
    <input
        class="w-full bg-transparent border-2 rounded-lg px-2 py-1 border-neutral-700 outline-0 focus:animate-spin-ring"
        :placeholder="props.placeholder"
        type="text"
        model-value="model"
        :max="props.max"
        :maxlength="props.max"
    />
  </div>
</template>
