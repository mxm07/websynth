import React, { useEffect, useState, useRef } from 'react'
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


const Keyboard = ({ octaves = 6, octaveOffset = 4 }) => {
  const keyRefs = useRef({})
  const [mouseDown, setMouseDown] = useState(false)


  const keyPressed = (octave, key, isWhite) => {
    const keyIndex = getKeyIndex(key, isWhite)
    Audio.startOscillator((octaveOffset + octave) * 12 + keyIndex)
  }

  const keyUnpressed = (octave, key, isWhite) => {
    const keyIndex = getKeyIndex(key, isWhite)
    Audio.stopOscillator((octaveOffset + octave) * 12 + keyIndex)

    setMouseDown(false)
  }

  const keyEntered = (octave, key, isWhite) => {
    if (!mouseDown) return

    keyPressed(octave, key, isWhite)
  }

  const keyOut = (octave, key, isWhite) => {
    if (!mouseDown) return

    const keyIndex = getKeyIndex(key, isWhite)
    Audio.stopOscillator((octaveOffset + octave) * 12 + keyIndex)
  }

  useEffect(() => {
    const mouseDownCallback = () => setMouseDown(true)
    const mouseUpCallback = () => setMouseDown(false)
    const keyboardDownCallback = e => {
      const key = keyboardMap.indexOf(e.key)

      if (key > -1) {
        Audio.startOscillator(octaveOffset * 12 + key)
        keyRefs.current[octaveOffset * 12 + key].classList.add('active')
      }
    }

    const keyboardUpCallback = e =>{
      const key = keyboardMap.indexOf(e.key)

      if (key > -1) {
        Audio.stopOscillator(octaveOffset * 12 + key)
        keyRefs.current[octaveOffset * 12 + key].classList.remove('active')
      }
    }

    const visibilityChange = e => { console.log('VISIBILITY CHANGE', e) }

    body.addEventListener('mousedown', mouseDownCallback)
    body.addEventListener('mouseup', mouseUpCallback)
    body.addEventListener('keydown', keyboardDownCallback)
    body.addEventListener('keyup', keyboardUpCallback)

    body.addEventListener('blur', visibilityChange)

    return () => {
      body.removeEventListener('mousedown', mouseDownCallback)
      body.addEventListener('mouseup', mouseUpCallback)
      body.addEventListener('keydown', keyboardDownCallback)
      body.addEventListener('keyup', keyboardUpCallback)
      body.removeEventListener('blur', visibilityChange)
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
                ref={ ref => keyRefs.current[(octave + octaveOffset) * 12 + getKeyIndex(key, true)] = ref }
                className="keyboard__key--white"
                onMouseDown={ () => keyPressed(octave, key, true) }
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
                ref={ ref => keyRefs.current[(octave + octaveOffset) * 12 + getKeyIndex(key, false)] = ref }
                className="keyboard__key--black"
                onMouseDown={ () => keyPressed(octave, key, false) }
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

