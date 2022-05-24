import { adsrToCoordinates, clamp, coordinatesToAdsr } from './utils'
import { Circle, Layer, Line, Stage } from 'react-konva'

import './EnvGraph.scss'

const EnvGraph = ({
  width = 200,
  height = 100,
  controlRadius = 5,
  adsr,
  handleAdsrChange
}) => {
  const { attack, decaySustain, release } = adsrToCoordinates(adsr, width, height)

  const adsrCurvePoints = [
    0, height,
    attack.x, attack.y,
    decaySustain.x, decaySustain.y,
    release.x, release.y
  ]


  return (
    <div className="env-graph" style={{ width, height }}>
      <Stage width={ width } height={ height }>
        <Layer>
          <Line points={ adsrCurvePoints } fill='#87e1ed' closed />

          <Circle
            radius={ controlRadius }
            draggable
            fill="#fff"
            onMouseEnter={ () => { document.body.style.cursor = 'e-resize' } }
            onMouseLeave={ () => { document.body.style.cursor = 'default' } }
            x={ attack.x }
            y={ attack.y }
            onDragMove={ e => {
              const newAdsr = coordinatesToAdsr({ attack: e.target.position(), decaySustain, release }, width, height)
              handleAdsrChange({ ...adsr, attack: newAdsr.attack })
            }}
            dragBoundFunc={ (pos) => ({
              x: clamp(pos.x, 0, decaySustain.x),
              y: 0
            })}
          />

          <Circle
            radius={ controlRadius }
            draggable
            fill="#fff"
            onMouseEnter={ () => { document.body.style.cursor = 'move' } }
            onMouseLeave={ () => { document.body.style.cursor = 'default' } }
            x={ decaySustain.x }
            y={ decaySustain.y }
            onDragMove={ e => {
              const newAdsr = coordinatesToAdsr({ attack, decaySustain: e.target.position(), release }, width, height)
              handleAdsrChange({ ...adsr, decay: newAdsr.decay, sustain: newAdsr.sustain })
            }}
            dragBoundFunc={ (pos) => ({
              x: clamp(pos.x, attack.x, release.x),
              y: clamp(pos.y, 0, height)
            })}
          />

          <Circle
            radius={ controlRadius }
            draggable
            fill="#fff"
            onMouseEnter={ () => { document.body.style.cursor = 'e-resize' } }
            onMouseLeave={ () => { document.body.style.cursor = 'default' } }
            x={ release.x }
            y={ release.y }
            onDragMove={ e => {
              const newAdsr = coordinatesToAdsr({ attack, decaySustain, release: e.target.position() }, width, height)
              handleAdsrChange({ ...adsr, release: newAdsr.release })
            }}
            dragBoundFunc={ (pos) => ({
              x: clamp(pos.x, decaySustain.x, width),
              y: height
            })}
          />
        </Layer>
      </Stage>
    </div>
  )
}

export default EnvGraph
