<template>
  <div>

      <!-- <p>{{ review }}</p> -->
      <h3><router-link :to="{ name: 'profile', params: { username: review?.username } }">{{ review?.username }}</router-link></h3>
      <p v-if="review?.vote_average === true ">평점 | 재밌어요😀</p>
      <p v-else>평점 | 별로에요🤮</p>
      <p>평가 | {{ review?.content }}</p>
      <!-- <span v-if="review.user == userpk" class="editBtn" @click="editReview">수정하기  </span>
      <span v-if="review.user == userpk" class="editBtn" @click="deleteReview">  삭제하기</span> -->
      <hr>
    </div>

</template>

<script>
export default {
  name: 'ReviewSectionItem',
  props: {
    review: Object,
  },
  // data(){
  //   return{
  //     userpk: this.$store.state.userpk
  //   }
  // },
  // methods: {
  //   editReview(){
  //     this.$emit('edit-review', this.review);
  //   },
  //   deleteReview(){
  //     const review = {
  //       movieid: this.review.movie,
  //       reviewid: this.review.id,
  //     }
  //     this.$store.dispatch('deleteReview', review)
  //   }
  // }
}
</script>

<style>
.editBtn{
  cursor: pointer;
  border: 1px solid black;
}
</style>