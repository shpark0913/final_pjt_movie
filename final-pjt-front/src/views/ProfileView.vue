<template>
  <div>
    <h1>{{ username }}님의 프로필</h1>
    <p>{{ profile }}</p>
    <h3>{{ username }}님이 좋아한 영화</h3>
    <div v-if="profile.likes.length">
      <div v-for="likeMovie in profile.likes" :key="`moviePoster-${likeMovie.movieid}`">
        <MovieSectionPoster :movie="likeMovie" class="miniPoster" />
      </div>
    </div>
    <h3>{{ username }}님이 좋아하지 않는 영화</h3>
    <div v-if="profile.unlikes.length">
      <div v-for="unlikeMovie in profile.unlikes" :key="`moviePoster-${unlikeMovie.movieid}`">
        <MovieSectionPoster :movie="unlikeMovie" class="miniPoster" />
      </div>
    </div>
    <h3>{{ username }}님이 작성한 리뷰</h3>
    <h4>좋아요</h4>
    <div v-if="profile.like_reviews.length">
      <p v-for="likeReview in profile.like_reviews" :key="likeReview.movieid">{{ likeReview }}</p>
    </div>
    <h4>싫어요</h4>
    <div v-if="profile.unlike_reviews.length">
      <p v-for="unlikeReview in profile.unlike_reviews" :key="unlikeReview.movieid">{{ unlikeReview }}</p>
    </div>
  </div>
</template>

<script>
import MovieSectionPoster from '@/components/MovieSectionPoster'

export default {
  name: 'ProfileView',
  components: {
    MovieSectionPoster
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
.miniPoster img{
  width: 100px;
}
</style>