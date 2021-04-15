class Audio {
  constructor() {
    this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    this.gainNode = this.audioCtx.createGain()

    this.oscillators = []
  }

  startOscillator = (type = 'sine', freq) => {
    console.log(freq)
    console.log(isFinite(freq))

    if (isFinite(freq)) {
      const oscillator = this.audioCtx.createOscillator()
      oscillator.type = type
      oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime)
      oscillator.connect(this.gainNode).connect(this.audioCtx.destination)
      oscillator.start()

      this.oscillators.push(oscillator)
    }
  }

  stopOscillator = (index = 0) => {
    this.oscillators[index] && this.oscillators[index].stop()
    this.oscillators.splice(index, 1)
  }

  setOscillatorFrequency = (freq, index = 0) => {
    this.oscillators[index] && this.oscillators[index].frequency.setValueAtTime(freq, this.audioCtx.currentTime)
  }

  setGain = gain => {
    this.gainNode.gain.value = gain
  }
}

export default (new Audio())
