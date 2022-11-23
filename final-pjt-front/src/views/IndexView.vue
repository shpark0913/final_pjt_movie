<template>
  <div class="container">

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