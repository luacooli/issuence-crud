<template>
  <div id="dashboard">
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <LayoutPage title="Clientes" :hasFooter="false">
        <div class="grid grid-cols-2 gap-2">
          <div class="bg-slate-100 p-4 rounded-lg shadow-md">
            <h4 class="font-medium mb-2">Clientes cadastrados</h4>
            <div class="flex items-center relative">
              <span class="material-icons text-gray-700">apartment</span>
              <span class="text-3xl font-bold ml-2">
                {{ String(this.users?.length).padStart(2, '0') }}
              </span>
              <span
                class="text-sm font-bold absolute top-0 left-20 text-green-700"
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
import axios from 'axios'
import { db } from '@/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'

import LayoutPage from '@/components/LayoutPage.vue'

export default {
  components: { LayoutPage },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
  async mounted() {
    this.fetchUsers()
    this.fetchCertificates()
  },
  data() {
    return {
      users: null,
      certificates: [
        { id: 1, color: 'green', quantity: '118', label: 'integrados' },
        { id: 2, color: 'yellow', quantity: '36', label: 'vencem em breve' },
        { id: 3, color: 'red', quantity: '3', label: 'vencidos' },
      ],
    }
  },
  methods: {
    async fetchUsers() {
      const usersRef = collection(db, 'users')
      const response = await axios.get('http://localhost:3000/')

      console.log('users from server: ', response.data)

      try {
        const querySnapshot = await getDocs(usersRef)
        const usersArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        this.users = usersArray
      } catch (error) {
        console.error('Error fetching users: ', error)
      }
    },
    async fetchCertificates() {
      const certificatesRef = collection(db, 'certificates')

      try {
        // Query for 'integrados'
        const integratedQuery = query(
          certificatesRef,
          where('type', '==', 'integrated')
        )
        const integratedSnapshot = await getDocs(integratedQuery)
        this.certificates[0].quantity = integratedSnapshot.size

        // Query for 'vencem em breve'
        const expireSoonQuery = query(
          certificatesRef,
          where('type', '==', 'expire-soon')
        )
        const expireSoonSnapshot = await getDocs(expireSoonQuery)
        this.certificates[1].quantity = expireSoonSnapshot.size

        // Query for 'vencidos'
        const expiredQuery = query(
          certificatesRef,
          where('type', '==', 'expired')
        )
        const expiredSnapshot = await getDocs(expiredQuery)
        this.certificates[2].quantity = expiredSnapshot.size
      } catch (error) {
        console.error('Error fetching certificates: ', error)
      }
    },
    goToClientList() {
      this.$router.push({ name: 'ClientList' })
    },
  },
}
</script>

<style></style>
