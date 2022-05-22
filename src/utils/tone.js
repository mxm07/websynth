import * as ToneLib from 'tone'

const Analyser = new ToneLib.Analyser('waveform', 1024)

const Tone = new ToneLib.PolySynth({
  maxPolyphony: 8
}).connect(Analyser).toDestination()

Tone.options.envelope = {
  attack: 1,
  decay: 1,
  sustain: 1,
  release: 0.5
}

export { Tone, Analyser }
