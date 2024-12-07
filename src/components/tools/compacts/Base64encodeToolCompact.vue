<script setup>
import ToolCompact from "../ToolCompact.vue";
import { ref, watch } from "vue";

const input = ref("");
const output = ref("");

watch(input, (newValue) => {
  try {
    output.value = btoa(newValue);
  } catch (error) {
    output.value = "Invalid input for Base64 encoding.";
  }
});
</script>

<template>
  <ToolCompact title="Base64 decode">
    <template #main>
      <div class="flex flex-col h-full">
        <div class="h-full flex flex-col">
          <p>Input</p>
          <textarea
              v-model="input"
              class="flex-1 resize-none bg-neutral-800 rounded-md p-1 text-sm border border-neutral-600 outline-0 focus:ring-amber-500 focus:border-amber-500"
          ></textarea>
        </div>
        <div class="h-full flex flex-col">
          <p>Output</p>
          <textarea
              class="flex-1 resize-none bg-neutral-800 rounded-md p-1 text-sm border border-neutral-600 outline-0 focus:ring-amber-500 focus:border-amber-500"
              readonly
          >{{ output }}</textarea>
        </div>
      </div>
    </template>
  </ToolCompact>
</template>

<style scoped>
</style>
