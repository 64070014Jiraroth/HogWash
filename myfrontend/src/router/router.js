import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HogWash',
    component: () => import('../views/HomePage.vue') // set home as path '/'
  },
  {
    path: '/contact',
    name: 'HogWash | Contact',
    component: () => import('../views/ContactPage.vue')
  },
  {
    path: '/user',
    name: 'HogWash | User',
    component: () => import('../views/LoginPage.vue')
  },
  {
    path: '/history',
    name: 'HogWash | History',
    component: () => import('../views/HistoryPage.vue')
  },
  {
    path: '/feedback',
    name: 'HogWash | Feedback',
    component: () => import('../views/FeedbackPage.vue')
  },
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

// const router = new VueRouter({ routes })

export default router