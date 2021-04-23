import React, { useEffect, useState } from 'react'
import { keyboardMap } from 'Utils'
import Audio from 'Audio'

import './Keyboard.scss'

const body = document.querySelector('body')



const getKeyIndex = (key, isWhite) => {
  if (isWhite) {
    return key <= 2 ? key * 2 : key * 2 - 1
  }

  return key <= 1 ? key * 2 + 1 : key * 2 + 2
}

const keyPressed = (octave, octaveOffset, key) => {
  Audio.startOscillator((octaveOffset + octave) * 12 + key)
}

const keyUnpressed = (octave, octaveOffset, key, isWhite, setMouseDown) => {
  const keyIndex = getKeyIndex(key, isWhite)
  Audio.stopOscillator((octaveOffset + octave) * 12 + keyIndex)

  setMouseDown(false)
}

const keyEntered = (octave, octaveOffset, key, isWhite, mouseDown) => {
  if (!mouseDown) return

  keyPressed(octave, octaveOffset, getKeyIndex(key, isWhite))
}

const keyOut = (octave, octaveOffset, key, isWhite, mouseDown) => {
  if (!mouseDown) return

  const keyIndex = getKeyIndex(key, isWhite)
  Audio.stopOscillator((octaveOffset + octave) * 12 + keyIndex)
}

const keyboardDown = (e, octaveOffset) => {
  const key = keyboardMap.indexOf(e.key)

  if (key > -1) {
    Audio.startOscillator(octaveOffset * 12 + key)
  }
}

const keyboardUp = (e, octaveOffset) => {
  const key = keyboardMap.indexOf(e.key)

  if (key > -1) {
    Audio.stopOscillator(octaveOffset * 12 + key)
  }
}



const Keyboard = ({ octaves = 6, octaveOffset = 4 }) => {
  const [mouseDown, setMouseDown] = useState(false)

  useEffect(() => {
    const mouseDownCallback = () => setMouseDown(true)
    const mouseUpCallback = () => setMouseDown(false)
    const keyboardDownCallback = e => keyboardDown(e, octaveOffset)
    const keyboardUpCallback = e => keyboardUp(e, octaveOffset)

    body.addEventListener('mousedown', mouseDownCallback)
    body.addEventListener('mouseup', mouseUpCallback)
    body.addEventListener('keydown', keyboardDownCallback)
    body.addEventListener('keyup', keyboardUpCallback)

    return () => {
      body.removeEventListener('mousedown', mouseDownCallback)
      body.addEventListener('mouseup', mouseUpCallback)
      body.addEventListener('keydown', keyboardDownCallback)
      body.addEventListener('keyup', keyboardUpCallback)

    }
  }, [octaveOffset])


  return (
    <div className="keyboard">
      { [...Array(octaves)].map((_, octave) => (
        <div className="keyboard__octave" key={ octave }>
          <div className="keyboard__key-group--white">
            { [...Array(7)].map((_, key) => (
              <div
                key={ key }
                className="keyboard__key--white"
                onMouseDown={ () => keyPressed(octave, octaveOffset, getKeyIndex(key, true)) }
                onMouseUp={ () => keyUnpressed(octave, octaveOffset, key, true, setMouseDown) }
                onMouseEnter={ () => keyEntered(octave, octaveOffset, key, true, mouseDown) }
                onMouseOut={ () => keyOut(octave, octaveOffset, key, true, mouseDown ) }
              />
            )) }
          </div>

          <div className="keyboard__key-group--black">
            { [...Array(5)].map((_, key) => (
              <div
                key={ key }
                className="keyboard__key--black"
                onMouseDown={ () => keyPressed(octave, octaveOffset, getKeyIndex(key, false)) }
                onMouseUp={ () => keyUnpressed(octave, octaveOffset, key, false, setMouseDown) }
                onMouseEnter={ () => keyEntered(octave, octaveOffset, key, false, mouseDown) }
                onMouseOut={ () => keyOut(octave, octaveOffset, key, false, mouseDown) }
              />
            )) }
          </div>
        </div>
      )) }
    </div>
  )
}

export default Keyboard

