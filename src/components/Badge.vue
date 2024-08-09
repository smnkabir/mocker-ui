<template>
  <span
    class="m-1 rounded-lg bg-opacity-50 px-2 py-1 text-xs font-medium uppercase tracking-wider"
    :class="class"
    >{{ text }}</span
  >
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  class: {
    type: String,
    default: "",
  },
});
</script>
