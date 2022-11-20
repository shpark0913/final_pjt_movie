<template>
  <div>
    <h1>회원가입</h1>
    <form @submit.prevent="signUp">
      <label for="username">username: </label>
      <input type="text" id="username" v-model="username"><br>
      
      <label for="password1">password: </label>
      <input type="password" id="password1" v-model="password1"><br>
      
      <label for="password2">password 확인: </label>
      <input type="password" id="password2" v-model="password2"><br>

      <input type="submit" value="회원가입">
    </form>

    <ul v-if="errorMsg.length">
      <li v-for="(msg, idx) in errorMsg" :key="idx">{{ msg }}</li>
    </ul>
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