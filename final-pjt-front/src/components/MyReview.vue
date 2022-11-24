<template>
  <div class="card col-12 mb-3">

    <div class="card-body">
      <div class="row">
        <div class="col-md-2">
          <img 
            :src="`https://www.themoviedb.org/t/p/original${review.poster_path}`" 
            class="img-fluid rounded pointer" 
            @click="movieDetail"
          >
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title"><router-link :to="{ name: 'movieDetail', params: { 'movieid' : review.movie } }">{{ review.title }}</router-link></h5>
            <h6 v-if="review.vote_average === true" class="card-subtitle mb-2 text-muted">재밌어요😀</h6>
            <h6 v-else class="card-subtitle mb-2 text-muted">별로에요🤮</h6>
            <p class="card-text">{{ review?.content }}</p>
          </div>
        </div>
      </div>
    </div>
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