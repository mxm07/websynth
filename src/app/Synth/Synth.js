import Oscillator from '../Oscillator'
import Keyboard from '../Keyboard'
import Env from '../Env'
import Visualizer from '../Visualizer'
import { Tone, calculateNoteFrequency } from 'Utils'

import './Synth.scss'

// const NUM_OSCILLATORS = 2

const Synth = () => {
  /*
    Whole app is the synth, but we call the Synth object a synth
    because each voice has its own oscillator. Synth in the audio
    libary = Oscillator in the React hierarchy... confusing, I know
  */
  // const oscs = useRef([...Array(NUM_OSCILLATORS)].map(() => new SynthNode()))

  return (
    <div className="synth">
      <div className="synth-inner">
        <Oscillator index={0} />

        <Visualizer />
        <Env />
      </div>

      <Keyboard
        onKeyDown={ note => {
          const freq = calculateNoteFrequency(note)
          Tone.triggerAttack(freq)
        } }
        onKeyUp={ note => {
          const freq = calculateNoteFrequency(note)
          Tone.triggerRelease(freq)
        } }
      />
    </div>
  )
}

export default Synth
