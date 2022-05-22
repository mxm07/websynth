import { useState } from 'react'
import classNames from 'classnames'
import { Sine, Tri, Square, Saw } from 'Assets/svg'
import './WaveformSelect.scss'

const WaveformSelect = ({ osc, index }) => {
  const [selectedWaveform, setSelectedWaveform] = useState('sine')

  const waveformClick = type => () => {
    setSelectedWaveform(type)
    osc.setType(type)
  }

  return (
    <div className="osc__waveforms">
      <Sine
        className={ classNames('waveform-svg', selectedWaveform === 'sine' && 'selected') }
        onClick={ waveformClick('sine') }
        animate={ selectedWaveform === 'sine' }
        index={ index }
      />
      <Saw
        className={ classNames('waveform-svg', selectedWaveform === 'sawtooth' && 'selected') }
        onClick={ waveformClick('sawtooth') }
        animate={ selectedWaveform === 'sawtooth' }
        index={ index }
      />
      <Square
        className={ classNames('waveform-svg', selectedWaveform === 'square' && 'selected') }
        onClick={ waveformClick('square') }
        animate={ selectedWaveform === 'square' }
        index={ index }
      />
      <Tri
        className={ classNames('waveform-svg', selectedWaveform === 'triangle' && 'selected') }
        onClick={ waveformClick('triangle') }
        animate={ selectedWaveform === 'triangle' }
        index={ index }
      />
    </div>
  )
}

export default WaveformSelect
