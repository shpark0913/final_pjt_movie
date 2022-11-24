<template>

  <div class="container">
    <h1 class="pt-3">{{ username }}님의 프로필</h1>

    <h5>{{ username }}님이 좋아한 영화</h5>
    <div v-if="profile.likes.length" class="row">
      <MovieSectionPoster v-for="likeMovie in profile.likes" :key="likeMovie.movieid" :movie="likeMovie"/>
    </div>
    <div v-else>좋아하는 영화가 없습니다.</div>

    <h5>{{ username }}님이 좋아하지 않는 영화</h5>
    <div v-if="profile.unlikes.length" class="row">
      <MovieSectionPoster v-for="unlikeMovie in profile.unlikes" :key="unlikeMovie.movieid" :movie="unlikeMovie"/>
    </div>
    <div v-else>싫어하는 영화가 없습니다.</div>

    <h3>{{ username }}님이 작성한 리뷰</h3>

    <div v-if="profile.review_all.length">
      <p v-for="review in profile.review_all" :key="review.id">
        <MyReview :review="review" />
      </p>
    </div>
    <div v-else>작성한 리뷰가 없습니다.</div>

  </div>

</template>

<script>
import MovieSectionPoster from '@/components/MovieSectionPoster'
import MyReview from '@/components/MyReview'

export default {
  name: 'ProfileView',
  components: {
    MovieSectionPoster,
    MyReview,
  },
  data(){
    return{
      username: this.$route.params.username,
    }
  },
  computed: {
    profile(){
      return this.$store.state.profile;
    }
  },
  methods: {
    getUserProfile(){
      const username = this.$route.params.username
      this.$store.dispatch('getUserProfile', username)
    }
  },
  created(){
    this.getUserProfile();
  }
}
</script>

<style>
.horizontal-scrollable > .row {
    overflow-x: auto;
    white-space: nowrap;
}
  
.horizontal-scrollable > .row > .col-xs-4 {
    display: inline-block;
    float: none;
}
/* Decorations */
  
.col-xs-4 {
    color: white;
    font-size: 24px;
    padding-bottom: 20px;
    padding-top: 18px;
}
  
.col-xs-4:nth-child(2n+1) {
    background: green;
}
  
.col-xs-4:nth-child(2n+2) {
    background: black;
}
</style>