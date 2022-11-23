<template>
  <div id="app" >

    <nav>
      <ul class="nav nav-pills align-items-center justify-content-between">
        <!-- 로고 -->
        <li class="nav-item">
          <div>
          <router-link class="nav-link navbar-brand" :to="{ name: 'indexView' }">
            <img src="@/assets/testlogo.png" alt="부기" height="40px">
            부귀영화
          </router-link>
          </div>
        </li>

        <!-- 로그인 성공 시 -> 검색기능 -->
        <li v-if="isLoggined" class="nav-item col-4">
          <form class="d-flex" role="search" style="height: 40px" autocomplete="off" @submit.prevent="searchMovie">
            <div class="autocomplete me-2" style="width: 80%" @click="floatSearchBox">
              <input class="form-control" type="search" placeholder="Search" aria-label="Search" @keyup="filterMovieTitle">
              <ul v-if="isFocused" class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            <!-- <button class="btn btn-outline-success" type="submit">검색</button> -->
          </form>
        </li>
        
        <!-- 로그인 성공 시 -> mypage -->
        <li v-if="isLoggined" class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">{{ username }}님</a>
          <ul class="dropdown-menu">
            <li><router-link class="dropdown-item" :to="{ name: 'profile', params: {username: username }}" >마이페이지</router-link></li>
            <li><hr class="dropdown-divider"></li>
            <li><div @click="logout" class="dropdown-item cursor">로그아웃</div></li>
          </ul>
        </li>
        
        <!-- 초기화면 -> 로그인과 회원가입만 보이기 -->
        <div v-if="!isLoggined" class="nav">
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'login' }">로그인</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{ name: 'signup' }">회원가입</router-link>
        </li>
        </div>

      </ul>
    </nav>

    <router-view/>
  </div>
</template>

<script>
export default {
  data(){
    return{
      searchMovieTitle: '',
      filterMovieList: [],
      isFocused: false,
    }
  },
  computed: {
    isLoggined(){
      return this.$store.state.token;
    },
    username(){
      return this.$store.state.username;
    },
    movieList(){
      return this.$store.state.movieList;
    }
  },
  methods: {
    logout(){
      this.$store.commit('LOGOUT');
    },
    filterMovieTitle(e){
      this.searchMovieTitle = e.target.value;
      this.filterMovieList = this.movieList.filter((movie)=>{
        return movie.title.includes(this.searchMovieTitle);
      })
    },
    floatSearchBox(){
      this.isFocused = !this.isFocused;
      console.log(this.isFocused);
    },
  },
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
}

.container{
  margin-top: 72px;
}

nav {
  padding: 1rem;
  height: 72px;
  top: 0;
  background: white;
  width: 100%;
  position: fixed;
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

/* search용 css */
.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}
</style>
