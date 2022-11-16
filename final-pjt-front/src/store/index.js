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
      console.log('저장됨ㅋ');
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
          console.log(error);
        })
    }
  },
  modules: {
  }
})
