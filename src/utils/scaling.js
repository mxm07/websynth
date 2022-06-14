// takes a value between 0 and 1, scales to be between min and max (scales logarithmically if 'logScaling' is set)
export const logToReal = (value, scaling, min, max) => {
  let val

  if (scaling === 0) {
    val = min + (value * (max - min))
  } else if (scaling > 0) {
    // Convert the value into a proportion of the log scale, then convert back by raising 10 to the power of it
    // Subtract one at the end to reach min
    val = min + Math.pow(scaling, value * (Math.log(max + 1 - min) / Math.log(scaling))) - 1
  } else {
    val = min + Math.pow(-scaling, (1 - value) * (Math.log(max + 1 - min) / Math.log(-scaling))) - 1
    val = max - val + min
  }

  return val
}

  // opposite of logToReal, takes a scaled value and returns a value between 0 and 1
export const realToLog = (value, scaling, min, max) => {
  if (scaling === 0) {
    return (value - min) / (max - min)
  } else if (scaling > 0) {
    return Math.log(value - min + 1) / Math.log(max - min + 1)
  }

  return Math.log((1 - value) - min + 1) / Math.log(max - min + 1)
}
