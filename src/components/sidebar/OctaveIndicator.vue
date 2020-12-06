<template>
  <div class="container-oct">
    <input type="range" class="slider" min="0" max="4" v-model="curOctave" />
  </div>
</template>

<script>
export default {
  name: "OctaveIndicator",
  data() {
    return {
      curOctave: 2,
    };
  },
  created() {
    this.curOctave = 2;
    this.bus.$on("updateOctave", (oct) => {
      this.curOctave = oct;
    });
  },
  watch: {
    curOctave() {
      this.bus.$emit("setOctave", this.curOctave);
    },
  },
};
</script>

<style lang="less" scoped>
.slider {
  box-shadow: -0.3rem 0.3rem 1rem #666;
  margin: 0;
  -webkit-appearance: none;
  height: 4.8rem;
  width: 28rem;
  background: #bbb;
  outline: none;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  border-radius: 1rem;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 6rem;
  height: 4.8rem;
  background: #fff;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
}

.slider::-moz-range-thumb {
  width: 6rem;
  height: 4.8rem;
  background: #fff;
  cursor: pointer;
  border-radius: 1rem;
  border: none;
}
</style>