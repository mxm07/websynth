import { Circle, Layer, Line, Stage } from 'react-konva'

import './EnvEditor.scss'


const MAX_RANGE = 3200

const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

const isValue = value => value !== null && value !== undefined

const adsrToCoordinates = ({ attack, decay, sustain, release }, width, height) => {
  let attackPos, decaySustainPos, releasePos


  if (isValue(attack)) {
    attackPos = {
      x: (attack / MAX_RANGE) * width,
      y: 0
    }

    if (isValue(decay) && isValue(sustain)) {
      decaySustainPos = {
        x: ((attack + decay) / MAX_RANGE) * width,
        y: (1 - sustain) * height
      }

      if (isValue(release)) {
        releasePos = {
          x: ((attack + decay + release) / MAX_RANGE) * width,
          y: height
        }
      }
    }
  }

  return {
    ...(attackPos ? { attack: attackPos } : {}),
    ...(decaySustainPos ? { decaySustain: decaySustainPos } : {}),
    ...(releasePos ? { release: releasePos } : {}),
  }
}

const coordinatesToAdsr = ({
  attack: {
    x: attackX
  },
  decaySustain: {
    x: decaySustainX,
    y: decaySustainY
  },
  release: {
    x: releaseX
  }
}, width, height) => ({
  attack: (attackX / width) * MAX_RANGE,
  decay: ((decaySustainX - attackX) / width) * MAX_RANGE,
  sustain: 1 - (decaySustainY / height),
  release: ((releaseX - decaySustainX) / width) * MAX_RANGE
})


const EnvEditor = ({
  width = 200,
  height = 100,
  controlRadius = 5,
  adsr,
  handleAdsrChange
}) => {
  const { attack, decaySustain, release } = adsrToCoordinates(adsr, width, height)

  return (
    <div className="env-editor" style={{ width, height }}>
      <Stage width={ width } height={ height }>
        <Layer>
          <Line
            points={[
              0, height,
              attack.x, attack.y,
              decaySustain.x, decaySustain.y,
              release.x, release.y
            ]}
            fill='#87e1ed'
            closed
          />

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

export default EnvEditor
