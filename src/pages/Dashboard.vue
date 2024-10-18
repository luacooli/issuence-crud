<template>
  <div id="app">
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <LayoutPage title="Clientes" :hasFooter="false">
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-slate-100 p-4 rounded-lg shadow-md">
            <h4 class="font-medium mb-2">Clientes cadastrados</h4>
            <div class="flex items-center relative">
              <span class="material-icons text-gray-700">apartment</span>
              <span class="text-3xl font-bold ml-1">{{ 126 }}</span>
              <span
                class="text-sm font-bold absolute top-0 left-20 text-green-700 ml-2"
              >
                +{{ 26 }}
              </span>
            </div>
          </div>

          <button
            class="bg-slate-200 p-4 rounded-lg shadow-md cursor-pointer"
            @click="goToClientList"
          >
            <div class="bg-white border-0 rounded-2xl p-3 h-12 w-12">
              <span class="material-icons text-gray-300">group_add</span>
            </div>
            <h4
              class="flex items-center justify-between mt-2 font-bold text-gray-700"
            >
              <span>Gerenciar clientes</span>
              <span class="material-icons text-gray-700">chevron_right</span>
            </h4>
          </button>

          <h3 class="col-span-2 font-semibold my-3">Certificados digitais</h3>
          <div class="bg-slate-100 p-4 rounded-lg shadow-md">
            <ul class="list-inside">
              <li
                v-for="certificate in certificates"
                :key="certificate.id"
                class="flex items-center"
              >
                <div
                  :class="`bg-${certificate.color}-500 text-white text-xs font-bold px-2 py-1 rounded-full -mt-2 -mr-2 w-4 h-4`"
                ></div>
                <p class="ml-4 mb-2">
                  <b>{{ certificate.quantity }}</b>
                  {{ certificate.label }}
                </p>
              </li>
            </ul>
          </div>

          <div class="bg-slate-200 p-4 rounded-lg shadow-md cursor-pointer">
            <div class="bg-white border-0 rounded-2xl p-3 h-12 w-12">
              <span class="material-icons text-gray-300">file_open</span>
            </div>
            <h4
              class="flex items-center justify-between mt-2 font-bold text-gray-700"
            >
              <span>Gerenciar certificados</span>
              <span class="material-icons text-gray-700">chevron_right</span>
            </h4>
          </div>
        </div>
      </LayoutPage>
    </div>
  </div>
</template>

<script>
import { db } from '@/firebase'
import LayoutPage from '@/components/LayoutPage.vue'

export default {
  components: { LayoutPage },
  name: 'App',
  created() {
    const users = db.ref('users')

    users.on('value', (snapshot) => {
      this.users = snapshot.val() || []
    })

    console.log(users)
  },
  data() {
    return {
      user: null,
      certificates: [
        { id: 1, color: 'green', quantity: '118', label: 'integrados' },
        { id: 2, color: 'yellow', quantity: '36', label: 'vencem em breve' },
        { id: 3, color: 'red', quantity: '3', label: 'vencidos' },
      ],
    }
  },
  methods: {
    goToClientList() {
      console.log('foi')

      this.$router.push({ name: 'ClientList' })
    },
  },
}
</script>

<style></style>
