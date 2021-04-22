import React, { useEffect, useState } from 'react'
import Audio from 'Audio'

import './Keyboard.scss'

const getKeyIndex = (key, isWhite) => {
  if (isWhite) {
    return key <= 2 ? key * 2 : key * 2 - 1
  }

  return key <= 1 ? key * 2 + 1 : key * 2 + 2
}

const Keyboard = ({ octaves = 6, octaveOffset = 3 }) => {
  const [mouseDown, setMouseDown] = useState(false)

  const keyPressed = (octave, key) => {
    Audio.startOscillator((octaveOffset + octave) * 12 + key)
  }

  const keyUnpressed = (octave, key, isWhite) => {
    const keyIndex = getKeyIndex(key, isWhite)
    Audio.stopOscillator((octaveOffset + octave) * 12 + keyIndex)

    setMouseDown(false)
  }

  const keyEntered = (octave, key, isWhite) => {
    if (!mouseDown) return

    keyPressed(octave, getKeyIndex(key, isWhite))
  }

  const keyOut = (octave, key, isWhite) => {
    if (!mouseDown) return

    const keyIndex = getKeyIndex(key, isWhite)
    Audio.stopOscillator((octaveOffset + octave) * 12 + keyIndex)
    keyPressed(octave, keyIndex)
  }

  useEffect(() => {
    const mouseDownCallback = () => setMouseDown(true)
    const mouseUpCallback = () => setMouseDown(false)

    document.querySelector('body').addEventListener('mousedown', mouseDownCallback)
    document.querySelector('body').addEventListener('mouseup', mouseUpCallback)

    return () => {
      document.querySelector('body').removeEventListener('mousedown', mouseDownCallback)
      document.querySelector('body').addEventListener('mouseup', mouseUpCallback)
    }
  }, [])


  return (
    <div className="keyboard">
      { [...Array(octaves)].map((_, octave) => (
        <div className="keyboard__octave" key={ octave }>
          <div className="keyboard__key-group--white">
            { [...Array(7)].map((_, key) => (
              <div
                key={ key }
                className="keyboard__key--white"
                onMouseDown={ () => keyPressed(octave, getKeyIndex(key, true)) }
                onMouseUp={ () => keyUnpressed(octave, key, true) }
                onMouseEnter={ () => keyEntered(octave, key, true) }
                onMouseOut={ () => keyOut(octave, key, true) }
              />
            )) }
          </div>

          <div className="keyboard__key-group--black">
            { [...Array(5)].map((_, key) => (
              <div
                key={ key }
                className="keyboard__key--black"
                onMouseDown={ () => keyPressed(octave, getKeyIndex(key, false)) }
                onMouseUp={ () => keyUnpressed(octave, key, false) }
                onMouseEnter={ () => keyEntered(octave, key, false) }
                onMouseOut={ () => keyOut(octave, key, false) }
              />
            )) }
          </div>
        </div>
      )) }
    </div>
  )
}

export default Keyboard

