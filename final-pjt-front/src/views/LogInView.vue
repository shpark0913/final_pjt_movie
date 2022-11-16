<template>
  <div>
    <h1>로그인</h1>
    <form @submit.prevent="logIn">
      <label for="username">username: </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password">password: </label>
      <input type="password" id="password" v-model="password"><br>

      <input type="submit" value="로그인">
    </form>
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
  methods: {
    logIn(){
      const payload = {
        username: this.username,
        password: this.password
      }

      this.$store.dispatch('logIn', payload);

      this.username = null;
      this.password = null;
    }
  }
}
</script>

<style>

</style>