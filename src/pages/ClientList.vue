<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <LayoutPage
      title="Lista de clientes"
      :hasFooter="true"
      successButtonLabel="Adicionar cliente"
      cancelButtonLabel="Voltar"
    >
      <table class="table-auto">
        <thead>
          <tr>
            <th v-for="(item, i) in items" :key="i">{{ item }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
          </tr>
          <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
          </tr>
        </tbody>
      </table>
    </LayoutPage>
  </div>
</template>

<script>
import { db } from '@/firebase'
import LayoutPage from '@/components/LayoutPage.vue'

export default {
  name: 'ClientList',
  components: { LayoutPage },
  created() {
    const users = db.collection('users')

    console.log('users');
    console.log(users);

    // users.on('value', (snapshot) => {
    //   this.users = snapshot.val() || []
    // })

    // const usersRef = db.ref('users')
    // usersRef.on('value', (snapshot) => {
    //   const usersData = snapshot.val()
    //   if (usersData) {
    //     this.users = Object.keys(usersData).map((key) => ({
    //       id: key,
    //       ...usersData[key],
    //     }))
    //   } else {
    //     this.users = []
    //   }
    // })
  },
  data() {
    return {
      users: null,
      items: ['Nome', 'Email', 'Data de Nasc.'],
    }
  },
}
</script>

<style></style>
