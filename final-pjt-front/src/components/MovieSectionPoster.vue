<template>
  <div>
    <img
      class="movie-section-poster"
      :src="poster_path"
      @click="movieDetail"
    >
  </div>
</template>

<script>
export default {
  name: 'MovieSectionPoster',
  props: {
    movie: Object,
  },
  data(){
    return{
      poster_path : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movie.poster_path}`,
    }
  },
  methods: {
    movieDetail(){
      this.$router.push({ name: 'movieDetail', params: { movieid: this.movie.movieid } })
    }
  }
}
</script>

<style>
.movie-section-poster{
  cursor: pointer;
}
</style>