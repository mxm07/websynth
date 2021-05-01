import { ADSR } from './Types'

const ADSR_DEFAULTS = {
  attack: 0.5,
  decay: 0,
  sustain: 1,
  release: 15
}

class Envelope {
  attack: number
  decay: number
  sustain: number
  release: number

  constructor(adsr: ADSR = {}) {
    this.attack = adsr.attack || ADSR_DEFAULTS.attack
    this.decay = adsr.decay || ADSR_DEFAULTS.decay
    this.sustain = adsr.sustain || ADSR_DEFAULTS.sustain
    this.release = adsr.release || ADSR_DEFAULTS.release
  }

  getADSR(): ADSR {
    return {
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release
    }
  }
}

export default Envelope
