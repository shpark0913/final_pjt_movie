<template>
  <div id="app" >

    <ul class="nav navbar navbar-light bg-light fixed-top align-items-center justify-content-between">
      <!-- 로고 -->
      
      <!-- 로그인 성공 시 -> mypage -->
      <div v-if="isLoggined" class="d-flex flex-row">
        <li class="nav-item">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{{ username }}님</a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" :to="{ name: 'profile', params: {username: username }}" >마이페이지</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><div @click="logout" class="dropdown-item cursor">로그아웃</div></li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'searchMovie' }">영화검색</router-link>
        </li>
      </div>
      
      <!-- 초기화면 -> 로그인과 회원가입만 보이기 -->
      <div v-if="!isLoggined" class="d-flex flex-row">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'login' }">로그인</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'signup' }">회원가입</router-link>
        </li>
      </div>

      <li class="nav-item">
        <router-link class="nav-link navbar-brand fw-bolder" :to="{ name: 'indexView' }">
          <img src="@/assets/boogie-logo.png" alt="부기" height="40px">
          부기영화
        </router-link>
      </li>
    </ul>
    
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggined(){
      return this.$store.state.token;
    },
    username(){
      return this.$store.state.username;
    },
  },
  methods: {
    logout(){
      this.$store.commit('LOGOUT');
    },
  },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.nav-link {
  color: #2c3e50;
}

nav a.router-link-exact-active {
  font-weight: bold;
  color: #42b983;
}

nav .dropdown-menu a.router-link-exact-active {
  font-weight: bold;
}

/* ---- 여기는 제가 만들엇슴당 ----- */
.pointer {
  cursor: pointer
}

.container {
  margin-top: 66px;
}

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300&display=swap');
body * {
  font-family: 'Noto Sans KR', sans-serif;
}
</style>
