<template>
  <div class="container-keyboard">
    <div class="scale" v-for="scale in curNoteList" :key="scale[0]">
      <div
        class="key-container"
        v-for="note in scale"
        :key="note"
        @mousedown="noteOn(note)"
        @mouseup="noteOff(note)"
      >
        <div
          class="key-white"
          :class="{ click: isClicked(note) }"
          v-if="note.indexOf('#') == -1"
        ></div>
        <div
          class="key-black"
          :class="{ blackClick: isClicked(note) }"
          v-else
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as Tone from "tone";
import { qwertyToKeyMap } from "../../utils/keytonote";

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
      playNotes: [],
      curSynth: null,
      mouseClicked: false,
      sustain: false,
      distortion: false,
      autoWah: false,
      autoWahNode: null,
      distortionNode: null,
      curOctave: 2,
      curVolume: -6,
      curSustain: 0.3,
      curRelease: 1,
      vol: null,
    };
  },
  computed: {
    isClicked() {
      return (note) => {
        let res = this.playNotes.indexOf(note) == -1 ? false : true;
        return res;
      };
    },
    curNoteList() {
      return this.notesList.slice(this.curOctave, this.curOctave + 3);
    },
  },
  watch: {
    autoWah() {
      if (this.autoWah && !this.distortion) {
        this.curSynth.disconnect(this.vol);
        this.curSynth.connect(this.autoWahNode);
        this.vol.volume.value = this.curVolume / 2;
      } else if (this.distortion && !this.autoWah) {
        this.curSynth.disconnect(this.autoWahNode);
      } else if (this.distortion && this.autoWah) {
        this.curSynth.connect(this.autoWahNode);
        this.vol.volume.value = this.curVolume / 3;
      } else {
        this.curSynth.disconnect(this.autoWahNode);
        this.curSynth.connect(this.vol);
      }
    },
    distortion() {
      if (this.distortion && !this.autoWah) {
        this.curSynth.disconnect(this.vol);
        this.curSynth.connect(this.distortionNode);
        this.vol.volume.value = this.curVolume / 2;
      } else if (!this.distortion && this.autoWah) {
        this.curSynth.disconnect(this.distortionNode);
      } else if (this.distortion && this.autoWah) {
        this.curSynth.connect(this.distortionNode);
        this.vol.volume.value = this.curVolume / 3;
      } else {
        this.curSynth.disconnect(this.distortionNode);
        this.curSynth.connect(this.vol);
      }
    },
    curVolume() {
      this.vol.volume.value = this.curVolume;
    },
    curSustain() {
      this.curSynth.set({
        volume: this.curVolume,
        oscillator: {
          partialCount: 0,
          phase: 0,
          type: "triangle",
        },
        envelope: {
          attack: 0.005,
          attackCurve: "linear",
          decay: 0.1,
          decayCurve: "exponential",
          release: this.curRelease,
          releaseCurve: "exponential",
          sustain: this.curSustain,
        },
      });
    },
    curRelease() {
      this.curSynth.set({
        volume: this.curVolume,
        oscillator: {
          partialCount: 0,
          phase: 0,
          type: "triangle",
        },
        envelope: {
          attack: 0.005,
          attackCurve: "linear",
          decay: 0.1,
          decayCurve: "exponential",
          release: this.curRelease,
          releaseCurve: "exponential",
          sustain: this.curSustain,
        },
      });
    },
  },
  created() {
    document.onkeydown = this.onKeydown;
    document.onkeyup = this.onKeyup;
    Tone.context.lookAhead = 0;
    // const limiter = new Tone.Limiter(-5).toDestination();
    this.curSynth = new Tone.PolySynth(Tone.Sampler.piano, {
      maxPolyphony: 16,
    });
    // this.curSynth.connect(limiter);
    this.curSynth.set({
      volume: this.curVolume,
      oscillator: {
        partialCount: 0,
        phase: 0,
        type: "triangle",
      },
      envelope: {
        attack: 0.005,
        attackCurve: "linear",
        decay: 0.1,
        decayCurve: "exponential",
        release: this.curRelease,
        releaseCurve: "exponential",
        sustain: this.curSustain,
      },
    });
    this.vol = new Tone.Volume(this.curVolume).toDestination();
    this.curSynth.connect(this.vol);
    this.autoWahNode = new Tone.AutoWah(50, 6, -30);
    this.autoWahNode.Q.value = 6;
    this.autoWahNode.connect(this.vol);
    this.distortionNode = new Tone.Distortion(1);
    this.distortionNode.connect(this.vol);
    this.bus.$on("setOctave", (oct) => {
      this.curOctave = Number(oct);
    });
    this.bus.$on("setSustain", (sustain) => {
      this.curSustain = Number(sustain);
    });
    this.bus.$on("setVolume", (vol) => {
      this.curVolume = Number(vol);
    });
    this.bus.$on("setRelease", (rel) => {
      this.curRelease = Number(rel);
    });
    this.bus.$on("onSustain", (sus) => {
      this.sustain = sus;
    });
    this.bus.$on("onAutoWah", (wah) => {
      this.autoWah = wah;
    });
    this.bus.$on("onDistortion", (distor) => {
      this.distortion = distor;
    });
  },
  methods: {
    noteOn(note) {
      if (this.playNotes.indexOf(note) === -1) {
        this.playNotes.push(note);
        if (this.sustain) {
          this.curSynth.triggerAttack(note);
        } else {
          this.curSynth.triggerAttackRelease(note, 0.015 + this.curSustain);
        }
      }
    },
    noteOff(note) {
      this.curSynth.triggerRelease(note);
      this.playNotes = this.playNotes.filter((n) => {
        return n !== note;
      });
    },
    onKeydown(e) {
      this.mouseClicked = true;
      let key = e.key;
      if (Object.prototype.hasOwnProperty.call(qwertyToKeyMap, key)) {
        let note = qwertyToKeyMap[key] + this.curNoteList[0][0].split("")[1];
        this.noteOn(note);
      }
      if (key === "]") {
        if (this.curOctave < 4) {
          this.curOctave++;
          this.bus.$emit("updateOctave", this.curOctave);
        }
      }
      if (key === "[") {
        if (this.curOctave > 0) {
          this.curOctave--;
          this.bus.$emit("updateOctave", this.curOctave);
        }
      }
    },
    onKeyup(e) {
      this.mouseClicked = false;
      let key = e.key;
      if (Object.prototype.hasOwnProperty.call(qwertyToKeyMap, key)) {
        let note = qwertyToKeyMap[key] + this.curNoteList[0][0].split("")[1];
        this.noteOff(note);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.container-keyboard {
  height: 28rem;
  display: flex;
}
.scale {
  height: 28rem;
  display: flex;
}
.key-white {
  background: white;
  width: 5rem;
  height: 28rem;
  border: 0.1rem solid #c0c0c0;
}
.click {
  background: #eeeeee;
}
.key-black {
  position: absolute;
  width: 3rem;
  height: 18rem;
  background: black;
  transform: translateX(-50%);
}
.blackClick {
  background: #333333;
}
</style>