<template>
  <div
    v-if="show"
    class="pointer-events-auto fixed right-4 top-4 z-30 w-full max-w-sm overflow-hidden rounded-lg shadow-lg"
    :class="success ? 'bg-green-100' : 'bg-red-100'"
  >
    <div class="p-4">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <component
            :is="success ? CheckCircleIcon : ExclamationCircleIcon"
            class="h-10 w-10"
            :class="success ? 'text-green-700' : 'text-red-700'"
          />
        </div>
        <div class="ml-3 w-0 flex-1 pt-0.5">
          <p
            v-if="title"
            :class="success ? 'text-green-700' : 'text-red-700'"
            class="text-sm font-medium"
          >
            {{ title }}
          </p>
        </div>
        <div class="ml-4 flex flex-shrink-0">
          <button
            class="inline-flex bg-transparent rounded-md hover:text-gray-500"
            @click="close"
          >
            <span class="sr-only">Close</span>
            <XMarkIcon
              class="h-4 w-4"
              :class="success ? 'text-green-700' : 'text-red-700'"
            />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const emit = defineEmits(["closeAlert"]);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },

  success: {
    type: Boolean,
    default: true,
  },

  title: {
    type: String,
    default: "",
  },
});

const close = () => {
  emit("closeAlert");
};
</script>
