import React, { useEffect, useState } from 'react'
import { Knob, Button } from 'Components'
import Audio from 'Audio'
import Keyboard from '../Keyboard'
import { Sine, Tri, Square, Saw } from 'Assets/svg'

import './Synth.scss'

const startAudio = () => Audio.startOscillator()
const stopAudio = () => Audio.stopOscillator()

const Synth = () => {
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    Audio.setGain(volume)
  }, [volume])

  return (
    <div className="synth">
      <div className="synth__osc">
        <Button onClick={ startAudio }>Play</Button>
        <Button onClick={ stopAudio }>Stop</Button>

        <Knob label="Volume" min={ -3.4 } max={ 3.4 } onChange={ setVolume } />

        <div>
          <Sine />
          <br />
          <Saw />
          <br />
          <Square />
          <br />
          <Tri />
        </div>
      </div>
      <Keyboard />
    </div>
  )
}

export default Synth
