import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
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
        })
        .catch((error)=>{
          console.log(error.response.data);
          for(const errormsg of Object.values(error.response.data)){
            for(const msg of errormsg){
              console.log(msg);
            }
          }
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
          console.log('로그인 성공!');
          console.log(this.$router);
          this.$router.push({name: 'indexView'})
        })
        .catch((error)=>{
          console.log(error.response.data);
          for(const errormsg of Object.values(error.response.data)){
            for(const msg of errormsg){
              console.log(msg);
            }
          }
        })
    }
  },
  modules: {
  }
})
