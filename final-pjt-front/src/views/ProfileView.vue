<template>
  <div>
    <h1>{{ username }}님의 프로필</h1>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data(){
    return{
      username: this.$route.params.username,
    }
  }
}
</script>

<style>

</style>