import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import IndexView from '@/views/IndexView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import MovieDetailView from '@/views/MovieDetailView'
import ProfileView from '@/views/ProfileView'
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

// router.beforeEach((to, from, next)=>{
//   const isLoginned = store.getters.isLogin;

//   // console.log('to:', to);
//   // console.log('from: ', from);

//   // 로그인된 상태면? login이랑 signup 빼고 다 갈 수 있음
//   if(isLoginned){
//     if(to.name !== 'login' && to.name !== 'signup'){
//       next();
//     }
//     else{
//       next({ name: from.name });
//     }
//   }
//   // 로그인이 안 된 상태면? login이랑 signup만 이용 가능함
//   else{
//     if(to.name === 'login' || to.name === 'signup'){
//       next();
//     }
//     else{
//       next({ name: 'login' });
//     }
//   }
// })

router.beforeEach((to, from, next)=>{
  console.log('to: ', to);
  console.log('from: ', from);
  next();
})

export default router