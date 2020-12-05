<template>
  <div class="control-sliders">
    <input
      type="range"
      class="slider"
      min="0"
      max="1"
      step="any"
      v-model="curSustain"
    />
    <input
      type="range"
      class="slider"
      min="0"
      max="5"
      step="any"
      v-model="curRelease"
    />
    <input
      type="range"
      class="slider"
      min="-10"
      max="10"
      step="any"
      v-model="curVolume"
    />
  </div>
</template>

<script>
export default {
  name: "ControlSliders",
  data() {
    return {
      curSustain: 0.3,
      curRelease: 1,
      curVolume: -6,
    };
  },
  created() {
    this.curSustain = 0.3;
    this.curVolume = -6;
    this.curRelease = 1;
  },
  watch: {
    curSustain() {
      this.bus.$emit("setSustain", this.curSustain);
    },
    curVolume() {
      this.bus.$emit("setVolume", this.curVolume);
    },
    curRelease() {
      this.bus.$emit("setRelease", this.curRelease);
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.slider {
  -webkit-appearance: none;
  width: 39rem;
  height: 1.2rem;
  border-radius: 5px;
  background: #bbb;
  outline: none;
  display: block;
  margin-bottom: 3rem;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}
</style>