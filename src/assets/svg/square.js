import React, { useState } from 'react'

const Square = ({ 
  animate = false,
  animateOnHover = true,
  width = 20, 
  height = 10,
  stroke = 'white', 
  strokeWidth='20', 
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
        <path id="square" fill="transparent" stroke={ stroke } strokeWidth={ strokeWidth }
              d="M0 10
                L60 10 L 60 90
                L 160 90 L 160 10
                L 260 10 L 260 90
                L 360 90 L 360 10
                L 460 10 L 460 90"
              />
      </defs>
        <use xlinkHref="#square" x="0" y="0">
          { (animate || animating) && 
            <animate attributeName="x" from="0" to="-200" dur="3s" repeatCount="indefinite" /> 
          }       
        </use>

    </svg>
  )

}

export default Square
