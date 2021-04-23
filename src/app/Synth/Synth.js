import React, { useState } from 'react'
import classNames from 'classnames'
import { Knob } from 'Components'
import Audio from 'Audio'
import Keyboard from '../Keyboard'
import { Sine, Tri, Square, Saw } from 'Assets/svg'

import './Synth.scss'

const Synth = () => {
  const [selectedWaveform, setSelectedWaveform] = useState('sine')

  const waveformClick = type => () => {
    Audio.setOscType(type)
    setSelectedWaveform(type)
  }

  return (
    <div className="synth">
      <div className="synth__osc">

        <Knob label="Volume" min={0} max={3.4} onChange={ Audio.setGain } />
        <Knob label="Attack" min={0} max={5} suffix="s" onChange={ value => Audio.setAdsr({ attack: value }) } />
        <Knob label="Decay" min={0} max={100} suffix="ms" />
        <Knob label="Sustain" min={0} max={100} suffix="ms" />
        <Knob label="Release" min={0} max={5} suffix="s" onChange={ value => Audio.setAdsr({ release: value }) } />

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
