import { calculateNoteFrequency } from 'Utils'

class Oscillator {
  constructor(audioCtx) {
    this.audioCtx = audioCtx
    this.type = 'sine'
    this.voices = []

    this.activeVoices = Array(8)
    this.activeVoices.fill(false)

    this.level = 1
    this.started = false

    this.adsr = {
      attack: 0,
      decay: 0,
      sustain: 0,
      release: 0
    }

    for (let _ = 0; _ < 8; _++) {
      const gainNode = audioCtx.createGain()
      const voice = audioCtx.createOscillator()

      voice.type = this.type
      voice.frequency.setValueAtTime(0, audioCtx.currentTime)
      voice.connect(gainNode).connect(audioCtx.destination)

      this.voices.push({
        voice,
        gainNode,
        note: -1,
        timeout: null
      })
    }
  }

  enableAllVoices = () => {
    this.voices.forEach(({ voice }) => voice.start())
  }


  getActiveVoices = () => (
    this.voices.filter(v => v.note > -1).length
  )

  getFirstInactiveVoice = () => {
    let index = 0

    for (let i = 0; i < this.voices.length; i++) {
      if (this.voices[i].note === -1) {
        index = i
        break
      }
    }

    return index
  }

  getVoiceWithNote = note => (
    this.voices.filter(v => v.note === note)[0]
  )


  startVoice = note => {

    // Have to "start" all voices on first keypress, otherwise modern browsers will complain and no sound will play
    if (!this.started) {
      this.enableAllVoices()
      this.started = true
    }

    const matchingVoice = this.getVoiceWithNote(note)

    if (matchingVoice) {
      // instantly stop any voice with the same note so we can start a new one
      this.stopVoiceByIndexInstant(this.voices.indexOf(matchingVoice))
    }

    // to-do: check if first inactive voice is -1 and if so boot the oldest voice
    this.startVoiceByIndex(note, this.getFirstInactiveVoice())
  }

  stopVoice = note => {
    // ensure there's an active voice with the passed note
    const matchingVoice = this.voices.filter(voice => voice.note === note)[0]

    if (!matchingVoice) return

    const matchingVoiceIndex = this.voices.indexOf(matchingVoice)
    this.stopVoiceByIndex(matchingVoiceIndex)
  }

  startVoiceByIndex = (note, index) => {
    const activeVoices = this.getActiveVoices() + 1 // +1 to include the voice currently being added

    const voiceOsc = this.voices[index]
    voiceOsc.voice.frequency.value = calculateNoteFrequency(note)
    // voiceOsc.gainNode.gain.setTargetAtTime(this.level / activeVoices, this.audioCtx.currentTime, this.adsr.attack / 10)
    voiceOsc.gainNode.gain.setValueAtTime(0.001, this.audioCtx.currentTime)
    voiceOsc.gainNode.gain.exponentialRampToValueAtTime(this.level, this.audioCtx.currentTime + this.adsr.attack)

    voiceOsc.note = note

    // this.normalizeGains(index)
  }

  stopVoiceByIndex = index => {
    const voiceOsc = this.voices[index]

    voiceOsc.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime)
    voiceOsc.gainNode.gain.setValueAtTime(voiceOsc.gainNode.gain.value, this.audioCtx.currentTime)
    // voiceOsc.gainNode.gain.setTargetAtTime(0, this.audioCtx.currentTime, this.adsr.release / 10)
    voiceOsc.gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + this.adsr.release)


    const stop = () => {
      voiceOsc.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime)
      // voiceOsc.voice.frequency.setValueAtTime(0, this.audioCtx.currentTime)
      voiceOsc.note = -1
      voiceOsc.timeout = null
    }

    if (this.adsr.release === 0) {
      stop()
    } else {
      this.voices[index].timeout = setTimeout(stop, this.adsr.release * 1000)
    }
  }

  stopVoiceByIndexInstant = index => {
    const voiceOsc = this.voices[index]

    voiceOsc.gainNode.gain.value = 0
    voiceOsc.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime)

    voiceOsc.voice.frequency.value = 0

    voiceOsc.note = -1
    voiceOsc.timeout && clearTimeout(voiceOsc.timeout)
  }


  normalizeGains = (exclude = -1) => {
    const activeVoices = this.getActiveVoices()
    const maxLevel = this.level * ((Math.pow(2, activeVoices) - 1) / Math.pow(2, activeVoices))

    this.voices.forEach((voice, i) => {
      if (voice.note > -1) {
        voice.gainNode.gain.setValueAtTime(maxLevel / activeVoices / 4, this.audioCtx.currentTime)
      }
    })
  }



  setLevel = (level) => {
    this.level = level
  }

  setType = type => {
    this.type = type

    for (let voice of this.voices) {
      voice.voice.type = type
    }
  }
}

export default Oscillator
