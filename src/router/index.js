import { createWebHistory, createRouter } from 'vue-router'

import SearchView from '@/pages/SearchView.vue'
import ProfileView from '@/pages/ProfileView.vue'

const routes = [
  {name: 'home', path: '/', component: SearchView },
  {name: 'profile', path: '/profile/:id', component: ProfileView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
