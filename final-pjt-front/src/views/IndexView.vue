<template>
  <div>
    <h1>메인페이지!</h1>
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
}
</script>

<style>

</style>