<template>
  <div>
    <h1>안녕하세요, {{ username }}님</h1>
    <MovieSection />
  </div>
</template>

<script>
import MovieSection from '@/components/MovieSection'

export default {
  name: 'indexView',
  components: {
    MovieSection,
  },
  computed: {
    username(){
      return this.$store.state.username;
    }
  }
}
</script>

<style>

</style>