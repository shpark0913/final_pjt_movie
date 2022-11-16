<template>
  <div id="app">
    <nav>
      <router-link :to="{ name: 'indexView' }">메인 페이지</router-link> |
      <router-link v-if="!isLoggined" :to="{ name: 'signup' }">SignUp</router-link> |
      <router-link v-if="!isLoggined" :to="{ name: 'login' }">LogIn</router-link> |
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggined(){
      return this.$store.state.token
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
