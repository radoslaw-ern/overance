import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/custom-form',
      name: 'Custom Form',
      component: () => import('@/views/CustomFormView.vue')
    }
  ]
})

export default router
