<template>
  <div class="bg-slate-200 h-screen flex justify-center">
    <div
      class="bg-white rounded-md shadow-md min-w-full h-72 p-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-4"
    >
      <div class="sm:col-span-4 text-center text-2xl">EndPoint Config</div>
      <div class="sm:col-span-1"></div>
      <div class="sm:col-span-2">
        <label for="endpoint" class="block text-md font-medium leading-6"
          >Search EndPoint</label
        >
        <div class="">
          <ComboBox
            id="endpoint"
            v-model="selectedEndpoint"
            class="w-100 mr-2"
            :options="endpointList"
            :keyMapper="
              (item) => `[${item.method}] ${item.title} (${item.path})`
            "
            @change="getEndpointDetails"
          />
        </div>
      </div>

      <div class="sm:col-span-1 flex justify-center">
        <button
          type="button"
          class="flex items-center h-12 rounded-md px-4 py-1.5 text-sm font-medium text-green-900 bg-green-200 duration-400 hover:bg-green-300 hover:shadow-lg"
          @click="showModal"
        >
          <PlusCircleIcon class="mr-2 h-5 w-5" />
          <span>Add New</span>
        </button>
      </div>

      <!-- Endpint details -->
      <div class="sm:col-span-4 grid grid-cols-2 text-xl mt-6">
        <label
          for="method"
          class="block col-span-1 text-end mr-3 text-sm font-bold leading-6"
          >Method:</label
        >
        <div class="col-span-1">
          <Badge
            id="method"
            class="col-span-1"
            :class="getClass(endpointDetails.method)"
            :text="endpointDetails.method"
          ></Badge>
        </div>

        <label
          for="apiName"
          class="block col-span-1 text-sm text-end mr-3 font-bold leading-6"
          >API Name:</label
        >
        <span id="apiName" class="col-span-1">{{ endpointDetails.title }}</span>

        <label
          for="apiName"
          class="block col-span-1 text-end mr-3 text-sm font-bold leading-6"
          >API Path:</label
        >
        <span id="apiName" class="col-span-1 text-sm">{{
          endpointDetails.path
        }}</span>
      </div>
    </div>
    <!-- Main Content -->
    <div></div>
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
import ComboBox from "@/components/ComboBox.vue";
import Badge from "@/components/Badge.vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import EndPointService from "@/services/endpoint.service.js";

const endpointList = ref([]);
const selectedEndpoint = ref(endpointList.value[0]);
const endpointDetails = ref({});

onMounted(() => {
  getEndpoints();
});

watch(selectedEndpoint, (newVal, oldVal) => {
  getEndpointDetails(newVal.id);
});

const getEndpoints = () => {
  EndPointService.getEndpointList().then((res) => {
    endpointList.value = res;
  });
};

const getEndpointDetails = (id) => {
  EndPointService.getEndpointDetails(id).then((res) => {
    endpointDetails.value = res;
  });
};

const getClass = (text) => {
  let color;
  switch (text) {
    case "GET":
      color = "green";
      break;
    case "POST":
      color = "orange";
      break;
    case "PUT":
      color = "indigo";
      break;
    case "DELETE":
      color = "red";
      break;
    default:
      color = "gray";

      return color;
  }
  return `bg-${color}-400 text-${color}-800`;
};

// bg-green-400 bg-green-800
// bg-orange-400 bg-orange-800
// bg-indigo-400 bg-indigo-800
// bg-gray-400 bg-gray-800
</script>

<style scoped></style>
