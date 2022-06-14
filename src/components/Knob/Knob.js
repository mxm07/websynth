import { useState, useEffect } from 'react'
import classNames from 'classnames'
import { logToReal, realToLog } from 'Utils'

import './Knob.scss'

const body = document.querySelector('body')
const DRAG_RANGE = 200

const clamp = value => Math.max(Math.min(value, 1), 0)

const Knob = ({
  className = '',
  label = '',
  min = 0,
  max = 100,
  initialValue = min,
  places = 1,
  suffix = '',
  format = v => v,
  logScaling = 0,
  onChange = () => {}
}) => {
  const [mouseDown, setMouseDown] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 })
  const [preDragPos, setPreDragPos] = useState({ x: -1, y: -1 })
  const [preDragValue, setPreDragValue] = useState(0)
  const [knobValue, setKnobValue] = useState(0)

  const onMouseDown = () => {
    setMouseDown(true)
    setPreDragPos(mousePos)
    setPreDragValue(knobValue)
  }

  const onMouseUp = () => {
    setMouseDown(false)
    setPreDragPos({ x: -1, y: -1 })
  }

  const onMouseMove = ({ clientX: x, clientY: y }) => {
    setMousePos({ x, y })
  }
  const onTouchMove = ({ touches }) => {
    const [x, y] = [touches[0].clientX, touches[0].clientY]
    setMousePos({ x, y })
  }

  const onWheel = ({ deltaY }) => {
    const delta = -deltaY / 10000 // 0.01 or -0.01
    const newValue = clamp(knobValue + delta)

    setKnobValue(newValue)
  }

  useEffect(() => {
    body.addEventListener('mouseup', onMouseUp)
    body.addEventListener('touchup', onMouseUp)

    return () => {
      body.removeEventListener('mouseup', onMouseUp)
      body.removeEventListener('touchup', onMouseUp)
    }
  }, [])

  useEffect(() => {
    body.addEventListener('mousemove', onMouseMove)
    body.addEventListener('touchmove', onTouchMove)

    return () => {
      body.removeEventListener('mousemove', onMouseMove)
      body.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  useEffect(() => {
    if (mouseDown) {
      // Manhattan distance between current cursor pos and pre cursor pos
      const xdiff = mousePos.x - preDragPos.x
      const ydiff = mousePos.y - preDragPos.y
      let delta = xdiff - ydiff

      // Scale to drag range, and normalize between 0 and 1
      const newValue = clamp(preDragValue + delta / DRAG_RANGE)

      setKnobValue(newValue)
      onChange(logToReal(newValue, logScaling, min, max).toFixed(places))
    }
  }, [
    mousePos,
    mouseDown,
    preDragPos.x,
    preDragPos.y,
    preDragValue,
    places,
    onChange,
    knobValue,
    logScaling,
    min,
    max
  ])

  useEffect(() => {
    setKnobValue(realToLog(initialValue, logScaling, min, max))
  }, [initialValue, logScaling, min, max])


  const degreeRotation = 45 + 270 * knobValue
  const realValue = logToReal(knobValue, logScaling, min, max).toFixed(places)

  return (
    <div className="knob-wrapper">
      <div
        className={ classNames('knob', className) }
        onMouseDown={ onMouseDown }
        onTouchStart={ onMouseDown }
        onWheel={ onWheel }
      >
        <div className="knob__marker" style={{ transform: `translateX(-50%) rotate(${degreeRotation}deg)` }} />
        <div className="knob__value">
          { `${format(`${realValue}${suffix}`)}` }
        </div>
      </div>
      { label &&
        <label className="knob-wrapper__label">{ label }</label>
      }
    </div>
  )
}

export default Knob
