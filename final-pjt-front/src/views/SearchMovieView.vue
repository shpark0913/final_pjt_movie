<template>
  <div class="container">

    <form class="d-flex justify-content-center py-3" role="search" @submit.prevent="searchMovie">
      <input class="form-control" type="search" placeholder="Search" aria-label="Search" style="width: 50%" @keyup="filterMovieTitle">
    </form>

    <div v-if="filterMovieList.length" class="row mt-3" >
      <MovieSectionPoster
        v-for="movie in filterMovieList"
        :key="`searchMovie-${movie.movieid}`"
        :movie="movie"
      />
    </div>
    <h5 class="text-center text-muted mt-5" v-else-if="searchMovieTitle">검색 결과가 없습니다.</h5>
    <h5 class="text-center text-muted mt-5" v-else>영화 이름 검색</h5>
  </div>
</template>

<script>
import MovieSectionPoster from '@/components/MovieSectionPoster'

export default {
  name: 'SearchMovieView',
  data(){
    return{
      searchMovieTitle: '',
      filterMovieList: [],
    }
  },
  components: {
    MovieSectionPoster,
  },
  computed: {
    movieList(){
      return this.$store.state.movieList;
    }
  },
  methods: {
    filterMovieTitle(e){
      this.searchMovieTitle = e.target.value;
      if (this.searchMovieTitle === ''){
        return this.filterMovieList = [];
      }
      this.filterMovieList = this.movieList.filter((movie)=>{
        return movie.title.includes(this.searchMovieTitle);
      })
    },
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

</style>