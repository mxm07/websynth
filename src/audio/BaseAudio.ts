class BaseAudio {
  readonly context: AudioContext
  readonly analyser: AnalyserNode

  constructor() {
    this.context = new window.AudioContext()
    this.analyser = this.context.createAnalyser()
  }
}

export default BaseAudio
