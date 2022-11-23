<template>
  <div>
  <div class="container">

    <div class="row justify-content-center">
    <div class="col col-md-6">

    <div class="card">
      <div class="card-body">
        <h4 class="card-title text-center mb-4 mt-3">로그인</h4>
        <hr>

        <form @submit.prevent="logIn">
          <div class="mb-3">
            <label for="username" class="form-label">아이디</label>
            <input v-model="username" type="text" class="form-control" id="username" placeholder="아이디">
          </div>

          <div class="mb-4">
            <label for="password" class="form-label">비밀번호</label>
            <input v-model="password" type="password" class="form-control" id="password" placeholder="비밀번호">
          </div>

          <ul :class="{'text-danger mb-4' : errorMsg.length }">
          <li v-for="(msg, idx) in errorMsg" :key="idx">{{ msg }}</li>
          </ul>

          <div class="d-grid gap-2">
            <input type="submit" class="btn btn-outline-primary mb-1" value="로그인">
            <router-link class="btn btn-primary" :to="{ name: 'signup' }">회원가입</router-link>
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
  name: 'LogInView',
  data(){
    return{
      username: null,
      password: null,
    }
  },
  computed: {
    errorMsg(){
      return this.$store.state.errors;
    }
  },
  methods: {
    logIn(){
      const payload = {
        username: this.username,
        password: this.password
      }

      this.$store.commit('RESET_ERROR_MSG');
      this.$store.dispatch('logIn', payload);

      this.username = null;
      this.password = null;
    }
  },
  created(){
    this.$store.commit('RESET_ERROR_MSG');
  }
}
</script>

<style>

</style>