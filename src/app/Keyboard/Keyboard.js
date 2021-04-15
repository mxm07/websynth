import React, { useEffect, useState } from 'react'
import { calculateNoteFrequency } from 'Utils'
import Audio from 'Audio'

import './Keyboard.scss'

const getKeyIndex = (key, isWhite) => {
  if (isWhite) {
    return key <= 2 ? key * 2 : key * 2 - 1
  }

  return key <= 1 ? key * 2 + 1 : key * 2 + 2
}

const Keyboard = ({ octaves = 4, octaveOffset = 3 }) => {
  const [mouseDown, setMouseDown] = useState(false)

  const keyPressed = (octave, note) => {
    const freq = calculateNoteFrequency(octave, note)

    Audio.startOscillator('sine', freq)
  }

  const keyUnpressed = () => {
    Audio.stopOscillator()
    setMouseDown(false)
  }

  const keyEntered = (octave, key, isWhite) => {
    if (!mouseDown) return

    Audio.stopOscillator()
    keyPressed(octave + octaveOffset, getKeyIndex(key, isWhite))
  }


  useEffect(() => {
    const mouseDownCallback = () => setMouseDown(true)

    document.querySelector('body').addEventListener('mouseup', keyUnpressed)
    document.querySelector('body').addEventListener('mousedown', mouseDownCallback)

    return () => {
      document.querySelector('body').removeEventListener('mouseup', keyUnpressed)
      document.querySelector('body').removeEventListener('mousedown', mouseDownCallback)
    }
  }, [])


  return (
    <div className="keyboard">
      { [...Array(octaves)].map((_, octave) => (
        <div className="keyboard__octave">
          <div className="keyboard__key-group--white">
            { [...Array(7)].map((_, key) => (
              <div 
                className="keyboard__key--white"
                onMouseDown={ () => keyPressed(octave + octaveOffset, getKeyIndex(key, true)) }
                onMouseUp={ () => keyUnpressed() }
                onMouseEnter={ () => keyEntered(octave, key, true) }
              />
            )) }
          </div>

          <div className="keyboard__key-group--black">
            { [...Array(5)].map((_, key) => (
              <div 
                className="keyboard__key--black"
                onMouseDown={ () => keyPressed(octave + octaveOffset, getKeyIndex(key, false)) }
                onMouseUp={ () => keyUnpressed() }
                onMouseEnter={ () => keyEntered(octave, key, false) }
              />
            )) }
          </div>
        </div>
      )) }
    </div>
  )
}

export default Keyboard

