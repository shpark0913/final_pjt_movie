<template>
  <div>
    <div v-if="movie">
      <h3>디테일페이지</h3>
      <img :src="poster_path">
      <h3>{{ movie.title }}</h3>
      <p>개봉일 | {{ movie.release_date }}</p>
      <p>평점 | {{ movie.vote_average }}</p>
      <p>장르 | <span v-for="genre in movie.genres" :key="genre">{{ genre }} </span></p>
      <p>{{ movie.overview }}</p>
      <br>
      
      <ReviewSection 
        :movie="movie"
      />
    </div>
  </div>
</template>

<script>
import ReviewSection from '@/components/ReviewSection'

export default {
  name: 'MovieDetailView',
  components: {
    ReviewSection,
  },
  computed: {
    movie(){
      return this.$store.state.movieDetail;
    },
    poster_path(){
      return `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movie.poster_path}`;
    },
  },
  methods: {
    getMovieDetail(){
      const movieId = this.$route.params.movieid;
      this.$store.dispatch('getMovieDetail', movieId)
    },
    getReviews(){
      const movieId = this.$route.params.movieid;
      this.$store.dispatch('getReviews', movieId);
    }
  },
  created(){
    this.getMovieDetail();
    this.getReviews();
  }
}
</script>

<style>
/* #app {
  background-image: url('');
} */
</style>