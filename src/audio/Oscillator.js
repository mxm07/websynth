import { calculateNoteFrequency, decibelsToGainValue } from 'Utils'

class Oscillator {
  constructor(audioCtx, analyser) {
    this.audioCtx = audioCtx
    this.type = 'sine'
    this.voices = []
    this.started = false

    this.lpf = audioCtx.createBiquadFilter()
    this.lpf.type = 'lowpass'


    this.level = 0.2
    this.globalGain = audioCtx.createGain()
    this.globalGain.gain.setValueAtTime(this.level, audioCtx.currentTime)


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
      voice
        .connect(gainNode)
        .connect(this.lpf)
        .connect(this.globalGain)
        .connect(analyser)
        .connect(audioCtx.destination)

      this.voices.push({
        voice,
        gainNode,
        note: -1,
        timeout: null,
        released: false
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
      /*
        If startVoice is spammed (like in the case of a keydown listener), we should short-circuit
        the voice being played, otherwise we'll have instant stopping-and-starting over and over,
        which causes audio artifacts. Only voices with the same note that have been released previously
        should be re-started
      */
      if (!matchingVoice.released) { return }

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
    if (this.level === 0) return

    const { attack, decay, sustain } = this.adsr

    const voiceOsc = this.voices[index]
    voiceOsc.released = false
    voiceOsc.note = note
    voiceOsc.voice.frequency.value = calculateNoteFrequency(note)
    voiceOsc.gainNode.gain.setValueAtTime(0.0001, this.audioCtx.currentTime)
    voiceOsc.gainNode.gain.exponentialRampToValueAtTime(1, this.audioCtx.currentTime + attack)

    // Sustain specified in dB -- convert to gain level units first, then multiply by level to scale it to master osc level
    const sustainLevel = decibelsToGainValue(sustain)
    voiceOsc.gainNode.gain.exponentialRampToValueAtTime(sustainLevel, this.audioCtx.currentTime + attack + decay)
  }

  stopVoiceByIndex = index => {
    const voiceOsc = this.voices[index]
    voiceOsc.released = true

    voiceOsc.gainNode.gain.cancelScheduledValues(this.audioCtx.currentTime)
    voiceOsc.gainNode.gain.setValueAtTime(voiceOsc.gainNode.gain.value, this.audioCtx.currentTime)
    voiceOsc.gainNode.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + this.adsr.release)


    const stop = () => {
      voiceOsc.note = -1
      voiceOsc.gainNode.gain.setValueAtTime(0, this.audioCtx.currentTime)
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
    const maxLevel = ((Math.pow(2, activeVoices) - 1) / Math.pow(2, activeVoices))

    this.voices.forEach((voice, i) => {
      if (voice.note > -1) {
        voice.gainNode.gain.setValueAtTime(maxLevel / activeVoices, this.audioCtx.currentTime)
      }
    })
  }



  setLevel = level => {
    this.level = level
    this.globalGain.gain.value = level
  }

  setLPF = ({ freq, res }) => {
    if (freq) { this.lpf.frequency.setValueAtTime(freq, this.audioCtx.currentTime) }
    if (res) { this.lpf.Q.setValueAtTime(res, this.audioCtx.currentTime) }
  }

  setType = type => {
    this.type = type

    for (let voice of this.voices) {
      voice.voice.type = type
    }
  }
}

export default Oscillator
