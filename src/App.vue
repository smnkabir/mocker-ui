<template>
  <div class="bg-slate-200 h-screen flex justify-center">
    <div
      class="bg-white rounded-md shadow-md min-w-full h-40 p-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-4"
    >
      <div class="sm:col-span-4 text-center text-2xl">EndPoint Config</div>
      <div class="sm:col-span-1"></div>
      <div class="sm:col-span-2">
        <label for="endpoint" class="block text-sm font-medium leading-6"
          >Search EndPoint</label
        >
        <div class="">
          <ComboBox
            id="endpoint"
            v-model="selectedEndpoint"
            :multiple="true"
            class="w-100 mr-2"
            :options="endpointList"
          />
        </div>
      </div>

      <div class="sm:col-span-1 flex justify-center">
        <button
          type="button"
          class="flex items-center h-12 rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-green-900 bg-green-200 duration-400 hover:bg-green-300 hover:shadow-lg"
          @click="showModal"
        >
          <PlusCircleIcon class="mr-2 h-5 w-5" />
          <span>Add New</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import ComboBox from "@/components/ComboBox.vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";

const selectedEndpoint = ref({});
const endpointList = ref([]);

onMounted(() => {});
</script>

<style scoped></style>
