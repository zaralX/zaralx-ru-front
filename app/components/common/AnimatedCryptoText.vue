<script setup lang="ts">
const model = defineModel<string>()

const props = withDefaults(defineProps<{
  timePerChar?: number
}>(), {
  timePerChar: () => 40
})

let timer: number | null = null
const shownChars = ref(0)
const shownText = ref(generatePart(model.value?.length ?? 0))

watch(model, () => {
  console.log(model)
  shownChars.value = 0
  updateText()
  run()
})

onMounted(() => {
  run()
})

function run() {
  if (timer) {
    clearInterval(timer)
  }
  timer = window.setInterval(() => {
    shownChars.value += 1
    updateText()
    if (shownChars.value >= (model.value?.length ?? 0)) {
      clearInterval(timer!)
    }
  }, props.timePerChar)
}

function updateText() {
  if (!model.value) {
    return;
  }
  shownText.value = model.value!.slice(0, shownChars.value) + generatePart(model.value!.length - shownChars.value)
}

function generatePart(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
  let hash = '';
  for (let i = 0; i < length; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
{{shownText}}
</template>

<style scoped>

</style>