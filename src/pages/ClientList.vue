<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <LayoutPage
      title="Lista de clientes"
      :hasFooter="true"
      successButtonLabel="Adicionar cliente"
      cancelButtonLabel="Voltar"
      @success="openAddClientModal"
    >
      <table
        class="table-auto w-full text-left bg-white rounded-lg border border-slate-300 shadow-md"
      >
        <thead class="bg-slate-100">
          <tr>
            <th
              v-for="(item, i) in items"
              :key="i"
              class="px-4 py-2 border-b border-slate-300 text-slate-700 font-semibold"
            >
              {{ item }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in users"
            :key="user.id"
            @dblclick="editUser(user)"
            class="hover:bg-slate-100 cursor-pointer transition ease-in-out duration-200"
          >
            <td class="px-4 py-2 border-b border-slate-300">{{ user.name }}</td>
            <td class="px-4 py-2 border-b border-slate-300">
              {{ user.email }}
            </td>
            <td class="px-4 py-2 border-b border-slate-300">
              {{ user.birthdate }}
            </td>
            <td class="px-4 py-2 border-b border-slate-300 text-right">
              <button
                @click="deleteUser(user.id)"
                class="text-red-600 hover:text-red-800"
              >
                <span class="material-icons">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </LayoutPage>

    <Modal
      :isVisible="showAddClientModal"
      title="Adicionar cliente"
      :hasFooter="true"
      successButtonLabel="Salvar"
      cancelButtonLabel="Cancelar"
      @save="saveClient"
      @close="closeAddClientModal"
    >
      <div class="my-2">
        <label for="name">Nome Completo</label>
        <input type="text" id="name" v-model="name" class="border-b-2 w-full" />
      </div>
      <div class="my-2">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="border-b-2 w-full"
        />
      </div>
      <div class="my-2">
        <label for="birthdate">Data de Nasc.</label>
        <input
          type="date"
          id="birthdate"
          v-model="birthdate"
          class="border-b-2 w-full"
        />
      </div>
    </Modal>
  </div>
</template>

<script>
import { db } from '@/firebase'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

import LayoutPage from '@/components/LayoutPage.vue'
import Modal from '@/components/Modal.vue'

export default {
  name: 'ClientList',
  components: { LayoutPage, Modal },
  async mounted() {
    await this.fetchUsers()
  },
  data() {
    return {
      users: null,
      items: ['Nome', 'Email', 'Data de Nasc.', ''],
      showAddClientModal: false,
      name: '',
      email: '',
      birthdate: '',
    }
  },
  methods: {
    async fetchUsers() {
      const usersRef = collection(db, 'users')
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
    clearFormFields() {
      this.name = ''
      this.email = ''
      this.birthdate = ''
      this.editingUserId = null
    },
    async saveClient() {
      const docRef = collection(db, 'users')

      try {
        if (this.editingUserId) {
          const userDoc = doc(db, 'users', this.editingUserId)
          await updateDoc(userDoc, {
            name: this.name,
            email: this.email,
            birthdate: this.birthdate,
          })
          alert('Cliente atualizado com sucesso!')
        } else {
          await addDoc(docRef, {
            name: this.name,
            email: this.email,
            birthdate: this.birthdate,
            createdAt: new Date(),
          })
          alert('Cliente registrado com sucesso!')
        }
      } catch (error) {
        console.error('Error adding user: ', error)
      } finally {
        this.fetchUsers()
        this.closeAddClientModal()
      }
    },
    editUser(user) {
      console.log(user)
      this.name = user.name
      this.email = user.email
      this.birthdate = user.birthdate
      this.editingUserId = user.id

      this.showAddClientModal = true
    },
    async deleteUser(userId) {
      const userDoc = doc(db, 'users', userId)
      try {
        await deleteDoc(userDoc)
        alert('Cliente deletado com sucesso!')
        this.fetchUsers()
      } catch (error) {
        console.error('Error deleting user: ', error)
      }
    },
    openAddClientModal() {
      this.clearFormFields()
      this.showAddClientModal = true
    },
    closeAddClientModal() {
      this.showAddClientModal = false
    },
  },
}
</script>

<style></style>
