import React, { useState } from 'react'
import classNames from 'classnames'
import { Knob } from 'Components'
import Audio from 'Audio'
import { roundToPlaces } from 'Utils'
import Keyboard from '../Keyboard'
import { Sine, Tri, Square, Saw } from 'Assets/svg'

import './Synth.scss'

const timeFormatter = value => value < 1000 ? `${value}ms` : `${roundToPlaces(value / 1000, 1)}s`

const Synth = () => {
  const [selectedWaveform, setSelectedWaveform] = useState('sine')

  const waveformClick = type => () => {
    Audio.setOscType(type)
    setSelectedWaveform(type)
  }

  return (
    <div className="synth">
      <div className="synth__osc">

        <Knob
          label="Volume"
          min={0}
          max={100}
          places={0}
          initialValue={30}
          suffix="%"
          onChange={ value => Audio.setLevel(value / 100) }
        />

        <Knob
          label="Attack"
          min={0}
          max={30000}
          initialValue={0.5}
          logScaling={10}
          format={ timeFormatter }
          onChange={ value => Audio.setAdsr({ attack: value / 1000 }) }
        />

        <Knob
          label="Decay"
          min={0}
          max={30000}
          initialValue={1000}
          logScaling={10}
          format={ timeFormatter }
          onChange={ value => Audio.setAdsr({ decay: value / 1000 }) }
        />

        <Knob
          label="Sustain"
          min={-80}
          max={0}
          initialValue={0}
          logScaling={-10}
          suffix="db"
          onChange={ value => Audio.setAdsr({ sustain: value }) }
        />

        <Knob
          label="Release"
          min={0}
          max={30000}
          initialValue={15}
          logScaling={10}
          format={ timeFormatter }
          onChange={ value => Audio.setAdsr({ release: value / 1000 }) } />

        <div>
          <Sine
            className={ classNames('waveform-svg', selectedWaveform === 'sine' && 'selected') }
            onClick={ waveformClick('sine') }
            animate={ selectedWaveform === 'sine'}
          />
          <br />
          <Saw
            className={ classNames('waveform-svg', selectedWaveform === 'sawtooth' && 'selected') }
            onClick={ waveformClick('sawtooth') }
            animate={ selectedWaveform === 'sawtooth'}
          />
          <br />
          <Square
            className={ classNames('waveform-svg', selectedWaveform === 'square' && 'selected') }
            onClick={ waveformClick('square') }
            animate={ selectedWaveform === 'square'}
          />
          <br />
          <Tri
            className={ classNames('waveform-svg', selectedWaveform === 'triangle' && 'selected') }
            onClick={ waveformClick('triangle') }
            animate={ selectedWaveform === 'triangle'}
          />
        </div>
      </div>

      <Keyboard />
    </div>
  )
}

export default Synth
