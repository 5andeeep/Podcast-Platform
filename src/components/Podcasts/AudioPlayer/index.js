import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute } from "react-icons/fa";

const AudioPlayer = ({ audioSrc, image }) => {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMute, setIsMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(1);

  const handleDuration = (e) => {
    setCurrentTime(e.target.value);
    audioRef.current.currentTime = e.target.value;
  };

  const handleVolume = (e) => {
    setVolume(e.target.value);
    audioRef.current.volume = e.target.value;
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time/60);
    const seconds = Math.floor(time%60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };
  const toggleMute = () => {
    if (isMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  };
  
  // Logic for playing bar along with audio duration
  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("ended", handleEnded);
    }
  }, []);
  const handleTimeUpdate = ()=>{
    setCurrentTime(audioRef.current.currentTime);
  }
  const handleLoadedMetadata = ()=>{
    setDuration(audioRef.current.duration);
  }
  const handleEnded = ()=>{
    setCurrentTime(0);
    setIsPlaying(false);
  }

  // using audioRef to manipulate auido play/pause and volume button
  // using useEffect because we want it play first time automatically.
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);
  useEffect(() => {
    if (isMute) {
      audioRef.current.volume = 0;
      setVolume(0)
    } else {
      audioRef.current.volume = 1;
      setVolume(1)
    }
  }, [isMute]);

  // 10 second backward and forward button logic
  const handleBackwardBtn = ()=>{
    const newCurrentTime = currentTime-10;
    setCurrentTime(newCurrentTime);
    audioRef.current.currentTime = newCurrentTime;
  }
  const handleForwardBtn = ()=>{
    const newCurrentTime = currentTime+10;
    setCurrentTime(newCurrentTime);
    audioRef.current.currentTime = newCurrentTime;
  }

  return (
    <div className="audio-player">
      <div className="player-podcast-img">
        <img src={image} alt="" />
      </div>
      <audio ref={audioRef} src={audioSrc} />
      <div className="control-btns">
        <p className="backward-btn" onClick={handleBackwardBtn}>-10s</p>
        <p onClick={togglePlay} className="play-pause-btn">
            {isPlaying ? <FaPause /> : <FaPlay />}
        </p>
        <p className="forward-btn" onClick={handleForwardBtn}>+10s</p>
      </div>
      <div className="duration-flex">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          max={duration}
          value={currentTime}
          onChange={handleDuration}
          step={0.01}
          className="duration-range"
        />
        <p>-{formatTime(duration - currentTime)}</p>
      </div>
      <div className="volume-flex">
        <p onClick={toggleMute} className="mute-unmute-btn">{isMute ? <FaVolumeMute /> : <FaVolumeUp />}</p>
        <input
          type="range"
          onChange={handleVolume}
          value={volume}
          className="volume-range"
          max={1}
          min={0}
          step={0.01}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
