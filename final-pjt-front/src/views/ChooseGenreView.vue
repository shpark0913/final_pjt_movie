<template>
  <div>
    <h1>좋아하는 장르 선택</h1>
    <ChooseGenreItem 
      v-for="genreName in allGenres" 
      :key="allGenres[genreName]" 
      :genre="genreName" 
      class="chooseGenre"
      @cancle-clicked="cancleClicked"
      @clicked="clicked"
    />
  </div>
</template>

<script>
import ChooseGenreItem from '@/components/chooseGenreItem'

export default {
  name: 'ChooseGenreView',
  components: {
    ChooseGenreItem,
  },
  data(){
    return{
      allGenres: this.$store.state.genreList,
      chooseGenre: [],
    }
  },
  methods: {
    cancleClicked(genre){
      const idx = this.chooseGenre.indexOf(genre)
      this.chooseGenre.splice(idx, 1)
    },
    clicked(genre){
      this.chooseGenre.push(genre);
    }
  }
}
</script>

<style>
.chooseGenre {
  padding: 10px 20px;
  margin: 10px;
  background-color: pink;
  cursor: pointer;
}
</style>