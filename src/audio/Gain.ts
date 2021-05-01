import BaseAudio from './BaseAudio'

export default class Gain extends BaseAudio {
  node: GainNode

  constructor() {
    super()

    this.node = this.context.createGain()
  }

  setValue(value: number) {
    this.node.gain.setValueAtTime(value, this.context.currentTime)
  }

  rampToValue(value: number, time: number) {
    this.node.gain.exponentialRampToValueAtTime(value, this.context.currentTime + time)
  }

  cancelScheduledValues() {
    this.node.gain.cancelScheduledValues(this.context.currentTime)
  }
}