import Oscillator from '../Oscillator'
import Keyboard from '../Keyboard'
import Env from '../Env'
import Filter from '../Filter'
import Visualizer from '../Visualizer'
import { Synth, calculateNoteFrequency } from 'Utils'

import './SynthApp.scss'

// const NUM_OSCILLATORS = 2

const SynthApp = () => (
  <div className="synth">
    <div className="synth-inner">
      <Oscillator index={0} />
      <Oscillator index={1} />

      <Env />
      <Filter />
      <Visualizer />
    </div>

    <Keyboard
      onKeyDown={ note => { Synth.triggerAttack(calculateNoteFrequency(note)) } }
      onKeyUp={ note => { Synth.triggerRelease(calculateNoteFrequency(note)) } }
    />
  </div>
)

export default SynthApp
