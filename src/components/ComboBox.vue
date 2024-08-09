<template>
  <Combobox v-model="selected" :multiple="multiple">
    <div ref="comboboxWrapper" class="relative mt-1">
      <div
        class="relative w-full cursor-default overflow-hidden rounded-lg bg-accent text-left shadow-md sm:text-sm"
      >
        <ComboboxInput
          class="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 focus:ring-0"
          :display-value="displayValue"
          @change="query = $event.target.value"
        />
        <ComboboxButton
          class="absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </ComboboxButton>
      </div>
      <TransitionRoot
        leave="transition ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
        @after-leave="query = ''"
      >
        <ComboboxOptions
          ref="comboboxOptions"
          :class="optionsClass"
          class="z-30 max-h-60 w-full overflow-auto rounded-md bg-background py-1 text-base shadow-lg ring-1 sm:text-sm"
        >
          <div
            v-if="filteredItem.length === 0 && query !== ''"
            class="relative cursor-default select-none px-4 py-2 text-gray-700"
          >
            Nothing found.
          </div>

          <ComboboxOption
            v-for="item in filteredItem"
            :key="keyMapper(item)"
            v-slot="{ selected, active }"
            as="template"
            :value="item"
          >
            <li
              class="relative cursor-default select-none py-2 pl-10 pr-4"
              :class="{
                'bg-teal-600 text-white': active,
                '': !active,
              }"
            >
              <span
                class="block truncate"
                :class="{ 'font-medium': selected, 'font-normal': !selected }"
              >
                <slot name="level" :item="item">{{ keyMapper(item) }}</slot>
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3"
                :class="{ 'text-white': active, 'text-teal-600': !active }"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </TransitionRoot>
    </div>
  </Combobox>
</template>

<script setup>
import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps({
  multiple: {
    type: Boolean,
    default: false,
  },
  keyMapper: {
    type: Function,
    default: (item) => item,
  },
  options: {
    type: Array,
    required: true,
  },
});

let selected = ref(null);
let query = ref("");
const optionsClass = ref("absolute mt-1");
const comboboxWrapper = ref(null);
const comboboxOptions = ref(null);

let filteredItem = computed(() =>
  query.value === ""
    ? props.options
    : props.options.filter((item) =>
        props
          .keyMapper(item)
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const displayValue = (selected) => {
  return props.keyMapper(selected);
};
</script>
