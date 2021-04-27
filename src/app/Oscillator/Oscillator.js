import React from 'react'
import OscillatorKnobs from './OscillatorKnobs'
import WaveformSelect from './WaveformSelect'

import './Oscillator.scss'

const Oscillator = ({ index = 0 }) => {

  return (
    <div className="osc">
      <h1 className="osc__label">OSC {index}</h1>

      <WaveformSelect index={ index } />
      <OscillatorKnobs index={ index } />
    </div>
  )
}

export default Oscillator
