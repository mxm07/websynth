import React, { useState, useEffect, useCallback } from 'react'
import classNames from 'classnames'
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


  // takes a value between 0 and 1, scales to be between min and max (scales logarithmically if 'logScaling' is set)
  const calculateRealValue = useCallback(value => {
    let val

    if (logScaling === 0) {
      val = min + (value * (max - min))
    } else if (logScaling > 0) {
      // Convert the value into a proportion of the log scale, then convert back by raising 10 to the power of it
      // Subtract one at the end to reach min
      val = min + Math.pow(logScaling, value * (Math.log(max + 1 - min) / Math.log(logScaling))) - 1
    } else {
      val = min + Math.pow(-logScaling, (1 - value) * (Math.log(max + 1 - min) / Math.log(-logScaling))) - 1
      val = max - val + min
    }

    return val.toFixed(places)
  }, [max, min, places, logScaling])

  // opposite of calculateRealValue, takes a scaled value and returns a value between 0 and 1
  const calculateKnobValue = useCallback(value => {
    if (logScaling === 0) {
      return (value - min) / (max - min)
    } else if (logScaling > 0) {
      return Math.log(value - min + 1) / Math.log(max - min + 1)
    } else {
      return Math.log((1 - value) - min + 1) / Math.log(max - min + 1)
    }
  }, [min, max, logScaling])


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

  const onWheel = ({ deltaY }) => {
    const delta = -deltaY / 1000
    const realValue = calculateRealValue(knobValue) + delta
    const newValue = clamp((realValue - min) / (max - min))

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
    body.addEventListener('touchmove', onMouseMove)

    return () => {
      body.removeEventListener('mousemove', onMouseMove)
      body.removeEventListener('touchmove', onMouseMove)
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
    }
  }, [
    mousePos,
    mouseDown,
    preDragPos.x,
    preDragPos.y,
    preDragValue,
    calculateRealValue,
    onChange
  ])

  useEffect(() => {
    onChange(calculateRealValue(knobValue))
  }, [knobValue, calculateRealValue, onChange])

  useEffect(() => {
    setKnobValue(calculateKnobValue(initialValue))
  }, [initialValue, calculateKnobValue])


  const degreeRotation = 45 + 270 * knobValue
  const realValue = calculateRealValue(knobValue)

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
