import React, { useEffect, useState, useRef } from 'react'
import { KEYBOARD_MAP } from 'Constants'
import { keyToNoteString } from 'Utils'
import Audio from 'Audio'

import './Keyboard.scss'


const body = document.querySelector('body')

const getKeyIndex = (key, isWhite) => {
  if (isWhite) {
    return key <= 2 ? key * 2 : key * 2 - 1
  }

  return key <= 1 ? key * 2 + 1 : key * 2 + 2
}

// used in a window listener side-effect so keep outside of state
let keysDown = []

const Keyboard = ({ octaves = 11, octaveOffset = 4 }) => {
  const keyRefs = useRef({})
  const keyboardRef = useRef()
  const [mouseDown, setMouseDown] = useState(false)



  const keyPressed = (octave, key, isWhite) => {
    console.log('KEY PRESSED')
    const keyIndex = getKeyIndex(key, isWhite)
    Audio.startOscillator(octave * 12 + keyIndex)
  }

  const keyUnpressed = (octave, key, isWhite) => {
    const keyIndex = getKeyIndex(key, isWhite)
    Audio.stopOscillator(octave * 12 + keyIndex)

    setMouseDown(false)
  }

  const keyEntered = (octave, key, isWhite) => {
    if (!mouseDown) return

    keyPressed(octave, key, isWhite)
  }

  const keyOut = (octave, key, isWhite) => {
    if (!mouseDown) return

    const keyIndex = getKeyIndex(key, isWhite)
    Audio.stopOscillator(octave * 12 + keyIndex)
  }



  useEffect(() => {
    const mouseDownCallback = () => setMouseDown(true)
    const mouseUpCallback = () => setMouseDown(false)
    const keyboardDownCallback = e => {
      const key = KEYBOARD_MAP.indexOf(e.key)

      if (key > -1 && keysDown.indexOf(key) === -1) {
        Audio.startOscillator(octaveOffset * 12 + key)
        keysDown.push(key)

        if (keyRefs.current && keyRefs.current[octaveOffset * 12 + key]) {
          keyRefs.current[octaveOffset * 12 + key].classList.add('active')
        }
      }
    }

    const keyboardUpCallback = e => {
      const key = KEYBOARD_MAP.indexOf(e.key)

      if (key > -1 && keysDown.indexOf(key) > -1) {
        Audio.stopOscillator(octaveOffset * 12 + key)
        keysDown.splice(keysDown.indexOf(key), 1)

        if (keyRefs.current && keyRefs.current[octaveOffset * 12 + key]) {
          keyRefs.current[octaveOffset * 12 + key].classList.remove('active')
        }
      }
    }

    body.addEventListener('mousedown', mouseDownCallback)
    body.addEventListener('mouseup', mouseUpCallback)
    body.addEventListener('keydown', keyboardDownCallback)
    body.addEventListener('keyup', keyboardUpCallback)

    return () => {
      body.removeEventListener('mousedown', mouseDownCallback)
      body.removeEventListener('mouseup', mouseUpCallback)
      body.removeEventListener('keydown', keyboardDownCallback)
      body.removeEventListener('keyup', keyboardUpCallback)
    }
  }, [octaveOffset])


  useEffect(() => {
    if (keyboardRef.current) {
      const scrollHorizontal = e => {
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        keyboardRef.current.scrollLeft -= (delta * 40); // Multiplied by 40
        e.preventDefault()
      }

      body.addEventListener('mousewheel', scrollHorizontal)

      return () => body.removeEventListener('mousewheel', scrollHorizontal)
    }
  }, [keyboardRef])



  return (
    <div className="keyboard" ref={ keyboardRef }>
      { [...Array(octaves)].map((_, octave) => (
        <div className="keyboard__octave" key={ octave }>
          <div className="keyboard__key-group--white">
            { [...Array(7)].map((_, key) => (
              <div
                key={ key }
                ref={ ref => keyRefs.current[octave * 12 + getKeyIndex(key, true)] = ref }
                className="keyboard__key--white"
                onMouseDown={ () => keyPressed(octave, key, true) }
                onMouseUp={ () => keyUnpressed(octave, key, true) }
                onMouseEnter={ () => keyEntered(octave, key, true) }
                onMouseOut={ () => keyOut(octave, key, true) }
              >
                { key === 0 &&
                  <div className="keyboard__key__label">
                    { keyToNoteString(octave * 12 + key) }
                  </div>
                }
              </div>
            )) }
          </div>

          <div className="keyboard__key-group--black">
            { [...Array(5)].map((_, key) => (
              <div
                key={ key }
                ref={ ref => keyRefs.current[octave * 12 + getKeyIndex(key, false)] = ref }
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
