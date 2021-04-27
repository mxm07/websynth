import React from 'react'
import Audio from 'Audio'
import { Knob } from 'Components'
import './OscillatorKnobs.scss'

const timeFormatter = value => value < 1000 ? `${value}ms` : `${parseInt(value / 1000).toFixed(0)}s`
const hzFormatter = value => `${parseInt(value).toFixed(0)}hz`

const OscillatorKnobs = ({ index }) => (
  <div className="osc__knobs">
    <Knob
      label="Volume"
      min={0}
      max={100}
      places={0}
      initialValue={30}
      suffix="%"
      onChange={ value => Audio.setLevel(value / 250, index) }
    />

    <Knob
      label="Attack"
      min={0}
      max={30000}
      initialValue={0.5}
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => Audio.setAdsr({ attack: value / 1000 }, index) }
    />

    <Knob
      label="Decay"
      min={0}
      max={30000}
      initialValue={1000}
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => Audio.setAdsr({ decay: value / 1000 }, index) }
    />

    <Knob
      label="Sustain"
      min={-80}
      max={0}
      initialValue={0}
      logScaling={-10}
      suffix="db"
      onChange={ value => Audio.setAdsr({ sustain: value }, index) }
    />

    <Knob
      label="Release"
      min={0}
      max={30000}
      initialValue={15}
      logScaling={10}
      format={ timeFormatter }
      onChange={ value => Audio.setAdsr({ release: value / 1000 }, index) }
    />

    <Knob
      label="LPF Freq"
      min={8}
      max={22050}
      initialValue={440}
      logScaling={10}
      format={ hzFormatter }
      onChange={ value => Audio.setLPF({ freq: value }, index) }
    />

    <Knob
      label="LPF Res"
      min={0}
      max={100}
      initialValue={0}
      suffix="%"
      places={0}
      onChange={ value => Audio.setLPF({ res: value }, index) }
    />
  </div>
)

export default OscillatorKnobs
