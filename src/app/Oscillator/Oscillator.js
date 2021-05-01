import OscillatorKnobs from './OscillatorKnobs'
import WaveformSelect from './WaveformSelect'

import './Oscillator.scss'

const Oscillator = ({ osc, index = 0 }) => (
  <div className="osc">
    <h1 className="osc__label">OSC {index}</h1>

    <WaveformSelect osc={ osc } index={ index } />
    <OscillatorKnobs osc={ osc } />
  </div>
)

export default Oscillator
