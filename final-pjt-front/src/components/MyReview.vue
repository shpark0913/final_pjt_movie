<template>
  <div>
    <h3>{{ review.title }}</h3>
    <img :src="`https://www.themoviedb.org/t/p/original${review.poster_path}`" alt="" @click="movieDetail">
    <p v-if="review.vote_average">재밌어요😀</p>
    <p v-else>별로에요🤮</p>
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
  methods: {
    movieDetail(){
      this.$router.push({ name: 'movieDetail', params: { movieid: this.review.movie } })
    }
  },
}
</script>

<style>

</style>