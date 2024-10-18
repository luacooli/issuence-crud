// src/router.js
import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './pages/Dashboard.vue';
import ClientList from './pages/ClientList.vue';

Vue.use(Router);

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/clientes',
    name: 'ClientList',
    component: ClientList
  }
];

export default new Router({
  mode: 'history', // Use 'history' mode to avoid hashes in URLs
  routes
});
