<template>
  <div>
    <h3>User | {{ review.user }}</h3>
    <p>평점 | {{ review.vote_average }}</p>
    <p>{{ review.content }}</p>
  </div>
</template>

<script>
export default {
  name: 'ReviewSectionItem',
  props: {
    review: Object,
  }
}
</script>

<style>

</style>