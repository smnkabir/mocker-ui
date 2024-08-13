<template>
  <div class="bg-slate-200 p-3 sm:px-40 h-full min-h-screen">
    <div
      class="bg-gray-100 rounded-md shadow-md min-w-full p-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-4"
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
          @click="showNewEnpointModal = true"
        >
          <PlusCircleIcon class="mr-2 h-5 w-5" />
          <span>Add New</span>
        </button>
      </div>

      <!-- Endpint details -->
      <div
        v-if="Object.keys(endpointDetails).length > 0"
        class="sm:col-span-4 grid grid-cols-2 mt-6"
      >
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
        <div class="col-span-1">
          <span id="apiName">{{ endpointDetails.title }}</span>
        </div>

        <label
          for="apiName"
          class="block col-span-1 text-end mr-3 text-sm font-bold leading-6"
          >API Path:</label
        >
        <span id="apiName" class="col-span-1 text-sm">{{
          endpointDetails.path
        }}</span>

        <div class="col-span-2 flex justify-center">
          <button
            type="button"
            class="flex items-center rounded-md px-4 py-1.5 text-sm font-medium text-green-900 bg-green-200 duration-400 hover:bg-green-300 hover:shadow-lg"
            @click="showNewResModal = true"
          >
            <PlusCircleIcon class="mr-2 h-5 w-5" />
            <span>New Res</span>
          </button>
        </div>
      </div>
    </div>
    <!-- Main Content -->
    <div
      class="my-5 rounded-md bg-gray-100 grid grid-cols-10 shadow-md last:mb-0"
      v-for="(res, idx) in endpointDetails.responseList"
    >
      <div class="col-span-1 flex justify-center">
        <input
          :id="`status`"
          v-model="res.status"
          class="m-1 cursor-pointer"
          type="checkbox"
          true-value="1"
          false-value="0"
          @click="updateResStatus(res)"
        />
      </div>
      <div class="col-span-1 flex items-center justify-center">
        <Badge
          :text="res.statusCode + ''"
          :class="getClass(res.statusCode)"
        ></Badge>
      </div>
      <div class="col-span-7 flex justify-center">
        <textarea
          :id="`res${idx}`"
          v-model="res.res"
          name="res"
          rows="8"
          class="block w-full rounded-md border bg-gray-200 m-2 p-1.5 sm:text-sm sm:leading-6"
          disabled
        />
      </div>
      <div class="col-span-1 flex items-center justify-center">
        <XCircleIcon
          class="w-6 h-6 cursor-pointer m-5 text-red-500"
          @click="removeRes(res, idx)"
        />
      </div>
    </div>
  </div>
  <!-- Add res Modal -->
  <Modal
    :is-open="showNewResModal"
    width="max-w-lg"
    title="Add New Response"
    :content="newRes"
    @close-modal="closeModal"
  >
    <template #content="{ content }">
      <div class="grid grid-cols-1 gap-4 whitespace-normal">
        <div class="text-left text-sm tracking-wide">
          <p class="p-1 font-semibold">Status code:</p>
          <ComboBox
            id="statusCode"
            v-model="content.statusCode"
            class="w-100 mr-2"
            :options="statusCodeList"
          />
        </div>

        <div class="text-left text-sm tracking-wide">
          <p class="p-1 font-semibold">Response Body:</p>
          <textarea
            id="about"
            v-model="content.res"
            name="about"
            rows="5"
            class="block w-full rounded-md border-1 border-gray-500 bg-gray-200 p-1.5 shadow-sm sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </template>
    <template #action>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        type="button"
        class="mr-4 inline-flex justify-center rounded-md px-4 py-1.5 text-sm font-medium duration-300 text-green-900 bg-green-200 duration-400 hover:bg-green-300 hover:shadow-lg"
        @click="saveNewRes"
      >
        Save
      </button>
    </template>
  </Modal>

  <!-- Add New Endpoint Modal -->
  <Modal
    :is-open="showNewEnpointModal"
    width="max-w-lg"
    title="Add New EndPoint"
    :content="newEndPoint"
    @close-modal="closeModal"
  >
    <template #content="{ content }">
      <div class="grid grid-cols-1 gap-4 whitespace-normal">
        <div class="text-left text-sm tracking-wide">
          <p class="p-1 font-semibold">Method:</p>
          <ComboBox
            id="method"
            v-model="content.method"
            class="w-100 mr-2"
            :options="methodList"
          />
        </div>

        <div class="text-left text-sm tracking-wide">
          <p class="p-1 font-semibold">Title:</p>
          <input
            id="title"
            v-model="content.title"
            name="title"
            class="block w-full rounded-md border-1 border-gray-500 bg-gray-200 p-1.5 shadow-sm sm:text-sm sm:leading-6"
          />
        </div>

        <div class="text-left text-sm tracking-wide">
          <p class="p-1 font-semibold">Path:</p>
          <input
            id="path"
            v-model="content.path"
            name="path"
            class="block w-full rounded-md border-1 border-gray-500 bg-gray-200 p-1.5 shadow-sm sm:text-sm sm:leading-6"
          />
        </div>
      </div>
    </template>
    <template #action>
      <button
        type="button"
        class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        type="button"
        class="mr-4 inline-flex justify-center rounded-md px-4 py-1.5 text-sm font-medium text-accent-foreground text-green-900 bg-green-200 duration-400 hover:bg-green-300 hover:shadow-lg"
        @click="saveNewEndPiont"
      >
        Save
      </button>
    </template>
  </Modal>
  <!-- Alert -->
  <Alert
    :show="showAlert"
    :success="isSuccess"
    :title="title"
    @close-alert="closeAlert"
  />
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
import ComboBox from "@/components/ComboBox.vue";
import Modal from "@/components/Modal.vue";
import Badge from "@/components/Badge.vue";
import Alert from "@/components/Alert.vue";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/vue/24/outline";
import EndPointService from "@/services/endpoint.service.js";

