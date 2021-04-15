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
  places = 1,
  onChange = () => {}
}) => {
  const [mouseDown, setMouseDown] = useState(false)
  const [mousePos, setMousePos] = useState({ x: -1, y: -1 })
  const [initialDragPos, setInitialDragPos] = useState({ x: -1, y: -1 })
  const [initialValue, setInitialValue] = useState(0)
  const [knobValue, setKnobValue] = useState(0)


  const onMouseDown = () => { 
    setMouseDown(true)
    setInitialDragPos(mousePos)
    setInitialValue(knobValue)
  }
  
  const onMouseUp = () => { 
    setMouseDown(false) 
    setInitialDragPos({ x: -1, y: -1 })
  }
  
  const onMouseMove = ({ clientX, clientY }) => { setMousePos({ x: clientX, y: clientY }) }

  const onWheel = ({ deltaY }) => {
    const realValue = calculateRealValue(knobValue) + (-deltaY / 1000)
    const newValue = clamp((realValue - min) / (max - min))

    setKnobValue(newValue)
  }

  const calculateRealValue = useCallback(value => {
    const val = min + (value * (max - min))
    return Math.round((val +  Number.EPSILON) * Math.pow(10, places)) / Math.pow(10, places)
  }, [max, min, places])


  useEffect(() => {
    body.addEventListener('mouseup', onMouseUp)

    return () => body.removeEventListener('mouseup', onMouseUp)
  }, [])
 
  useEffect(() => {
    body.addEventListener('mousemove', onMouseMove)

    return () => body.removeEventListener('mousemove', onMouseMove)
  }, [])

  useEffect(() => {
    if (mouseDown) {
      // Manhattan distance between current cursor pos and initial cursor pos
      const xdiff = mousePos.x - initialDragPos.x
      const ydiff = mousePos.y - initialDragPos.y
      let delta = xdiff - ydiff

      // Scale to drag range, and normalize between 0 and 1
      const newValue = clamp(initialValue + delta / DRAG_RANGE)
      
      setKnobValue(newValue)
      onChange(calculateRealValue(newValue))
    }
  }, [
    mousePos, 
    mouseDown, 
    initialDragPos.x,
    initialDragPos.y,
    initialValue,
    calculateRealValue,
    onChange
  ])



  const degreeRotation = 45 + 270 * knobValue
  
  return (
    <div className="knob-wrapper">
      <div 
        className={ classNames('knob', className) }
        onMouseDown={ onMouseDown }
        onWheel={ onWheel }
      >
        <div className="knob__marker" style={{ transform: `translateX(-50%) rotate(${degreeRotation}deg)` }} />
        <div className="knob__value">
          { calculateRealValue(knobValue) }
        </div>
      </div>
      { label &&
        <label className="knob-wrapper__label">{ label }</label> 
      }
    </div>
  )
}

export default Knob
