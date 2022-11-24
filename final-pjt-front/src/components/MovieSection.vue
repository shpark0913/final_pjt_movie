<template>
  <div>

    <h1 class="pt-3">영화</h1>
    
    <div class="row">
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