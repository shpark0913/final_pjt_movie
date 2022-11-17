import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    token: null,
    errors: null,
  },
  getters: {
    isLogin(state){
      return state.token? true: false;
    }
  },
  mutations: {
    SAVE_TOKEN(state, token){
      state.token = token;
    }
  },
  actions: {
    signUp(context, payload){
      axios({
        method: 'POST',
        url: `${API_URL}/accounts/signup/`,
        data:{
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((response)=>{
          context.commit('SAVE_TOKEN', response.data.key);
          router.push({ name: 'indexView' })
        })
        .catch((error)=>{
          // 에러데이터
          console.log(error.response.data);
          context.state.errors = error.response.data;
          // for(const errormsg of Object.values(error.response.data)){
          //   for(const msg of errormsg){
          //     console.log(msg);
          //   }
          // }
        })
    },

    logIn(context, payload){
      axios({
        method: 'POST',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((response)=>{
          context.commit('SAVE_TOKEN', response.data.key);
          router.push({ name: 'indexView' });
        })
        .catch((error)=>{
          // 에러데이터
          console.log(error.response.data);
          context.state.errors = error.response.data;
          // for(const errormsg of Object.values(error.response.data)){
          //   for(const msg of errormsg){
          //     console.log(msg);
          //   }
          // }
        })
    }
  },
  modules: {
  }
})
