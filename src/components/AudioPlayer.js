import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import "../styles/Audio.css";

const AudioPlayer = ({ audio }) => {
  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="AudioPlayer">
      <button className="play-btn" onClick={playAudio} aria-label="Play pronunciation">
        <FontAwesomeIcon icon={faVolumeUp} />
      </button>
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default AudioPlayer;
