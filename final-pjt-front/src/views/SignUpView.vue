<template>
  <div>
  <div class="container">

    <div class="row justify-content-center">
    <div class="col col-md-6">

    <div class="card mt-5">
      <div class="card-body">
        <h4 class="card-title text-center mb-4 mt-3">회원가입</h4>
        <hr>

        <form @submit.prevent="signUp">
          <div class="form-floating mb-3">
            <input v-model="username" type="text" class="form-control" id="username" placeholder="아이디">
            <label for="username" class="form-label">아이디</label>
          </div>

          <div class="form-floating mb-3">
            <input v-model="password1" type="password" class="form-control" id="password1" placeholder="비밀번호">
            <label for="password1" class="form-label">비밀번호</label>
          </div>

          <div class="form-floating mb-4">
            <input v-model="password2" type="password" class="form-control" id="password2" placeholder="비밀번호 확인">
            <label for="password2" class="form-label">비밀번호 확인</label>
          </div>

          <ul :class="{'text-danger mb-4' : errorMsg.length }">
          <li v-for="(msg, idx) in errorMsg" :key="idx">{{ msg }}</li>
          </ul>

          <div class="d-grid gap-2">
            <input type="submit" class="btn btn-primary mb-1" value="회원가입">
            <router-link class="btn btn-outline-primary" :to="{ name: 'login' }">로그인으로 돌아가기</router-link>
          </div>
        </form>
        
      </div>
    </div>

    </div>
    </div>

  </div>
  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data(){
    return{
      username: null,
      password1: null,
      password2: null,
    }
  },
  computed: {
    errorMsg(){
      return this.$store.state.errors;
    }
  },
  methods: {
    signUp(){
      const payload = {
        username: this.username,
        password1: this.password1,
        password2: this.password2,
      }

      this.$store.commit('RESET_ERROR_MSG');
      this.$store.dispatch('signUp', payload)

      this.username = null
      this.password1 = null
      this.password2 = null
    }
  },
  created(){
    this.$store.commit('RESET_ERROR_MSG');
  }
}
</script>

<style>

</style>