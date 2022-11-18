<template>
  <div>
    <h3>영화 리뷰를 담을 공간!</h3>
    <form @submit.prevent="createReview">
      <label for="my-review">리뷰 작성하기</label>
      <input type="text" id="my-review" placeholder="나의 리뷰 작성!" required><br>

      <input type="radio" name="rate" value="1" id="1"><label for="1">1</label>
      <input type="radio" name="rate" value="2" id="2"><label for="2">2</label>
      <input type="radio" name="rate" value="3" id="3"><label for="3">3</label>
      <input type="radio" name="rate" value="4" id="4"><label for="4">4</label>
      <input type="radio" name="rate" value="5" id="5" checked><label for="5">5</label><br>

      <input type="submit" value="작성하기">
    </form>
    <hr>
    <ReviewSectionItem />
    <ReviewSectionItem />
    <ReviewSectionItem />
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
  methods: {
    createReview(){
      // 사용자가 별점을 매겼을 때 그 값을 받아오는 코드, 그런데 아직 Model에서 구현이 안됨
      const rateBtn = document.querySelectorAll('input[name="rate"]');
      let rate = 0;
      for(const btn of rateBtn){
        if(btn.checked){
          rate = +btn.value;
          break;
        }
      }
      const reviewContent = document.querySelector('#my-review').value;
      const review = {
        rate: rate,
        content: reviewContent,
        movieid: this.movie.movieid,
      }
      this.$store.dispatch('createReview', review);
    },

  },

}
</script>

<style>

</style>