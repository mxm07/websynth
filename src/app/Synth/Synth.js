import { useRef } from 'react'
import Oscillator from '../Oscillator'
import Keyboard from '../Keyboard'
import Visualizer from '../Visualizer'
import EnvEditor from '../EnvEditor'

import SynthNode from 'Audio/Synth'

import './Synth.scss'

const NUM_OSCILLATORS = 2

const Synth = () => {
  /*
    Whole app is the synth, but we call the Synth object a synth
    because each voice has its own oscillator. Synth in the audio
    libary = Oscillator in the React hierarchy... confusing, I know
  */
  const oscs = useRef([...Array(NUM_OSCILLATORS)].map(() => new SynthNode()))

  return (
    <div className="synth">
      <div className="synth-inner">
        { [ ...Array(NUM_OSCILLATORS) ].map((_, i) => (
          <Oscillator key={i} index={i} osc={ oscs.current[i] } />
        )) }

        <Visualizer />
        <EnvEditor />
      </div>

      <Keyboard
        onKeyDown={ note => {
          console.log('onKeyDown', note)
          console.log(oscs.current)
          oscs.current.forEach(osc => osc.playNote(note) )
        } }
      />
    </div>
  )
}

export default Synth
