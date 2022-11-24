import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import IndexView from '@/views/IndexView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import MovieDetailView from '@/views/MovieDetailView'
import ProfileView from '@/views/ProfileView'
import SearchMovieView from '@/views/SearchMovieView'
import NotFoundView from '@/views/NotFoundView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'indexView',
    component: IndexView,
    beforeEnter(to, from, next){
      const isLoginned = store.getters.isLogin;
      if (isLoginned){ next() }
      else { next({ name: 'login' }) }
    }
  },
  {
    path: '/movies/:movieid',
    name: 'movieDetail',
    component: MovieDetailView,
    beforeEnter(to, from, next){
      const isLoginned = store.getters.isLogin;
      if (isLoginned){ next() }
      else { next({ name: 'login' }) }
    }
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView,
    beforeEnter(to, from, next){
      const isLoginned = store.getters.isLogin;
      if (isLoginned){ next(history.back()) }
      else { next() }
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
    beforeEnter(to, from, next){
      const isLoginned = store.getters.isLogin;
      if (isLoginned){ next(history.back()) }
      else { next() }
    }
  },
  {
    path: '/profile/:username',
    name: 'profile',
    component: ProfileView,
    beforeEnter(to, from, next){
      const isLoginned = store.getters.isLogin;
      if (isLoginned){ next() }
      else { next({ name: 'login' }) }
    }
  },
  {
    path: '/search',
    name: 'searchMovie',
    component: SearchMovieView,
    beforeEnter(to, from, next){
      const isLoginned = store.getters.isLogin;
      if (isLoginned){ next() }
      else { next({ name: 'login' }) }
    }
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import('../views/AboutView.vue')
  // }
  {
    path: '/notfound',
    name: 'notFound',
    component: NotFoundView,
  },
  {
    path: '*',
    redirect: '/notfound'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router