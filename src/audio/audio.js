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
        attack: attack || osc.adsr.attack,
        decay: decay || osc.adsr.decay,
        sustain: sustain || osc.adsr.sustain,
        release: release || osc.adsr.release
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
