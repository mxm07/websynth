import { useCallback, useEffect, useRef } from 'react'
import { Analyser } from 'Utils'

import './Visualizer.scss'

const Visualizer = () => {
  const canvasRef = useRef(null)

  const drawVisualization = useCallback((ctx, analyser) => {
    const dataArray = analyser.getValue()

    const WIDTH = ctx.canvas.width
    const HEIGHT = ctx.canvas.height
    const bufferLength = 1024
    ctx.clearRect(0, 0, WIDTH, HEIGHT);

    let barWidth = WIDTH / bufferLength
    let barHeight
    let curX = 0

    ctx.lineWidth = 2
    ctx.beginPath()

    for (let i = 0; i < bufferLength; i++) {
      barHeight = dataArray[i] * 0.5

      const x = curX
      const y = (HEIGHT - (barHeight * HEIGHT)) - (HEIGHT / 2)

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

    let animationFrameId

    const render = () => {
      drawVisualization(canvasCtx, Analyser)
      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => { window.cancelAnimationFrame(animationFrameId) }
  }, [drawVisualization])


  return (
    <div className="visualizer">
      <canvas ref={ canvasRef } />
    </div>
  )
}

export default Visualizer
