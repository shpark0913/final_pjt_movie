<template>
  <div>

    <!-- 만약 내 리뷰가 존재하면? 수정하기만 가능 -->
    <div v-if="myReview">
      <!-- 수정할거면 수정하는 창 띄우기 -->
      <div v-if="isUpdating">
        <h3>내 리뷰 수정하기</h3>
        <form @submit.prevent="updateReview">
          <label for="my-review">리뷰 수정하기</label><br>
          <textarea required v-model="content" id="my-review" cols="30" rows="10"></textarea><br><br>
          <input required v-model="vote_average" type="radio" name="rate" value="false" id="bad"><label for="bad">별로에요🤮</label>
          <input required v-model="vote_average" type="radio" name="rate" value="true" id="good"><label for="good">재밌어요😀</label>
          <br>
          <br>
          <input type="submit" value="수정하기">
        </form>
        <span class="editBtn" @click="toggleUpdate">취소하기</span>
      </div>
      <!-- 수정하는거 아니면 그냥 내가 썼던 리뷰 보이기 -->
      <div v-else>
        <h3>내 리뷰</h3>
        <p v-if="myReview.vote_average === true ">평점 | 재밌어요😀</p>
        <p v-else>평점 | 별로에요🤮</p>
        <p>평가 | {{ myReview.content }}</p>
        <span class="editBtn" @click="toggleUpdate">수정하기</span>
        <span class="editBtn" @click="deleteReview">  삭제하기</span>
      </div>

    </div>

    <!-- 만약 내 리뷰가 존재하지 않으면? 작성하기만 가능 -->
    <div v-else>
      <h3 >영화 리뷰 작성하기</h3>
      <div id="writeReview">
        <form @submit.prevent="createReview">
          <label for="my-review">리뷰 작성하기</label><br>
          <textarea required v-model="content" id="my-review" cols="30" rows="10"></textarea><br><br>
  
          <input required v-model="vote_average" type="radio" name="rate" value="false" id="bad"><label for="bad">별로에요🤮</label>
          <input required v-model="vote_average" type="radio" name="rate" value="true" id="good"><label for="good">재밌어요😀</label>
          <br>
          <br>
          <input type="submit" value="작성하기">
        </form>
      </div>
    </div>
    <br><br><br><br><br>
    <h3>다른 사람들의 리뷰</h3>
    <div v-if="typeof reviewList === 'string'">
      {{ reviewList }}
    </div>
    <div v-else>
      <ReviewSectionItem 
        v-for="review in reviewList"
        :key="review.id"
        :review="review"
        @edit-review="toggleUpdate"
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
      vote_average: true,
      isUpdating: false,
    }
  },
  computed: {
    reviewList(){
      return this.$store.state.reviewList;
    },
    movieid(){
      return this.movie.movieid
    },
    myReview(){
      const reviewList = this.$store.state.reviewList;
      const userpk = this.$store.state.userpk

      if (reviewList){
        for(const review of reviewList){
          if (review.user == userpk){
            return review;
          }
        }
      }
      return null;
    }
  },
  methods: {
    getReviews(){
      const movieId = this.$route.params.movieid;
      this.$store.dispatch('getReviews', movieId);
    },
    createReview(){
      const review = {
        vote_average: this.vote_average,
        content: this.content,
        movieid: this.movieid,
        username: this.$store.state.username,
      }
      this.$store.dispatch('createReview', review);
      this.content = null;
      this.vote_average = true;
    },
    updateReview(){
      const review = {
        content: this.content,
        vote_average: this.vote_average,
        movieid: this.movieid,
        reviewid: this.myReview.id,
        username: this.$store.state.username,
      }
      this.$store.dispatch('updateReview', review);
      this.toggleUpdate();
    },
    deleteReview(){
      const review = {
        movieid: this.movieid,
        reviewid: this.myReview.id,
      }
      this.$store.dispatch('deleteReview', review);
      this.content = null;
      this.vote_average = true;
    },
    toggleUpdate(){
      this.isUpdating = !this.isUpdating;
      if (this.isUpdating){
        this.content = this.myReview.content;
        this.vote_average = this.myReview.vote_average;
      }
    }
  },
  created(){
    this.getReviews();
  }
}
</script>

<style>

</style>