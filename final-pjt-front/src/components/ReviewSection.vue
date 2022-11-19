<template>
  <div>
    <h3>영화 리뷰를 담을 공간!</h3>
    <div id="writeReview">
      <form @submit.prevent="createReview">
        <label for="my-review">리뷰 작성하기</label>
        <textarea v-model="content" id="my-review" cols="30" rows="10" placeholder="리뷰 작성!"></textarea>
        <br>
        <input v-model="vote_average" type="radio" name="rate" value="1" id="1"><label for="1">⭐</label>
        <input v-model="vote_average" type="radio" name="rate" value="2" id="2"><label for="2">⭐⭐</label>
        <input v-model="vote_average" type="radio" name="rate" value="3" id="3"><label for="3">⭐⭐⭐</label>
        <input v-model="vote_average" type="radio" name="rate" value="4" id="4"><label for="4">⭐⭐⭐⭐</label>
        <input v-model="vote_average" type="radio" name="rate" value="5" id="5" checked><label for="5">⭐⭐⭐⭐⭐</label><br>

        <input type="submit" value="작성하기">
      </form>
    </div>
    <hr>
    <div v-if="reviewList === '리뷰가 존재하지 않아요'">
      {{ reviewList }}
    </div>
    <div v-else>
      <ReviewSectionItem 
        v-for="review in reviewList"
        :key="review.id"
        :review="review"
      />
    </div>
  </div>
</template>

<script>
import ReviewSectionItem from '@/components/ReviewSectionItem';

export default {
  name: 'ReviewSection',
  props: {
    movie: Object,
  },
  components: {
    ReviewSectionItem,
  },
  data(){
    return{
      content: null,
      vote_average: 5,
      movieid: this.movie.movieid,
    }
  },
  computed: {
    reviewList(){
      return this.$store.state.reviewList
    }
  },
  methods: {
    createReview(){
      const review = {
        vote_average: this.vote_average,
        content: this.content,
        movieid: this.movieid,
      }
      this.$store.dispatch('createReview', review);
      this.content = null;
      this.vote_average = 5;
    },

  },
  // created(){
  //   this.getReviews();
  // },

}
</script>

<style>

</style>