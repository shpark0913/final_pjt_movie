<template>
  <div>

    <h3 class="pt-5 pb-4">π¬<span class="fw-bold">{{ movie.title }}</span>π¬ λ§€λμλ₯Ό μν μΆμ²!</h3>
    <div class="row">
      <MovieSectionPoster 
        v-for="recommendMovie in movieList"
        :key="recommendMovie.id"
        :movie="recommendMovie"
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
  props: {
    movie: Object,
  },
  computed: {
    movieList(){
      return this.$store.state.movieListRecommendation;
    }
  },
  methods:{
    getMovieListRecommendation(){
      this.$store.dispatch('getMovieListRecommendation', this.movie.movieid);
    },
  },
  created(){
    this.getMovieListRecommendation();
  },
}
</script>

<style>
</style>