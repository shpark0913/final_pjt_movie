<template>
  <div class="pb-3">

    <!-- 만약 내 리뷰가 존재하면? 수정하기만 가능 -->
    <div v-if="myReview">

      <div class="card col-12 mb-5">
        <div class="card-body">
          <h5 class="card-title">내 리뷰</h5>
          <p v-if="myReview.vote_average" class="card-subtitle mb-2 text-muted">재밌어요😀</p>
          <p v-else class="card-subtitle mb-2 text-muted">별로에요🤮</p>
          <p class="card-text">{{ myReview.content }}</p>
          <button type="button" class="btn btn-primary me-3" data-bs-toggle="modal" data-bs-target="#updateReview">리뷰 수정하기</button>
          <button type="button" class="btn btn-danger" @click="deleteReview">리뷰 삭제하기</button>
        </div>
      </div>
      
      <!-- 리뷰 수정 모달 창 -->
      <div class="modal fade" id="updateReview" tabindex="-1" aria-labelledby="updateReviewLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
  
            <div class="modal-header">
              <h5 class="modal-title" id="updateReviewLabel">리뷰 수정하기</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
  
            <div class="modal-body">
              <form>
                <div class="form-floating mb-3">
                  <textarea required class="form-control" v-model="content" placeholder="리뷰를 남깁시다." id="reviewContent" style="height: 100px"></textarea>
                  <label for="reviewContent">내용</label>
                </div>

                <input required v-model="vote_average" type="radio" name="rate" value="true" id="good"><label for="good">재밌어요😀</label>
                <input required v-model="vote_average" type="radio" name="rate" value="false" id="bad"><label for="bad">별로에요🤮</label>
              </form>
            </div>
  
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="updateReview" data-bs-dismiss="modal">수정하기</button>
            </div>
  
          </div>
        </div>
      </div>
    </div>

    <!-- 만약 내 리뷰가 존재하지 않으면? 작성하기만 가능 -->
    <div v-else class="mb-5">
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createReview">리뷰 작성하기</button>
      
      <!-- 리뷰 작성 모달 창 -->
      <div class="modal fade" id="createReview" tabindex="-1" aria-labelledby="createReviewLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
  
            <div class="modal-header">
              <h5 class="modal-title" id="createReviewLabel">리뷰 작성하기</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
  
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <div class="form-floating mb-3">
                    <textarea required class="form-control" v-model="content" placeholder="리뷰를 남깁시다." id="reviewContent" style="height: 100px"></textarea>
                    <label for="reviewContent">내용</label>
                  </div>
                  <input required v-model="vote_average" type="radio" name="rate" value="true" id="good"><label for="good">재밌어요😀</label>
                  <input required v-model="vote_average" type="radio" name="rate" value="false" id="bad"><label for="bad">별로에요🤮</label>
                </div>
              </form>
            </div>
  
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="createReview" data-bs-dismiss="modal">작성하기</button>
            </div>
  
          </div>
        </div>
      </div>
    </div>

    
    <h3>모든 리뷰</h3>
    <div v-if="typeof reviewList === 'string'">
      {{ reviewList }}
    </div>
    <div v-else class="container mt-3">
      <div class="row">
        <ReviewSectionItem 
          v-for="review in reviewList"
          :key="review.id"
          :review="review"
        />
      </div>  
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
      const username = this.$store.state.username;

      if (reviewList){
        for(const review of reviewList){
          if (review.username == username){
            return review;
          }
        }
      }
      return null;
    },
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
  },
  created(){
    this.getReviews();
  }
}
</script>

<style>

</style>