<template>
  <div id="layout">
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <div class="bg-white p-6 rounded-lg shadow-lg min-w-96 max-w-2xl w-full">
        <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>

        <slot />

        <footer v-if="hasFooter">
          <button>{{ successButtonLabel }}</button>
          <button>{{ cancelButtonLabel }}</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  props: {
    title: String,
    hasFooter: Boolean,
    successButtonLabel: String,
    cancelButtonLabel: String,
  },
  data() {
    return {}
  },
}
</script>

<style></style>
