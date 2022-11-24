<template>
  <div>
    
    <div v-if="movie" class="container px-5">

      <h1 class="pt-5 pb-3 fw-bold">{{ movie.title }}</h1>
      <hr width="50px">
      <div class="row py-3">
        <div class="col-12 col-lg-3 mb-5">
          <img id="moviePoster" :src="`https://www.themoviedb.org/t/p/original${movie.poster_path}`" class="shadow">
        </div>
        <div class="col-12 col-lg-9 d-flex flex-column">
          <p><span class="fw-bold">📆 개봉</span> | {{ movie.release_date }}</p>
          <p><span class="fw-bold">⭐ 평점</span> | {{ movie.vote_average }}</p>
          <p><span class="fw-bold">🎬 장르</span> | <span v-for="genre in movie.genres" :key="genre.genreid">{{ genre.name }}, </span></p>
          <p class="mb-1"><span class="fw-bold">📜 줄거리</span></p>
          <p>{{ movie.overview }}</p>
        </div>
      </div>

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
  border-radius: 5px;
}

</style>