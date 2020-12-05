<template>
  <div class="container">
    <div class="scale" v-for="(scale, index) in curNoteList" :key="index">
      <div
        class="key-container"
        v-for="note in scale"
        :key="note"
        @click="onPlay(note)"
      >
        <div class="key-white" v-if="note.indexOf('#') == -1">{{note}}</div>
        <div class="key-black" v-else></div>
      </div>
    </div>
  </div>
</template>

<script>
// import * as Tone from 'tone'

export default {
  name: "Keyboard",
  data() {
    return {
      notesList: [
        [
          "C1",
          "C#1",
          "D1",
          "D#1",
          "E1",
          "F1",
          "F#1",
          "G1",
          "G#1",
          "A1",
          "A#1",
          "B1",
        ],
        [
          "C2",
          "C#2",
          "D2",
          "D#2",
          "E2",
          "F2",
          "F#2",
          "G2",
          "G#2",
          "A2",
          "A#2",
          "B2",
        ],
        [
          "C3",
          "C#3",
          "D3",
          "D#3",
          "E3",
          "F3",
          "F#3",
          "G3",
          "G#3",
          "A3",
          "A#3",
          "B3",
        ],
        [
          "C4",
          "C#4",
          "D4",
          "D#4",
          "E4",
          "F4",
          "F#4",
          "G4",
          "G#4",
          "A4",
          "A#4",
          "B4",
        ],
        [
          "C5",
          "C#5",
          "D5",
          "D#5",
          "E5",
          "F5",
          "F#5",
          "G5",
          "G#5",
          "A5",
          "A#5",
          "B5",
        ],
        [
          "C5",
          "C#5",
          "D5",
          "D#5",
          "E5",
          "F5",
          "F#5",
          "G5",
          "G#5",
          "A5",
          "A#5",
          "B5",
        ],
        [
          "C6",
          "C#6",
          "D6",
          "D#6",
          "E6",
          "F6",
          "F#6",
          "G6",
          "G#6",
          "A6",
          "A#6",
          "B6",
        ],
        [
          "C7",
          "C#7",
          "D7",
          "D#7",
          "E7",
          "F7",
          "F#7",
          "G7",
          "G#7",
          "A7",
          "A#7",
          "B7",
        ],
      ],
      curNoteList: [
        [
          "C3",
          "C#3",
          "D3",
          "D#3",
          "E3",
          "F3",
          "F#3",
          "G3",
          "G#3",
          "A3",
          "A#3",
          "B3",
        ],
        [
          "C4",
          "C#4",
          "D4",
          "D#4",
          "E4",
          "F4",
          "F#4",
          "G4",
          "G#4",
          "A4",
          "A#4",
          "B4",
        ],
        [
          "C5",
          "C#5",
          "D5",
          "D#5",
          "E5",
          "F5",
          "F#5",
          "G5",
          "G#5",
          "A5",
          "A#5",
          "B5",
        ],
      ],
      playNotes: [],
    };
  },
  created() {
    document.onkeydown = this.onKeydown;
    document.onkeyup = this.onKeyup;
  },
  methods: {
    onPlay(note) {
      if (this.playNotes.indexOf(note) === -1) {
        this.playNotes.push(note);
      }
      console.log(this.playNotes);
    },
    onKeydown(e) {
      console.log(e);
    },
    onKeyup(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 105rem;
  height: 28rem;
  display: flex;
}
.scale {
  height: 28rem;
  width: 35rem;
  display: flex;
}
.key-white {
  background: white;
  width: 5rem;
  height: 28rem;
  border: 0.1rem solid #c0c0c0;
}
.key-black {
  position: absolute;
  width: 3rem;
  height: 18rem;
  background: black;
  transform: translateX(-50%);
}
</style>