<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-100 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/30"></div>
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              :class="width"
              class="w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle as="h3" class="text-lg font-medium leading-6">
                {{ title }}
              </DialogTitle>
              <div class="mt-2">
                <slot name="content" :content="content">
                  <p class="text-sm text-muted-foreground">
                    {{ content }}
                  </p>
                </slot>
              </div>

              <div class="mt-4 flex justify-end gap-x-2">
                <slot name="action">
                  <button
                    type="button"
                    class="rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground duration-300 hover:bg-foreground/10 hover:shadow-lg"
                    @click="closeModal"
                  >
                    OK
                  </button>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const emit = defineEmits(["closeModal"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: [String, Object],
    required: true,
  },
  width: {
    type: String,
    default: "max-w-sm",
  },
});

const closeModal = () => {
  emit("closeModal");
};
</script>
