<template>
  <div class="home">
    <control-sliders class="control-sliders"></control-sliders>
    <control-buttons class="control-buttons"></control-buttons>
    <div class="container-home">
      <octave-indicator class="octave-indicator"></octave-indicator
      ><keyboard class="keyboard"></keyboard>
    </div>
  </div>
</template>

<script>
// import * as Tone from 'tone'
import Keyboard from "../components/keyboard/Keyboard.vue";
import OctaveIndicator from "../components/sidebar/OctaveIndicator.vue";
import ControlSliders from "../components/sliders/ControlSliders.vue";
import ControlButtons from "../components/buttons/ControlBottons.vue";

export default {
  name: "Home",
  components: {
    Keyboard,
    OctaveIndicator,
    ControlSliders,
    ControlButtons,
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.home {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #b64242;
}
.container-home {
  position: absolute;
  bottom: 30rem;
  display: flex;
  left: 50%;
  transform: translateX(-50%-7rem);
}
.keyboard {
  flex: 1;
  z-index: 1;
}
.octave-indicator {
  transform: rotate(-90deg) translateY(50%);
  flex: 1;
}
.control-sliders {
  position: absolute;
  bottom: 58rem;
  margin-bottom: 2.5rem;
  left: 46rem;
}
.control-buttons {
  position: absolute;
  bottom: 58rem;
  margin-bottom: 4rem;
  right: 37rem;
}
</style>