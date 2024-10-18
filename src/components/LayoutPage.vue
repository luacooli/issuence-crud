<template>
  <div id="layout">
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-lg min-w-96 max-w-2xl w-full">
        <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

        <slot />

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
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  props: {
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
  data() {
    return {}
  },
  methods: {
    cancelHandler() {
      this.$router.go(-1)
    },
    successHandler() {
      this.$emit('success')
    },
  },
}
</script>

<style></style>
