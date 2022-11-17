<template>
  <div>
    <img :src="poster_path">
    
  </div>
</template>

<script>
export default {
  name: 'MovieSectionPoster',
  props: {
    movie: Object,
  },
  data(){
    return{
      poster_path : `https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${this.movie.poster_path}`,
    }
  }
}
</script>

<style>

</style>