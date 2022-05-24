import * as Tone from 'tone'

const Analyser = new Tone.Analyser('waveform', 1024)

const Synth = new Tone.PolySynth({
  maxPolyphony: 32
})

const Filter = new Tone.Filter(500, 'lowpass').toDestination()

Filter.set({
  frequency: 1000,
  type: 'bandpass',
  Q: 10
})

Synth.chain(Filter, Analyser, Tone.Destination)

export { Synth, Filter, Analyser }
