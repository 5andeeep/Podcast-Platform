import React from 'react'
import './style.css';

const GenreButton = ({text, onClick, genre}) => {
  return (
      <p className={`animated-word ${genre==text?"active":""}`} onClick={onClick} >{text}</p>
  )
}

export default GenreButton;
