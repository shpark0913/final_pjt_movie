import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    // login 토큰
    token: sessionStorage.getItem('token'),
    // 로그인, 회원가입 실패 시 문구
    errors: null,

    //movies 데이터
    movieList: [],
    movieDetail: null,

    //review 데이터
    reviewList: null,
  },
  getters: {
    // 현재 사용자가 로그인 상태인지
    isLogin(state){
      return state.token? true: false;
    }
  },
  mutations: {
    SAVE_TOKEN(state, token){
      state.token = token;
      // 세션 스토리지에 토큰을 저장, 세션이 종료되지 않는 이상 로그인 상태 유지
      sessionStorage.setItem('token', token);
    },
    LOGOUT(state){
      state.token = null,
      router.push({ name: 'login' });
    },

    GET_MOVIE_LIST(state, movieList){
      state.movieList = movieList.slice(0, 10);
    },
    // 영화 Detail 저장
    GET_MOVIE_DETAIL(state, movie){
      state.movieDetail = movie;
    },

    GET_REVIEWS(state, data){
      state.reviewList = data;
    },
  },
  actions: {
    // 로그인, 회원가입
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
    },
    logout(context){
      sessionStorage.removeItem('token');
      context.commit('LOGOUT');
    },

    // 영화 전체 데이터 불러오기
    getMovieList(context){
      axios({
        url: `${API_URL}/movies/`,
        method: 'GET',
      })
        .then((response)=>{
          // console.log(response.data);
          context.commit('GET_MOVIE_LIST', response.data);
        })
        .catch((error)=>{
          console.log(error);
        })
    },
    // 영화 디테일 데이터 불러오기
    getMovieDetail(context, movieId){
      axios({
        url: `${API_URL}/movies/${movieId}/`,
        method: 'GET',
      })
        .then((response)=>{
          // console.log(response);
          context.commit('GET_MOVIE_DETAIL', response.data)
        })
        .catch((error)=>{
          console.log(error);
        })
    },

    // 리뷰 작성하기
    createReview(context, review){
      axios({
        url: `${API_URL}/movies/${review.movieid}/review/`,
        method: 'POST',
        data: {
          vote_average: review.vote_average,
          content: review.content,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response)=>{
          console.log(response);
        })
        .catch((error)=>{
          console.log(error);
        })
    },
    // 리뷰 조회
    getReviews(context, movieid){
      axios({
        url: `${API_URL}/movies/${movieid}/review/`,
        method: 'GET',
      })
        .then((response)=>{
          console.log(response);
          context.commit('GET_REVIEWS', response.data);
        })
        .catch((error)=>{
          console.log(error);
          context.commit('GET_REVIEWS', '리뷰가 존재하지 않아요');
        })
    },
  },
  modules: {
  }
})
