<template>
  <div class="wrapper">
    <div class="container-keyboard" v-if="!isMobile()">
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
    <div class="container-keyboard" v-else>
      <div class="scale" v-for="scale in curNoteList" :key="scale[0]">
        <div
          class="key-container"
          v-for="note in scale"
          :key="note"
          @touchstart="noteOn(note)"
          @touchend="noteOff(note)"
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
  </div>
</template>

<script>
import * as Tone from "tone";
import { qwertyToKeyMap } from "../../utils/keytonote";
import { notesList } from "../../utils/constant";

export default {
  name: "Keyboard",
  data() {
    return {
      notesList,
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
      autoWahChannel: null,
      distortionChannel: null,
      busChannel: null,
      recording: false,
      play: false,
      player: null,
      recorder: null,
      recordContent: null,
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
      if (this.autoWah) {
        this.autoWahChannel.volume.value = this.curVolume;
        Tone.Destination.volume.value = this.curVolume;
      } else {
        this.autoWahChannel.volume.value = -60;
        Tone.Destination.volume.value = this.curVolume;
      }
    },
    distortion() {
      if (this.distortion) {
        this.distortionChannel.volume.value = this.curVolume;
        Tone.Destination.volume.value = this.curVolume;
      } else {
        this.distortionChannel.volume.value = -60;
        Tone.Destination.volume.value = this.curVolume;
      }
    },
    curVolume() {
      Tone.Destination.volume.value = this.curVolume;
    },
    curSustain() {
      this.setParameter();
    },
    curRelease() {
      this.setParameter();
    },
    async recording() {
      if (this.recording) {
        Tone.Destination.connect(this.recorder);
        this.recorder.start();
      } else if (!this.recording) {
        const content = await this.recorder.stop();
        this.recordContent = URL.createObjectURL(content);
        this.player = new Tone.Player(this.recordContent).toDestination();
      }
    },
    play() {
      if (this.play) {
        this.player.start();
      } else {
        this.player = null;
      }
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    document.onkeydown = this.onKeydown;
    document.onkeyup = this.onKeyup;
    Tone.context.lookAhead = 0;
    this.curSynth = new Tone.PolySynth(Tone.Synth, {
      maxPolyphony: 16,
    });
    this.setParameter();
    this.createEffectNode();
    this.recorder = new Tone.Recorder();
  },
  methods: {
    createEffectNode() {
      // make some effects
      this.autoWahNode = new Tone.AutoWah(50, 6, -30).toDestination();
      this.autoWahNode.Q.value = 6;
      this.autoWahChannel = new Tone.Channel({ volume: -60 }).connect(
        this.autoWahNode
      );
      this.autoWahChannel.receive("autoWahNode");

      this.distortionNode = new Tone.Distortion(1).toDestination();
      this.distortionChannel = new Tone.Channel({ volume: -60 }).connect(
        this.distortionNode
      );
      this.distortionChannel.receive("distortionNode");
      // send the player to all of the channels
      this.busChannel = new Tone.Channel({ volume: -6 }).toDestination();
      this.busChannel.send("autoWahNode");
      this.busChannel.send("distortionNode");
      this.curSynth.connect(this.busChannel);
      Tone.Destination.volume.value = this.curVolume;
      this.setBusCallback();
    },
    setBusCallback() {
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
      this.bus.$on("onDistortion", (distor) => {
        this.distortion = distor;
      });
      this.bus.$on("onRecord", (record) => {
        this.recording = record;
      });
      this.bus.$on("onPlay", (play) => {
        this.play = play;
      });
    },
    setParameter() {
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
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
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