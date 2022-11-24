<template>
  <div class="card col-12 mb-3">

      <div class="card-body">
        <h5 class="card-title"><router-link :to="{ name: 'profile', params: { username: review?.username } }">{{ review?.username }}</router-link></h5>
        <h6 v-if="review?.vote_average === true" class="card-subtitle mb-2 text-muted">재밌어요😀</h6>
        <h6 v-else class="card-subtitle mb-2 text-muted">별로에요🤮</h6>
        <p class="card-text">{{ review?.content }}</p>
      </div>

  </div>

</template>

<script>
export default {
  name: 'ReviewSectionItem',
  props: {
    review: Object,
  },
}
</script>

<style>
.editBtn{
  cursor: pointer;
  border: 1px solid black;
}
</style>