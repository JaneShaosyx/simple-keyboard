<template>
  <div class="home">
    <keyboard class='keyboard'></keyboard>
  </div>
</template>

<script>
// import * as Tone from 'tone'
import Keyboard from '../components/keyboard/Keyboard.vue'

export default {
  name: 'Home',
  components: {
    Keyboard
  } ,
  methods:{
  }
}
</script>

<style lang="less" scoped>
.home{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background-color:#B64242;
}
.keyboard{
  position:absolute;
  bottom:20rem;
  left:50%;
  transform: translateX(-50%);
}
</style>