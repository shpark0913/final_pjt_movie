<template>
  <div>
    <div v-if="movie" :style="{ backgroundImage: `url(${backgroundImgPath})` }" id="movieDetailBackground">
      
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
#movieDetailBackground {
  height: 100vh;
  width: 100vw;
  background-repeat : no-repeat;
  background-size : cover;
  background-attachment: fixed;
}
.movieDetailCard{
  background-color: white;
  width: 80%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow-y: scroll;
}
#moviePoster{
  width: 100%;
}


.container::-webkit-scrollbar {
  width: 10px;
}
.container::-webkit-scrollbar-thumb {
  background-color: #999a9b;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
.container::-webkit-scrollbar-track {
  background-color: rgb(235, 235, 235);
  border-radius: 10px;
  box-shadow: inset 0px 0px 5px white;
}
</style>