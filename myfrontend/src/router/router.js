import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue') // set home as path '/'
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactPage.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HistoryPage.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// const router = new VueRouter({ routes })

export default router