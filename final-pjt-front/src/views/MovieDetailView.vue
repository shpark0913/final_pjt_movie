<template>
  <div>
    <div v-if="movie">
      <p>{{ movie }}</p>
      <h1>{{ movie.title }}</h1>
      <img :src="poster_path">
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
      return `https://www.themoviedb.org/t/p/original${this.movie.poster_path}`;
    },
    genreList(){
      return this.$store.state.genreList;
    }
  },
  methods: {
    getMovieDetail(){
      const movieId = this.$route.params.movieid;
      this.$store.dispatch('getMovieDetail', movieId);
    },
    backgroundImg(){
      const backDiv = document.querySelector('.movieDetail');
      const url = `https://www.themoviedb.org/t/p/original${this.movie.backdrop_path}`
      backDiv.getElementsByClassName.backgroundImg = `url(${url})`;
    }
  },
  created(){
    this.getMovieDetail();
  },
}
</script>

<style>

</style>