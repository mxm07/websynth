export type OscillatorType = 'sine' | 'sawtooth' | 'square' | 'triangle'

export interface ADSR {
  attack?: number,
  decay?: number,
  sustain?: number,
  release?: number
}

