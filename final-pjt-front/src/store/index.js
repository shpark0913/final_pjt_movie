import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    // 로그인 관련 Data
    token: sessionStorage.getItem('token'),    // 로그인 토큰
    errors: [],                              // 아직 구현x

    // 영화 관련 Data
    movieList: [],        // index에 띄울 movieList
    movieDetail: null,    // movieDetail 페이지에 띄울 영화 담기

    // 리뷰 관련 Data
    reviewList: null,     // 특정 영화에 대한 reviewList
  },

  getters: {
    // 현재 사용자가 로그인 상태인지 계산
    isLogin(state){
      return state.token? true: false;
    }
  },

  mutations: {
    // 1. 로그인 관련
    // 1-1. login/signup - 세션 스토리지에 토큰을 저장, 세션이 종료되지 않는 이상 로그인 상태 유지
    SAVE_TOKEN(state, token){
      state.token = token;
      sessionStorage.setItem('token', token);
    },
    // 1-2. 로그인/회원가입 시 에러메시지 저장
    ERROR_MSG(state, msg){
      state.errors.push(msg);
    },
    // 1-3. 에러메시지 초기화 (안그러면 계속 에러 메시지가 쌓임!ㅜ)
    RESET_ERROR_MSG(state){
      state.errors = [];
    },
    // 1-4. logout - 토큰을 삭제한 뒤 로그인 페이지로 이동
    LOGOUT(state){
      state.token = null;
      sessionStorage.removeItem('token');
      router.push({ name: 'login' });
    },

    // 2. 영화 관련
    // 2-1. index 화면에 보여줄 영화 리스트
    GET_MOVIE_LIST(state, movieList){
      state.movieList = movieList.slice(0, 10);
    },
    // 2-2. 영화 Detail
    GET_MOVIE_DETAIL(state, movie){
      state.movieDetail = movie;
    },

    // 3. 리뷰 관련
    // 3-1. 리뷰 리스트
    GET_REVIEWS(state, reviewList){
      state.reviewList = reviewList;
    },
  },

  actions: {
    // 1. 로그인 관련
    // 1-1. 회원가입
    signUp(context, userinfo){
      axios({
        method: 'POST',
        url: `${API_URL}/accounts/signup/`,
        data:{
          username: userinfo.username,
          password1: userinfo.password1,
          password2: userinfo.password2,
        }
      })
        .then((response)=>{
          // 회원가입에 성공하면 token을 저장하고 index 페이지로 이동
          context.commit('SAVE_TOKEN', response.data.key);
          router.push({ name: 'indexView' })
        })
        .catch((error)=>{
          // 에러가 나면 에러 메시지 저장
          for(const errors of Object.values(error.response.data)){
            for(const msg of errors){
              context.commit('ERROR_MSG', msg);
            }
          }
        })
    },
    // 1-2. 로그인
    logIn(context, userinfo){
      axios({
        method: 'POST',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: userinfo.username,
          password: userinfo.password,
        }
      })
        .then((response)=>{
          context.commit('SAVE_TOKEN', response.data.key);
          router.push({ name: 'indexView' });
        })
        .catch((error)=>{
          for(const errors of Object.values(error.response.data)){
            for(const msg of errors){
              context.commit('ERROR_MSG', msg);
            }
          }
        })
    },

    // 2. 영화 관련
    // 2-1. 영화 전체 데이터 불러오기
    getMovieList(context){
      axios({
        method: 'GET',
        url: `${API_URL}/movies/`,
      })
        .then((response)=>{
          context.commit('GET_MOVIE_LIST', response.data);
        })
        .catch((error)=>{
          console.log(error);
        })
    },
    // 2-2. 영화 디테일 데이터 불러오기
    getMovieDetail(context, movieid){
      axios({
        method: 'GET',
        url: `${API_URL}/movies/${movieid}/`,
      })
        .then((response)=>{
          context.commit('GET_MOVIE_DETAIL', response.data)
        })
        .catch((error)=>{
          console.log(error);
        })
    },

    // 3. 리뷰 관련
    // 3-1. Create - 리뷰 작성하기
    createReview(context, review){
      axios({
        method: 'POST',
        url: `${API_URL}/movies/${review.movieid}/review/`,
        data: {
          vote_average: review.vote_average,
          content: review.content,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then(()=>{
          context.dispatch('getReviews', review.movieid);
        })
        .catch((error)=>{
          console.log(error);
        })
    },
    // 3-2. Read - 리뷰 조회
    getReviews(context, movieid){
      axios({
        method: 'GET',
        url: `${API_URL}/movies/${movieid}/review/`,
      })
        .then((response)=>{
          context.commit('GET_REVIEWS', response.data);
        })
        .catch((error)=>{
          console.log(error);
          context.commit('GET_REVIEWS', `리뷰가 존재하지 않아요\n첫 번째 리뷰를 작성해볼까요?!`);
        })
    },
    // 3-3. Delete - 리뷰 삭제
    deleteReview(context, review){
      axios({
        method: 'DELETE',
        url: `${API_URL}/movies/review/${review.reviewid}/`
      })
        .then(()=>{
          context.dispatch('getReviews', review.movieid);
        })
        .catch((error)=>{
          console.log(error);
        })
    }
  },
  modules: {
  }
})
