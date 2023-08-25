import './style.css'
import React from 'react'

const ButtonComponent = ({text, onClick, disabled}) => {
  return (
    <button onClick={onClick} className='custom-btn' disabled={disabled}>{text}</button>
  )
}

export default ButtonComponent