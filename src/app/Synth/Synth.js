import React from 'react'
import Oscillator from '../Oscillator'
import Keyboard from '../Keyboard'
import Visualizer from '../Visualizer'
import EnvEditor from '../EnvEditor'
import './Synth.scss'

const NUM_OSCILLATORS = 2

const Synth = () => (
  <div className="synth">
    <div className="synth-inner">
      { [ ...Array(NUM_OSCILLATORS) ].map((_, i) => (
        <Oscillator index={i} />
      )) }

      <Visualizer />
      <EnvEditor />
    </div>

    <Keyboard />
  </div>
)

export default Synth
