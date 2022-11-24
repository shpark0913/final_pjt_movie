<template>
  <div>
    <div v-if="movie">
      
      <div class="movieDetailCard rounded container px-5">

          <h1>{{ movie.title }}</h1>

        
        <div class="row py-3">
          <div class="col-4">
            <img id="moviePoster" :src="`https://www.themoviedb.org/t/p/original${movie.poster_path}`">
          </div>
          <div class="col-8 d-flex flex-column">
            <p>개봉 | {{ movie.release_date }}</p>
            <p>평점 | {{ movie.vote_average }}</p>
            <p>장르 | <span v-for="genre in movie.genres" :key="genre.genreid">{{ genre.name }} </span></p>
            <p>{{ movie.overview }}</p>
          </div>
        </div>

        <ReviewSection 
          :movie="movie"
        />
      </div>

      <div class="detailOverlay"></div>


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

#moviePoster{
  width: 100%;
}

</style>