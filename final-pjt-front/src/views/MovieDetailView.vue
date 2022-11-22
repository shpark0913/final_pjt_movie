<template>
  <div>
    <div v-if="movie" :style="{backgroundImage: `url(${backgroundImgPath})` }">
      <div class="movieDetailCard">
        <h1>{{ movie.title }}</h1>
        <img :src="`https://www.themoviedb.org/t/p/original${movie.poster_path}`">
        <p>개봉일 | {{ movie.release_date }}</p>
        <p>평점 | {{ movie.vote_average }}</p>
        <p>장르 | <span v-for="genre in movie.genres" :key="genre.genreid">{{ genre.name }} </span></p>
        <p>{{ movie.overview }}</p>
        <br>
        
        <ReviewSection 
          :movie="movie"
        />
      </div>
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
    backgroundImgPath(){
      return `https://www.themoviedb.org/t/p/original${this.movie.backdrop_path}`;
    }
  },
  methods: {
    getMovieDetail(){
      const movieId = this.$route.params.movieid;
      this.$store.dispatch('getMovieDetail', movieId);
    },
  },
  created(){
    this.getMovieDetail();
  },
}
</script>

<style>
.movieDetailCard{
  background-color: white;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}
</style>