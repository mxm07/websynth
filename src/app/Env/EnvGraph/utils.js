export const MAX_RANGE = 3200

export const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

export const isValue = value => value !== null && value !== undefined

export const adsrToCoordinates = ({ attack, decay, sustain, release }, width, height) => {
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

export const coordinatesToAdsr = ({
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

