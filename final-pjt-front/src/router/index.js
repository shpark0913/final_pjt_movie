import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import IndexView from '@/views/IndexView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'indexView',
    component: IndexView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUpView,
  },
  {
    path: '/login',
    name: 'login',
    component: LogInView,
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

router.beforeEach((to, from, next)=>{
  const isLoginned = store.state.token;
  // 로그인된 상태면? login이랑 signup 빼고 다 갈 수 있음
  if(isLoginned){
    if(to.name !== 'login' && to.name !== 'signup'){
      next();
    }
    else{
      next(to);
    }
  }
  // 로그인이 안 된 상태면? login이랑 signup만 이용 가능함
  else{
    if(to.name === 'login' || to.name === 'signup'){
      next();
    }
    else{
      next({ name: 'login' });
    }
  }
})

export default router