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
    this.attack = ADSR_DEFAULTS.attack
    this.decay = ADSR_DEFAULTS.decay
    this.sustain = ADSR_DEFAULTS.sustain
    this.release = ADSR_DEFAULTS.release

    this.setADSR(adsr)
  }

  getADSR(): ADSR {
    return {
      attack: this.attack,
      decay: this.decay,
      sustain: this.sustain,
      release: this.release
    }
  }

  setADSR(adsr: ADSR) {
    this.attack = adsr.attack || this.attack
    this.decay = adsr.decay || this.decay
    this.sustain = adsr.sustain || this.sustain
    this.release = adsr.release || this.release
  }
}

export default Envelope
