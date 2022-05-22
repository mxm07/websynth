import { Knob } from 'Components'
import { Tone } from 'Utils'
import './OscillatorKnobs.scss'

const hzFormatter = value => `${parseInt(value).toFixed(0)}hz`

const OscillatorKnobs = ({ osc = {} }) => (
  <div className="osc__knobs">
    <Knob
      label="Volume"
      min={0}
      max={100}
      places={0}
      initialValue={30}
      suffix="%"
      onChange={ value => {
        Tone.options.volume = parseInt(value) - 50
      } }
    />

    <Knob
      label="LPF Freq"
      min={8}
      max={22050}
      initialValue={440}
      logScaling={10}
      format={ hzFormatter }
      onChange={ value => {} }
    />

    <Knob
      label="LPF Res"
      min={0}
      max={100}
      initialValue={0}
      suffix="%"
      places={0}
      onChange={ value => {} }
    />
  </div>
)

export default OscillatorKnobs
