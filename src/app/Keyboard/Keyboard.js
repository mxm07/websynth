import { useCallback, useState, useRef, useEffect } from 'react'
import { KEYBOARD_MAP } from 'Constants'
import { useEventListener, keyToNoteString, useMIDI } from 'Utils'

import './Keyboard.scss'


const body = document.querySelector('body')

const getKeyIndex = (key, isWhite) => {
  if (isWhite) {
    return key <= 2 ? key * 2 : key * 2 - 1
  }

  return key <= 1 ? key * 2 + 1 : key * 2 + 2
}

// used in a window listener side-effect so keep outside of state
const keysDown = []


const keyDownCallback = (octave, key, isWhite, onKeyDown) => {
  const keyIndex = getKeyIndex(key, isWhite)
  onKeyDown(octave * 12 + keyIndex)
}


const keyUpCallback = (octave, key, isWhite, onKeyUp) => {
  const keyIndex = getKeyIndex(key, isWhite)
  onKeyUp(octave * 12 + keyIndex)
}


const keyboardDownCallback = (keyRefs, inputOctave, onKeyDown) => e => {
  const key = KEYBOARD_MAP.indexOf(e.key)

  if (key > -1 && keysDown.indexOf(key) === -1) {
    onKeyDown(inputOctave * 12 + key)
    keysDown.push(key)

    if (keyRefs.current && keyRefs.current[inputOctave * 12 + key]) {
      keyRefs.current[inputOctave * 12 + key].classList.add('active')
    }
  }
}


const keyboardUpCallback = (keyRefs, inputOctave, onKeyUp) => e => {
  const key = KEYBOARD_MAP.indexOf(e.key)

  if (key > -1 && keysDown.indexOf(key) > -1) {
    onKeyUp(inputOctave * 12 + key)
    keysDown.splice(keysDown.indexOf(key), 1)

    if (keyRefs.current && keyRefs.current[inputOctave * 12 + key]) {
      keyRefs.current[inputOctave * 12 + key].classList.remove('active')
    }
  }
}



const Keyboard = ({ octaves = 11, onKeyDown = () => {}, onKeyUp = () => {} }) => {
  const keyRefs = useRef({})
  const keyboardRef = useRef({})

  const [mouseDown, setMouseDown] = useState(false)
  const [inputOctave] = useState(4)

  const scrollHorizontal = useCallback(e => {
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    keyboardRef.current.scrollLeft -= (delta * 40);
    e.preventDefault()
  }, [])


  const [playing, note = 0, velocity = 0] = useMIDI()


  useEffect(() => {
    if (playing) {
      onKeyDown(note)
    } else {
      onKeyUp(note)
    }
  }, [playing, note, velocity, onKeyDown, onKeyUp])

  useEventListener('mousedown', () => setMouseDown(true), body)
  useEventListener('mouseup', () => setMouseDown(false), body)
  useEventListener('keydown', keyboardDownCallback(keyRefs, inputOctave, onKeyDown), body)
  useEventListener('keyup', keyboardUpCallback(keyRefs, inputOctave, onKeyUp), body)
  useEventListener('mousewheel', scrollHorizontal, body)  /* Scrolling on mousewheel scrolls keyboard horizontally */


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
                onMouseDown={ () => keyDownCallback(octave, key, true, onKeyDown) }
                onMouseUp={ () => keyUpCallback(octave, key, true, onKeyUp) }
                onMouseEnter={ () => mouseDown && keyDownCallback(octave, key, true, onKeyDown) }
                onMouseOut={ () => mouseDown && keyUpCallback(octave, key, true, onKeyUp) }
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
                onMouseDown={ () => keyDownCallback(octave, key, false) }
                onMouseUp={ () => keyUpCallback(octave, key, false) }
                onMouseEnter={ () => mouseDown && keyDownCallback(octave, key, false) }
                onMouseOut={ () => mouseDown && keyUpCallback(octave, key, false) }
              />
            )) }
          </div>
        </div>
      )) }
    </div>
  )
}

export default Keyboard
