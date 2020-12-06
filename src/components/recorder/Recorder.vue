<template>
  <div class="recorder-buttons">
    <a
      v-if="downloadUrl"
      class="download-button"
      :href="downloadUrl"
      download="recording.webm"
    ></a>
    <div
      class="recorder-button"
      :class="{ clicked: recording }"
      @click="onRecord"
    ></div>
    <div class="player-button" :class="{ clicked: play }" @click="onPlay"></div>
  </div>
</template>

<script>
export default {
  name: "Recorder",
  data() {
    return {
      recording: false,
      play: false,
      downloadUrl: "",
    };
  },
  created() {
    this.bus.$on("download", (url) => {
      this.downloadUrl = url;
    });
  },
  watch: {
    recording() {
      this.bus.$emit("onRecord", this.recording);
    },
    play() {
      this.bus.$emit("onPlay", this.play);
    },
  },
  methods: {
    onRecord() {
      this.recording = !this.recording;
    },
    onPlay() {
      this.play = !this.play;
    },
  },
};
</script>

<style lang="less" scoped>
.recorder-buttons {
  display: flex;
  flex: 1;
}
.recorder-button {
  box-shadow: 0.3rem 0.3rem 1rem #666;
  width: 8rem;
  height: 5.8rem;
  background-color: #bbb;
  display: inline-block;
  margin-left: 1.6rem;
}
.download-button {
  box-shadow: 0.3rem 0.3rem 1rem #666;
  width: 8rem;
  height: 5.8rem;
  background-color: #bbb;
  display: inline-block;
  margin-left: 1.6rem;
}
.player-button {
  box-shadow: 0.3rem 0.3rem 1rem #555;
  width: 8rem;
  height: 5.8rem;
  background-color: #bbb;
  display: inline-block;
  margin-left: 1.6rem;
}
.clicked {
  box-shadow: inset 0 0 1rem #555;
}
</style>