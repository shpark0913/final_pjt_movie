import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    // 로그인 관련 Data
    username: sessionStorage.getItem('username'),
    userpk: sessionStorage.getItem('userpk'),
    token: sessionStorage.getItem('token'),    // 로그인 토큰
    errors: [],                                // 로그인, 회원가입 실패 시 띄울 오류 문구
    translateErrors: {
      'This field may not be null.': '빈 칸이 존재하면 안됩니다.',
      'Unable to log in with provided credentials.': '아이디나 비밀번호가 틀렸습니다.',
      'A user with that username already exists.': '이미 존재하는 아이디입니다.',
      'This password is entirely numeric.': '비밀번호는 숫자와 문자로 이루어져야 합니다.',
      'This password is too short. It must contain at least 8 characters.': '비밀번호가 너무 짧습니다. 최소 8글자 이상 입력해주세요.',
      'This password is too common.': '보안에 취약한 비밀번호입니다.',
      "The two password fields didn't match.": '비밀번호가 일치하지 않습니다',
    },
    
    // 영화 관련 Data
    movieList: [],        // index에 띄울 movieList
    movieDetail: null,    // movieDetail 페이지에 띄울 영화 담기
    userlike: [],         // 로그인한 유저가 좋아하는 영화 리스트
    movieListRecommendation: [],

    // 리뷰 관련 Data
    reviewList: null,     // 특정 영화에 대한 reviewList

    // 개인프로필 관련 Data
    profile: null,
  },

  getters: {
    // 현재 사용자가 로그인 상태인지 계산
    isLogin(state){
      return state.token? true: false;
    }
  },

  mutations: {
    // 1. 로그인 관련
    // 1-1. 로그인 회원가입 시 token, username, userpk 저장 + sessionStorage에 저장하기
    SAVE_USER_INFO(state, userinfo){
      state.token = userinfo.token;
      state.username = userinfo.username;
      state.userpk = userinfo.userpk;
      sessionStorage.setItem('token', userinfo.token);
      sessionStorage.setItem('username', userinfo.username);
      sessionStorage.setItem('userpk', userinfo.userpk);
      router.push({ name: 'indexView' });
    },
    // 1-2. logout - 토큰을 삭제한 뒤 로그인 페이지로 이동
    LOGOUT(state){
      state.token = null;
      state.username = null;
      state.userpk = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userpk');
      router.push({ name: 'login' });
    },
    // 1-3. 로그인/회원가입 시 에러메시지 저장
    ERROR_MSG(state, msg){
      if(state.errors.includes(state.translateErrors[msg])){
        return;
      }
      else{
        state.errors.push(state.translateErrors[msg]);
      }
    },
    // 1-4. 에러메시지 초기화 (안그러면 계속 에러 메시지가 쌓임!)
    RESET_ERROR_MSG(state){
      state.errors = [];
    },

    // 2. 영화 관련
    // 2-1. index 화면에 보여줄 영화 리스트
    GET_MOVIE_LIST(state, movieList){
      state.movieList = movieList;
    },
    // 2-2. 영화 Detail
    GET_MOVIE_DETAIL(state, movie){
      state.movieDetail = movie;
    },
    // 2-3. 사용자가 좋아요 한 영화 목록 업데이트
    UPDATE_USER_LIKE(state, userlike){
      state.userlike = userlike;
      // sessionStorage.setItem('userlike', JSON.stringify(userlike));
    },
    // 2-4. 사용자가 좋아한 영화와 관련된 추천영화 리스트
    GET_MOVIE_LIST_RECOMMENDATION(state, movieList){
      state.movieListRecommendation = movieList.slice(0, 20);
    },

    // 3. 리뷰 관련
    // 3-1. 리뷰 리스트
    GET_REVIEWS(state, reviewList){
      state.reviewList = reviewList;
    },
    // 3-2. 리뷰 리셋하기
    RESET_REVIEWS(state){
      state.reviewList = null;
    },

    // 4. 개인 프로필 관련
    GET_USER_PROFILE(state, user){
      state.profile = user;
    }
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
          const userInfo = {
            token: response.data.key,
            username: userinfo.username
          }
          context.dispatch('saveUserInfo', userInfo)
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
          const userInfo = {
            token: response.data.key,
            username: userinfo.username,
          }
          context.dispatch('saveUserInfo', userInfo)
        })
        .catch((error)=>{
          for(const errors of Object.values(error.response.data)){
            for(const msg of errors){
              context.commit('ERROR_MSG', msg);
            }
          }
        })
    },
    // 1-3. 로그인과 회원가입 시 유저의 정보 추가로 얻기(pk)
    saveUserInfo(context, userinfo){
      axios({
        method: 'GET',
        url: `${API_URL}/movies/user/${userinfo.username}/`
      })
        .then((response)=>{
          const userInfo = {
            token: userinfo.token,
            username: userinfo.username,
            userpk: response.data.user_pk,
          }
          context.commit('SAVE_USER_INFO', userInfo)
        })
        .catch((error)=>{
          console.log(error);
        })
    },
    
    // 2. 영화 관련
    // 2-1. 영화 전체 데이터 불러오기(검색용)
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
          router.push({ name: 'notFound' });
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
        router.replace({ name: 'notFound' });
      })
    },
    // 2-3. 사용자가 좋아한 영화와 관련된 추천 영화 받아오기
    getMovieListRecommendation(context, movieid){
      axios({
        method: 'GET',
        url: `${API_URL}/movies/${movieid}/recommendations/`,
      })
        .then((response)=>{
          context.commit('GET_MOVIE_LIST_RECOMMENDATION', response.data.recommendations);
        })
        .catch((error)=>{
          console.log(error);
          router.push({ name: 'notFound' });
        })
      },
      // 2-4. user가 index 페이지에 접근할 때마다 좋아요 한 영화 목록 다시 가져오기
      getUserLike(context, username){
        axios({
          method: 'GET',
          url: `${API_URL}/movies/user/${username}/profile/`
        })
          .then((response)=>{
            const userlike = response.data.likes;
            context.commit('UPDATE_USER_LIKE', userlike)
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
          username: review.username,
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
    },
    // 3-4. Update - 리뷰 수정
    updateReview(context, review){
      axios({
        method: 'PUT',
        url: `${API_URL}/movies/review/${review.reviewid}/`,
        data: {
          content: review.content,
          vote_average: review.vote_average,
          username: review.username,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response)=>{
          console.log(response);
          context.dispatch('getReviews', review.movieid);
        })
        .catch((error)=>{
          console.log(error);
        })
    },

    // 4. 개인 프로필페이지 관련
    getUserProfile(context, username){
      axios({
        method: 'GET',
        url: `${API_URL}/movies/user/${username}/profile/`
      })
        .then((response)=>{
          context.commit('GET_USER_PROFILE', response.data);
        })
        .catch((error)=>{
          console.log(error);
          router.push({ name: 'notFound' });
        })
    }
  },
  modules: {
  }
})
