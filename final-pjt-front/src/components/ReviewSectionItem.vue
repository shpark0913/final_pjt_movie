<template>
  <div>
    <!-- <p>{{ review }}</p> -->
    <h3>User | {{ review?.user }}</h3>
    <p>평점 | {{ review?.vote_average }}</p>
    <p>평가 | {{ review?.content }}</p>
    <span class="editBtn" @click="editReview">수정하기  </span>
    <span class="editBtn" @click="deleteReview">  삭제하기</span>
  </div>
</template>

<script>
export default {
  name: 'ReviewSectionItem',
  props: {
    review: Object,
  },
  methods: {
    editReview(){
      this.$emit('edit-review', this.review);
    },
    deleteReview(){
      const review = {
        movieid: this.review.movie,
        reviewid: this.review.id,
      }
      this.$store.dispatch('deleteReview', review)
    }
  }
}
</script>

<style>
.editBtn{
  cursor: pointer;
}
</style>