<template>
  <div>
    <h1>{{ username }}님의 프로필</h1>
    <p>{{ profile }}</p>

    <!-- <h3>{{ username }}님이 좋아하는 영화 비율</h3>
    

    <h3>{{ username }}님이 좋아한 영화</h3>
    <div v-if="profile.likes.length">
      <div v-for="likeMovie in profile.likes" :key="likeMovie.movieid">
        <MovieSectionPoster :movie="likeMovie" class="miniPoster" />
      </div>
    </div>
    <div v-else>좋아하는 영화가 없습니다.</div>

    <h3>{{ username }}님이 좋아하지 않는 영화</h3>
    <div v-if="profile.unlikes.length">
      <div v-for="unlikeMovie in profile.unlikes" :key="unlikeMovie.movieid">
        <MovieSectionPoster :movie="unlikeMovie" class="miniPoster" />
      </div>
    </div>
    <div v-else>싫어하는 영화가 없습니다.</div>

    <h3>{{ username }}님이 작성한 리뷰</h3>

    <div v-if="profile.review_all.length">
      <p v-for="review in profile.review_all" :key="review.id">
        <MyReview :review="review" />
      </p>
    </div>
    <div v-else>작성한 리뷰가 없습니다.</div> -->

  </div>
</template>

<script>
// import MovieSectionPoster from '@/components/MovieSectionPoster'
// import MyReview from '@/components/MyReview'

export default {
  name: 'ProfileView',
  // components: {
  //   MovieSectionPoster,
  //   MyReview,
  // },
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
.miniPoster img{
  width: 100px;
}
</style>