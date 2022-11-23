<template>
  <div>

    <div class="py-5">
    <h1 class="mb-0">영화</h1>
    
    <div class="row">
        <MovieSectionPoster 
          v-for="movie in movieList"
          :key="movie.movieid"
          :movie="movie"
        />
    </div>

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