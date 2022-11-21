<template>
  <div>
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <img :src="poster_path">
      <p>개봉일 | {{ movie.release_date }}</p>
      <p>평점 | {{ movie.vote_average }}</p>
      <p>장르 | <span v-for="genre in movie.genres" :key="genre">{{ genreList[genre] }} </span></p>
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
    genreList(){
      return this.$store.state.genreList;
    }
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

</style>