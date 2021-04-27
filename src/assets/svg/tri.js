import React, { useState } from 'react'

const Tri = ({
  animate = false,
  animateOnHover = true,
  width = 20,
  height = 10,
  index = 0,
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
        <path id={`tri${index}`} fill="transparent" strokeWidth={ 20 }
              d="M0 60
                L60 10 L 160 90
                L 260 10 L 360 90
                L 460 10 L 560 90" />
      </defs>
        <use xlinkHref={`#tri${index}`} x="0" y="0">
          { (animate || animating) &&
            <animate attributeName="x" from="0" to="-200" dur="2s" repeatCount="indefinite" />
          }
        </use>

    </svg>

  )
}

export default Tri
