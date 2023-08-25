import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
// import {FaPlay} from "react-icons/fa";
import { CiPlay1 } from "react-icons/ci";

const PodcastCard = ({ title, displayImage, id }) => {
  return (
    <Link to={`/podcast/${id}`}>
      <div className="podcast-card">
        <div className="image-div">
            <img className="display-image-podcast" src={displayImage} alt="displayImage" />
        </div>
        <div className="title-play-btn">
          <p className="title-podcast">{title}</p>
          <span><CiPlay1 /></span>
        </div>
      </div>
    </Link>
  );
};

export default PodcastCard;
