<template>
  <div>

    <h3 class="pt-5 pb-4">🎬<span class="fw-bold">{{ movie.title }}</span>🎬 매니아를 위한 추천!</h3>
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