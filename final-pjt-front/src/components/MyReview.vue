<template>
  <div>
    <p>{{ review.content }}</p>
    <p>{{ review.vote_average }}</p>
    <!-- <img v-if="imgSrc" :src="imgSrc" alt=""> -->
    <hr>
  </div>
</template>

<script>
// import axios from 'axios';
// const API_KEY = '2808f49cb7a157269d3c55874b8d52e5';

export default {
  name: 'MyReview',
  props: {
    review: Object,
  },
}
</script>

<style>

</style>