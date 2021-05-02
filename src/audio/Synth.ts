import Voice from './Voice'
import { OscillatorType, ADSR } from './Types'
import Envelope from './Envelope'
import Gain from './Gain'
import NodeChain from './NodeChain'

export default class Synth {
  private type: OscillatorType
  volume: number
  envelope: Envelope
  globalGain: Gain

  readonly voices: Voice[]

  constructor(type: OscillatorType = 'sine', volume: number = 1) {
    this.type = type
    this.volume = volume
    this.envelope = new Envelope()
    this.globalGain = new Gain()

    const chain = new NodeChain()
    chain.addNode(this.globalGain.node)

    this.voices = [...Array<Voice>(8)].map(() => (
      new Voice(type, chain, this.envelope)
    ))
  }

  setType(type: OscillatorType) {
    this.type = type

    for (let voice of this.voices) {
      voice.setType(type)
    }
  }

  getType(): OscillatorType {
    return this.type
  }

  setEnvelope(adsr: ADSR) {
    this.envelope.setADSR(adsr)
  }

  findNextAvailableVoice(): Voice | undefined {
    for (let voice of this.voices) {
      if (!voice.active) {
        return voice
      }
    }

    return undefined
  }

  findVoiceWithNote(note: number): Voice | undefined {
    for (let voice of this.voices) {
      if (voice.getNote() === note) {
        return voice
      }
    }

    return undefined
  }

  playNote(note: number) {
    const nextAvailableVoice = this.findNextAvailableVoice()

    console.log('playnote')
    if (nextAvailableVoice) {
      nextAvailableVoice.setNote(note)
      nextAvailableVoice.play()
    }
  }

  stopNote(note: number) {
    const matchingVoice = this.findVoiceWithNote(note)

    if (!matchingVoice) {
      return
    }

    matchingVoice.stop()
  }
}
