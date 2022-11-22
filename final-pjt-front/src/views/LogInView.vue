<template>
  <div>
    <h1>로그인</h1>

    <form @submit.prevent="logIn">
      <label for="username">username: </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password">password: </label>
      <input type="password" id="password" v-model="password"><br>

      <ul v-if="errorMsg.length">
        <li v-for="(msg, idx) in errorMsg" :key="idx">{{ msg }}</li>
      </ul>

      <input type="submit" value="로그인">
    </form>

    <router-link :to="{ name: 'signup' }">회원가입하기</router-link>
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