const showNewResModal = ref(false);
const newRes = ref({});
const statusCodeList = [200, 400, 500];

const showNewEnpointModal = ref(false);
const newEndPoint = ref({});
const methodList = ["GET", "POST", "PUT", "DELETE"];

const endpointList = ref([]);
const selectedEndpoint = ref(endpointList.value[0]);
const endpointDetails = ref({});

const showAlert = ref(false);
const isSuccess = ref(true);
const title = ref("");

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

const updateResStatus = (res) => {
  console.log(res);
  if (res.status == 0) {
    let req = { endpointId: res.endPointId, resId: res.id };
    EndPointService.updateResStatus(req).then((res) => {
      getEndpointDetails(selectedEndpoint.value.id);
      showAlertAction(true, res);
    });
  }
};

const removeRes = (res, idx) => {
  if (res.status == 1) {
    showAlertAction(false, "Active Response can not be removed");
    return;
  }
  endpointDetails.value.responseList.splice(idx, 1);
  EndPointService.removeRes({ resId: res.id }).then((res) => {
    showAlertAction(true, res);
  });
};

const saveNewRes = () => {
  let req = Object.assign({}, newRes.value, {
    endPointId: selectedEndpoint.value.id,
  });

  let obj = JSON.parse(req.res);
  console.log(obj);
  req.res = JSON.stringify(obj);
  EndPointService.addNewRes(req).then((res) => {
    getEndpointDetails(selectedEndpoint.value.id);
    closeModal();
    showAlertAction(true, res);
  });
};

const saveNewEndPiont = () => {
  EndPointService.saveNewEndPiont(newEndPoint.value).then(
    (res) => {
      getEndpoints();
      closeModal();
      showAlertAction(true, res);
    },
    (err) => {
      showAlertAction(false, res);
    }
  );
};

const closeModal = () => {
  showNewResModal.value = false;
  showNewEnpointModal.value = false;
  newRes.value = {};
  newEndPoint.value = {};
};

const showAlertAction = (success, msg) => {
  showAlert.value = true;
  isSuccess.value = success;
  title.value = msg;
  setTimeout(() => {
    closeAlert();
  }, 5000);
};

const closeAlert = () => {
  showAlert.value = false;
};

const getClass = (text) => {
  let color;
  switch (text) {
    case "GET":
      color = "green";
      break;
    case 200:
      color = "green";
      break;
    case "POST":
      color = "orange";
      break;
    case 400:
      color = "orange";
      break;
    case "PUT":
      color = "indigo";
      break;
    case "DELETE":
      color = "red";
      break;
    case 500:
      color = "red";
      break;
    default:
      color = "gray";
  }
  return `bg-${color}-400 text-${color}-800`;
};

// bg-green-400 bg-green-800
// bg-orange-400 bg-orange-800
// bg-indigo-400 bg-indigo-800
// bg-gray-400 bg-gray-800
// bg-red-400 bg-red-800
</script>

<style scoped></style>
