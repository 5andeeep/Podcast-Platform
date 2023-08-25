import React from 'react'
import './style.css';

const GenreButton = ({text, onClick, iseSelected}) => {
  return (
      <p className= "animated-word" onClick={onClick} >{text}</p>
  )
}

export default GenreButton;
