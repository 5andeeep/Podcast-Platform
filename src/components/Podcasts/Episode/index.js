import "./style.css";
import React from 'react'
import { FaPlay } from "react-icons/fa";

const EpisodeDetails = ({index, title, description, audioFile, onClick}) => {
  return (
    <div className="episode-wrapper">
        <h4 className="episode-title">{index}. {title}</h4>
        <p className="description">{description}</p>
        <button className="play-btn" onClick={() => onClick(audioFile)}>Play <span><FaPlay/></span></button>
    </div>
  )
}

export default EpisodeDetails;