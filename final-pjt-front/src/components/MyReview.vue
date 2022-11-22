<template>
  <div>
    <h3>{{ review.title }}</h3>
    <img :src="src" alt="" @click="movieDetail">
    <p>{{ review.vote_average }}</p>
    <p>{{ review.content }}</p>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'MyReview',
  props: {
    review: Object,
  },
  data(){
    return{
      src: `https://www.themoviedb.org/t/p/original${this.review.poster_path}`
    }
  },
  methods: {
    movieDetail(){
      this.$router.push({ name: 'movieDetail', params: { movieid: this.review.movie } })
    }
  },
}
</script>

<style>

</style>