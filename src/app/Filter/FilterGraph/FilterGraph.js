import { Shape, Layer, Line, Stage } from 'react-konva'
import { realToLog } from 'Utils'
import './FilterGraph.scss'

const B_VAL = 0.5

const responseFunction = (x, z, w, h, a, b) => {
  const c = 4 / (2 ** Math.log2(w))
  const o = c * x - a
  const num = o ** 4
  const denom = 1 + (2 * z * o) + num
  const ans = h * ((num / denom) - b)

  // console.log(c, o, num, denom, ans)
  return ans
}

const responseDerivativeFunction = (x, zeta, w, h, a, b) => {
  const num = 8 * w * h * (a * w - 4 * x) * (w * (a * zeta - 1) - 4 * x * zeta)
  const denom = ((w ** 2 * (a ** 2 - 2 * a * zeta + 1)) + 8 * w * x * (zeta - a) + 16 * (x ** 2)) ** 2

  return num / denom
}

const filterSceneFunc = (cutoff, width, height, res) => (ctx, shape) => {
  const relativeCutoff = realToLog(cutoff, 10, 8, 22050) * 6

  ctx.beginPath()
  ctx.moveTo(-relativeCutoff, 0)

  const step = width / 100
  const zeta = res * 0.75

  for (let i = 0; i < width ; i += step) {
    const y = responseFunction(i, zeta, width, height * 0.5, relativeCutoff, B_VAL)

    ctx.lineTo(i, height - y)
    if (y < 0) break
  }

  ctx.lineTo(width, height)
  ctx.lineTo(0, height)
  ctx.lineTo(0, 0)

  ctx.fillStyle = "#87e1ed"
  ctx.fill()
}

const FilterGraph = ({
  width = 200,
  height = 100,
  type = 'lowpass',
  cutoff,
  res
}) => {
  const points = []

  console.log()
  return (
    <div className="filter-graph" style={{ width, height }}>
      <Stage width={ width } height={ height }>
        <Layer>
          <Line points={ points } />

          <Shape
            strokeWidth={ 2 }
            stroke="#87e1ed"
            sceneFunc={ filterSceneFunc(cutoff, width, height, res) }
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default FilterGraph
