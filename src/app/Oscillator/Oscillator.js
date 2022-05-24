import OscillatorKnobs from './OscillatorKnobs'
import WaveformSelect from './WaveformSelect'

import './Oscillator.scss'

const Oscillator = ({ index = 0 }) => (
  <div className="osc">
    <h1 className="osc__label">OSC { index }</h1>

    <div className="osc__controls">
      <WaveformSelect index={ index } />
      <OscillatorKnobs />
    </div>
  </div>
)

export default Oscillator
