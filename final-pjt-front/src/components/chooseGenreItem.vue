<template>
  <div>
    <div @click="click" :class="{'clickedBg': isClicked}">
      {{ genre }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseGenreItem',
  props: {
    genre: String,
  },
  data(){
    return{
      isClicked: false,
    }
  },
  methods: {
    click(){
      if(this.isClicked){
        console.log();
        this.$emit('cancle-clicked', this.genre)
      }
      else{
        this.$emit('clicked', this.genre);
      }
      this.isClicked = !this.isClicked;
    }
  }
}
</script>

<style>
.clickedBg{
  background-color: rgb(195, 158, 164);
}
</style>