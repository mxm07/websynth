import React, { useCallback, useEffect, useRef } from 'react'
import Audio from 'Audio'
import './Visualizer.scss'

const Visualizer = () => {
  const canvasRef = useRef(null)

  const drawVisualization = useCallback((ctx, analyser, dataArray, oscilloscope = false) => {
    if (oscilloscope) {
      analyser.getByteTimeDomainData(dataArray)
    } else {
      analyser.getByteFrequencyData(dataArray)
    }

    const WIDTH = ctx.canvas.width
    const HEIGHT = ctx.canvas.height
    const bufferLength = analyser.frequencyBinCount
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    let barWidth = WIDTH / bufferLength
    let barHeight
    let curX = 0

    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 0.5

      const x = curX
      const y = HEIGHT - barHeight * 0.5

      ctx.lineTo(x, y - 1)

      curX += barWidth * 3 + 1
    }

    ctx.strokeStyle = '#87e1ed'
    ctx.stroke()

  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    const computedStyle = window.getComputedStyle(canvas)
    canvas.width = parseInt(computedStyle.width, 10)
    canvas.height = parseInt(computedStyle.height, 10)

    const canvasCtx = canvas.getContext('2d')

    const analyser = Audio.analyser
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    let animationFrameId

    const render = () => {
      drawVisualization(canvasCtx, analyser, dataArray)
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => { window.cancelAnimationFrame(animationFrameId) }
  }, [drawVisualization])


  return (
    <canvas ref={ canvasRef } className="visualizer" />
  )
}

export default Visualizer
