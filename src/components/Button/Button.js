import React from 'react'
import classNames from 'classnames'
import './Button.scss'

const Button = ({ className = '', children, ...props }) => (
  <button
    className={ classNames('button', className) }
    { ...props }
  >
    { children }
  </button>
)

export default Button
