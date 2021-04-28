import Oscillator from './Oscillator'
import { NUM_OSCILLATORS } from 'Constants'

class Audio {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.type = 'sine'
    this.analyser = this.audioCtx.createAnalyser()
    this.analyser.fftSize = 2048

    // initialize with one sine oscillator
    this.oscillators = [...Array(NUM_OSCILLATORS)].map(() => new Oscillator(this.audioCtx, this.analyser))
  }

  // Apply to oscillator with given index. If index not given, apply to all
  applyTo = (func, oscIndex) => {
    if (oscIndex || oscIndex === 0) {
      const osc = this.oscillators[oscIndex]
      func(osc)
    } else {
      this.oscillators.forEach(osc => func(osc))
    }
  }

  setOscType = (type, oscIndex) => this.applyTo(osc => osc.setType(type), oscIndex)

  setAdsr = ({ attack, decay, sustain, release }, oscIndex) => this.applyTo(osc => {
    osc.adsr = {
        attack: (attack !== 0 && !attack) ? osc.adsr.attack : attack,
        decay: (decay !== 0 && !decay) ? osc.adsr.decay : decay,
        sustain: (sustain !== 0 && !sustain) ? osc.adsr.sustain : sustain,
        release: (release !== 0 && !release) ? osc.adsr.release : release
    }
  }, oscIndex)

  setLPF = (values, oscIndex) => this.applyTo(osc => {
    osc.setLPF(values)
  }, oscIndex)

  startOscillator = (note, oscIndex) => this.applyTo(osc => {
    osc.startVoice(note)
  }, oscIndex)

  stopOscillator = (note, oscIndex) => this.applyTo(osc => {
    osc.stopVoice(note)
  }, oscIndex)

  setLevel = (level, oscIndex) => this.applyTo(osc => {
    osc.setLevel(level)
  }, oscIndex)

  getActiveVoices = (oscIndex) => (
    this.oscillators[oscIndex].getActiveVoices()
  )
}

export default (new Audio())
