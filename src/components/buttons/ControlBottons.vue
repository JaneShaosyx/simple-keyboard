<template>
  <div class="control-buttons">
    <div
      class="button"
      :class="{ clicked: ifSustain }"
      @click="onSustain"
    ></div>
    <div
      class="button"
      :class="{ clicked: ifAutoWah }"
      @click="onAutoWah"
    ></div>
    <div
      class="button"
      :class="{ clicked: ifDistortion }"
      @click="onDistortion"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ControlButtons",
  data() {
    return {
      ifSustain: false,
      ifAutoWah: false,
      ifDistortion: false,
    };
  },
  created() {},
  watch: {
    ifSustain() {
      this.bus.$emit("onSustain", this.ifSustain);
    },
    ifAutoWah() {
      this.bus.$emit("onAutoWah", this.ifAutoWah);
    },
    ifDistortion() {
      this.bus.$emit("onDistortion", this.ifDistortion);
    },
  },
  methods: {
    onSustain() {
      this.ifSustain = !this.ifSustain;
    },
    onAutoWah() {
      this.ifAutoWah = !this.ifAutoWah;
    },
    onDistortion() {
      this.ifDistortion = !this.ifDistortion;
    },
  },
};
</script>

<style lang="less" scoped>
.control-buttons {
  display: flex;
  flex: 1;
}
.button {
  width: 8rem;
  height: 5.8rem;
  background-color: #bbb;
  display: inline-block;
  margin-left: 1.6rem;
}
.clicked {
  background-color: #333;
}
</style>