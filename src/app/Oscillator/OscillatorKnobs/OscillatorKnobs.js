import { Knob } from 'Components'
import './OscillatorKnobs.scss'

const timeFormatter = value => value < 1000 ? `${value}ms` : `${parseInt(value / 1000).toFixed(0)}s`
const hzFormatter = value => `${parseInt(value).toFixed(0)}hz`

const OscillatorKnobs = ({ osc }) => (
  <div className="osc__knobs">
    <Knob
      label="Volume"
      min={0}
      max={100}
      places={0}
      initialValue={30}
      suffix="%"
      onChange={ value => osc.volume = value / 250 }
    />

    <Knob
      label="Attack"
      min={0}
      max={30000}
      initialValue={0.5}
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => osc.setADSR({ attack: value / 1000 }) }
    />

    <Knob
      label="Decay"
      min={0}
      max={30000}
      initialValue={1000}
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => osc.setADSR({ decay: value / 1000 }) }
    />

    <Knob
      label="Sustain"
      min={-80}
      max={0}
      initialValue={0}
      logScaling={-10}
      suffix="db"
      onChange={ value => osc.setADSR({ sustain: value }) }
    />

    <Knob
      label="Release"
      min={0}
      max={30000}
      initialValue={15}
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => osc.setADSR({ release: value / 1000 }) }
    />

    <Knob
      label="LPF Freq"
      min={8}
      max={22050}
      initialValue={440}
      logScaling={10}
      format={ hzFormatter }
      onChange={ value => Audio.setLPF({ freq: value }) }
    />

    <Knob
      label="LPF Res"
      min={0}
      max={100}
      initialValue={0}
      suffix="%"
      places={0}
      onChange={ value => Audio.setLPF({ res: value }) }
    />
  </div>
)

export default OscillatorKnobs
