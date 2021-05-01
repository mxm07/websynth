import BaseAudio from "./BaseAudio"
import { OscillatorType } from './Types'

export default class Oscillator extends BaseAudio {
  node: OscillatorNode

  constructor(type: OscillatorType) {
    super()

    this.node = this.context.createOscillator()
    this.node.type = type
    this.setFrequency(0)
  }

  setType(type: OscillatorType) {
    this.node.type = type
  }

  setFrequency(hz: number) {
    this.node.frequency.setValueAtTime(hz, this.context.currentTime)
  }

  start() {
    this.node.start()
  }
}