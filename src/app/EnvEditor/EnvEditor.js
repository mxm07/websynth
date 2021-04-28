import React, { useEffect, useRef } from 'react'
import './EnvEditor.scss'

const EnvEditor = () => {
  const canvasRef = useRef(null)

  const drawEnv = (ctx, w, h) => {
    const padding = 5

    ctx.lineWidth = 2
    ctx.moveTo(padding, h)

    ctx.lineTo(w * 0.25, padding)
    ctx.lineTo(w * 0.5, h * 0.5)
    ctx.lineTo(w * 0.75, h * 0.5)
    ctx.lineTo(w, h)

    ctx.fillStyle = '#555'
    ctx.fill()

    ctx.fillStyle = '#87e1ed'
    ctx.beginPath()
    ctx.arc(w * 0.25, padding, 5, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(w * 0.5, h * 0.25, 5, 0, 2 * Math.PI)
    ctx.fill()

    ctx.beginPath()
    ctx.arc(w * 0.75, h * 0.25, 5, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const computedStyle = window.getComputedStyle(canvas)
    const width = parseInt(computedStyle.width, 10)
    const height = parseInt(computedStyle.height, 10)
    canvas.width = width
    canvas.height = height
    canvas.style.width = width
    canvas.style.height = height

    const canvasCtx = canvas.getContext('2d')
    drawEnv(canvasCtx, width, height)
  })

  return (
    <canvas ref={ canvasRef } className="env-editor" />
  )
}

export default EnvEditor
