<template>

  <div class="col-12 col-md-3 mb-3 pointer">

    <div class="card" @click="movieDetail">
      <img
        :src=" `https://www.themoviedb.org/t/p/original${this.movie?.poster_path}`"
        class="card-img-top"
      >
      <div class="card-body">
        <h5 class="card-title fw-bold">{{ movie.title}}</h5>
        <p class="card-text mb-1">⭐별점 | {{ movie.vote_average }}</p>
        <p class="card-text">📆개봉 | {{ movie.release_date }}</p>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'MovieSectionPoster',
  props: {
    movie: Object,
  },
  methods: {
    movieDetail(){
      this.$router.push({ name: 'movieDetail', params: { movieid: this.movie?.movieid || this.movie.id } })
    }
  },
}
</script>

<style>

</style>