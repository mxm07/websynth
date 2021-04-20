import React, { useState } from 'react'

const Saw = ({ 
  animate = false, 
  animateOnHover = true,
  width = 20, 
  height = 10,
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
        <path id="saw" fill="transparent" stroke='white' strokeWidth={ 20 }
            d="M -100 90
            L 100 10 L 100 90
            L 300 10 L 300 90
            L 500 10 L 500 90" />
      </defs>

      <use xlinkHref="#saw" x="0" y="0">
        { (animate || animating) && 
          <animate attributeName="x" from="0" to="-200" dur="2s" repeatCount="indefinite" /> 
        }
      </use>
    </svg>

  )
}

export default Saw
