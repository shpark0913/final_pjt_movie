<template>
  <div class="container">

    <form class="d-flex justify-content-center py-3" role="search" @submit.prevent="searchMovie">
      <input class="form-control" type="search" placeholder="Search" aria-label="Search" style="width: 50%" @keyup="filterMovieTitle">
    </form>

    <div v-if="filterMovieList">
      <p v-for="movie in filterMovieList" :key="`searchMovie-${movie.title}`">{{ movie }}</p>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SearchMovieView',
  data(){
    return{
      searchMovieTitle: '',
      filterMovieList: [],
    }
  },
  computed: {
    movieList(){
      return this.$store.state.movieList;
    }
  },
  methods: {
    filterMovieTitle(e){
      this.searchMovieTitle = e.target.value;
      this.filterMovieList = this.movieList.filter((movie)=>{
        return movie.title.includes(this.searchMovieTitle);
      })
    },
  }
}
</script>

<style>

</style>