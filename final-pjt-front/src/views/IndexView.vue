<template>
  <div class="container">
    <MovieSection v-if="randomMovie" :movie="randomMovie" />
    <h5 v-else class="pt-5 text-muted text-center">
      <router-link :to="{ name: 'searchMovie'}">검색 기능</router-link>을 통해 좋아하는 영화에 리뷰를 남겨주세요~
    </h5>
  </div>
</template>

<script>
import MovieSection from '@/components/MovieSection'
const _ = require('lodash');

export default {
  name: 'indexView',
  components: {
    MovieSection,
  },
  computed: {
    username(){
      return this.$store.state.username;
    },
    userlike(){
      return this.$store.state.userlike;
    },
    randomMovie(){
      return _.sample(this.userlike)
    }
  },
}
</script>

<style>

</style>