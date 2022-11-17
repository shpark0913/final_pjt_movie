<template>
  <div>
    <h2>영화 섹션</h2>
    <div v-if="movieList">
      <MovieSectionPoster 
        v-for="movie in movieList"
        :key="movie.movieid"
        :movie="movie"
      />
    </div>
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
      let tmpMovieList = this.$store.state.movieList;
      return tmpMovieList;
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