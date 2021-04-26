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

    ctx.lineWidth = 1
    ctx.beginPath()

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 0.5

      const x = curX
      const y = HEIGHT - barHeight * 0.5

      ctx.lineTo(x, y)

      curX += barWidth + 1
    }

    ctx.strokeStyle = '#87e1ed'
    ctx.stroke()

  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width  = 400;
    canvas.height = 100;
    canvas.style.width  = '400px';
    canvas.style.height = '100px';

    const canvasCtx = canvas.getContext('2d')
    canvasCtx.imageSmoothingEnabled = true;

    const analyser = Audio.getAnalyser()
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
