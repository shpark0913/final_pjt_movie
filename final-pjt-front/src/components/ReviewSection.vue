<template>
  <div>
    <h3>영화 리뷰를 담을 공간!</h3>
    <div id="writeReview">
      <form @submit.prevent="createReview">
        <label for="my-review">리뷰 작성하기</label>
        <textarea required v-model="content" id="my-review" cols="30" rows="10" placeholder="리뷰 작성!"></textarea>
        <br>
        <input v-model="vote_average" type="radio" name="rate" value="true" id="good"><label for="good">재밌어요😀</label>
        <input v-model="vote_average" type="radio" name="rate" value="false" id="bad"><label for="bad">별로에요🤮</label>
        <br>
        <br>
        <input type="submit" value="작성하기">
      </form>
    </div>
    <hr>
    <div v-if="typeof reviewList === 'string'">
      {{ reviewList }}
    </div>
    <div v-else>
      <ReviewSectionItem 
        v-for="review in reviewList"
        :key="review.id"
        :review="review"
        @edit-review="editReview"
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
      return this.$store.state.reviewList;
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
    editReview(review){
      console.log(review);
      this.content = review.content;
      this.vote_average = review.vote_average;
    },
  },
}
</script>

<style>

</style>