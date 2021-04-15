import React, { useState } from 'react'

const Sine = ({
  animate = false,
  animateOnHover = true,
  width = 20, 
  height = 10,
  stroke = 'white', 
  strokeWidth = 20, 
  ...rest 
}) => {
  const [animating, setAnimating] = useState(false)
  
  return (
    <svg 
      width={ width } 
      height={ height } 
      viewBox="0 0 200 100" 
      onMouseOver={ () => animateOnHover && setAnimating(true) } 
      onMouseOut={ () => animateOnHover && setAnimating(false) }
      { ...rest }
    >
      <defs>
        <path id="sine" fill="transparent" stroke={ stroke } strokeWidth={ strokeWidth }
              d="M0 50
                C 40 10, 60 10, 100 50 C 140 90, 160 90, 200 50
                C 240 10, 260 10, 300 50 C 340 90, 360 90, 400 50" />
      </defs>

      <use xlinkHref="#sine" x="0" y="0">
        { (animate || animating) && 
          <animate attributeName="x" from="0" to="-200" dur="3s" repeatCount="indefinite" /> 
        }
      </use>
    </svg>

  )
}

export default Sine
