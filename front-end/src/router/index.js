import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUpView from '@/views/SignUpView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
