import Oscillator from './Oscillator'
import Gain from './Gain'
import BaseAudio from './BaseAudio'
import NodeChain from './NodeChain'
import { OscillatorType } from './Types'
import Envelope from './Envelope'
import { calculateNoteFrequency } from './Util'

const MIN_GAIN = 0.0001

export default class Voice extends BaseAudio {
  private note: number
  private type: OscillatorType
  chain: NodeChain
  oscillator: Oscillator
  gain: Gain
  envelope: Envelope

  started: boolean
  active: boolean

  constructor(type: OscillatorType, chain: NodeChain, envelope: Envelope, note?: number) {
    super()

    this.type = type
    this.note = note || 0
    this.started = false
    this.active = false

    this.gain = new Gain()
    this.oscillator = new Oscillator(type)
    this.envelope = envelope

    this.chain = chain
    chain.addNode(this.oscillator.node)
    chain.addNode(this.gain.node)
    this.chain.connect()
  }

  getNote(): number {
    return this.note
  }

  setNote(newNote: number) {
    this.note = newNote

    const noteFrequency = calculateNoteFrequency(newNote)
    this.oscillator.setFrequency(noteFrequency)
  }

  getType(): OscillatorType {
    return this.type
  }

  setType(type: OscillatorType) {
    this.type = type
    this.oscillator.setType(type)
  }


  protected createGain(): GainNode {
    return this.context.createGain()
  }


  private ensureVoiceStarted() {
    if (!this.started) {
      this.oscillator.start()

      this.started = true
    }
  }

  private triggerAttack() {
    const attack = this.envelope.attack

    // 0 attack means we should instantly set the voice to full volume
    if (attack === 0) {
      this.gain.setValue(1)
      return
    }

    this.gain.setValue(MIN_GAIN)
    this.gain.rampToValue(1, attack)
  }

  private triggerDecay() {
    const { decay, sustain } = this.envelope.getADSR()

    // Sustain being 1 means voice should remain at 100% -- no decay needed
    if (sustain === 1 || sustain === undefined || decay === undefined) {
      return
    }

    this.gain.rampToValue(sustain, decay)
  }

  private triggerRelease() {
    const release = this.envelope.release

    if (release === 0) {
      this.gain.setValue(MIN_GAIN)
      return
    }

    this.gain.cancelScheduledValues()
    this.gain.rampToValue(0, release)
  }

  play() {
    console.log('voice play')
    this.ensureVoiceStarted()

    this.active = true

    this.triggerAttack()
    this.triggerDecay()
  }

  stop() {
    this.active = false

    this.triggerRelease()
  }
}
