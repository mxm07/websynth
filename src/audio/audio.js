import Oscillator from './Oscillator'

class Audio {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.type = 'sine'

    // initialize with one sine oscillator
    this.oscillators = [new Oscillator(this.audioCtx)]
  }

  setOscType = (type, oscIndex = 0) => this.oscillators[oscIndex].setType(type)

  setAdsr = ({ attack, decay, sustain, release }, oscIndex = 0) => {
    const osc = this.oscillators[oscIndex]

    this.oscillators[oscIndex].adsr = {
        attack: (attack !== 0 && !attack) ? osc.adsr.attack : attack,
        decay: (decay !== 0 && !decay) ? osc.adsr.decay : decay,
        sustain: (sustain !== 0 && !sustain) ? osc.adsr.sustain : sustain,
        release: (release !== 0 && !release) ? osc.adsr.release : release
    }
  }

  startOscillator = (note, oscIndex = 0) => {
    this.oscillators[oscIndex].startVoice(note)
  }

  stopOscillator = (note, oscIndex = 0) => {
    this.oscillators[oscIndex].stopVoice(note)
  }

  setLevel = (level, oscIndex = 0) => {
    this.oscillators[oscIndex].level = level
  }
}

export default (new Audio())
