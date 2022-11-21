<template>
  <div>
    <h2>영화 섹션1</h2>
    <div class="movieIndexPoster">
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
.movieIndexPoster{
  display: flex;
}
</style>