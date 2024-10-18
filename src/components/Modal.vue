<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg w-96 relative">
      <div class="flex justify-between items-center border-b pb-2">
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
          <span class="material-icons text-gray-700">close</span>
        </button>
      </div>

      <div class="mt-4">
        <slot></slot>
      </div>

      <footer v-if="hasFooter" class="flex justify-end mt-4">
        <button
          @click="cancelHandler"
          class="rounded px-8 py-2 bg-red-400 hover:bg-red-500 text-white"
        >
          {{ cancelButtonLabel }}
        </button>
        <button
          @click="successHandler"
          class="rounded px-8 py-2 ml-4 bg-green-800 hover:bg-green-900 text-white"
        >
          {{ successButtonLabel }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Modal',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    hasFooter: {
      type: Boolean,
      required: true,
    },
    successButtonLabel: {
      type: String,
    },
    cancelButtonLabel: {
      type: String,
    },
  },
  methods: {
    successHandler() {
      this.$emit('save')
    },
    cancelHandler() {
      this.closeModal()
    },
    closeModal() {
      this.$emit('close')
    },
  },
}
</script>

<style scoped>
.bg-opacity-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
