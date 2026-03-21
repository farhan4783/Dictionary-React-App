import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { motion } from "framer-motion";
import "../styles/Audio.css";

const AudioPlayer = ({ audio }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.onplay = () => setIsPlaying(true);
      audioElement.onended = () => setIsPlaying(false);
      audioElement.onpause = () => setIsPlaying(false);
    }
  }, [audio]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="AudioPlayer">
      <motion.button 
        className={`play-btn ${isPlaying ? 'playing' : ''}`}
        onClick={playAudio} 
        aria-label="Play pronunciation"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FontAwesomeIcon icon={faVolumeUp} />
      </motion.button>
      
      {isPlaying && (
        <div className="visualizer">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      )}
      <audio ref={audioRef} src={audio}></audio>
    </div>
  );
};

export default AudioPlayer;
