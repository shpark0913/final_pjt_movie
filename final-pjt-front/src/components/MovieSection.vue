<template>
  <div>
    <h2>영화 섹션</h2>
      <MovieSectionPoster
        v-for="movie in movieList"
        :key="movie.movieid"
        :movie="movie"
      />
  </div>
</template>

<script>
import MovieSectionPoster from '@/components/MovieSectionPoster'

export default {
  name: 'MovieSection',
  components: {
    MovieSectionPoster,
  },
  computed: {
    movieList(){
      return this.$store.state.movieList;
    }
  },
  methods:{
    getMovieList(){
      this.$store.dispatch('getMovieList');
    },
  },
  created(){
    this.getMovieList();
  },
}
</script>

<style>

</style>