<template>

  <div class="col-12 col-md-4 mb-3 pointer">

    <div class="hover text-white rounded" @click="movieDetail">
      <img
        :src=" `https://www.themoviedb.org/t/p/original${this.movie?.poster_path}`"
      >
      <div class="hover-overlay"></div>
      <div class="hover-content px-5 py-4">
        <h3 class="hover-title mb-0">{{ movie.title}}</h3>
        <p class="hover-description mb-0">⭐별점 | {{ movie.vote_average }}</p>
        <p class="hover-description mb-0">📆개봉 | {{ movie.release_date }}</p>
      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'MovieSectionPoster',
  props: {
    movie: Object,
  },
  methods: {
    movieDetail(){
      this.$router.push({ name: 'movieDetail', params: { movieid: this.movie.movieid } })
    }
  },
}
</script>

<style>
.hover {
  overflow: hidden;
  position: relative;
  padding-bottom: 150%;
}

.hover-overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 90;
  transition: all 0.4s;
  background: rgba(0, 0, 0, 0);
}

.hover:hover .hover-overlay {
  background: rgba(0, 0, 0, 0.7);
}

.hover img {
  width: 105%;
  position: absolute;
  top: 0;
  left: -5%;
  transition: all 0.3s;
}

.hover:hover img {
  left: 0;
}

.hover-content {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 99;
  transition: all 0.4s;
}

.hover:hover .hover-content {
  bottom: 2rem;
}

.hover-title {
  transform: translateY(0.5rem);
  transition: all 0.3s;
  opacity: 0;
}

.hover:hover .hover-title {
  opacity: 1;
  transform: none;
}

.hover-description {
  transform: translateY(0.5rem);
  transition: all 0.4s;
  opacity: 0;
}

.hover:hover .hover-description {
  opacity: 1;
  transform: none;
}
</style>