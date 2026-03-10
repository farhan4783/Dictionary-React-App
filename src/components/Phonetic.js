import React from "react";
import AudioPlayer from "./AudioPlayer";
import "../styles/Phonetic.css";

const Phonetic = ({ phonetics }) => {
  const { text, audio } = phonetics;

  if (!text && !audio) return null;

  return (
    <div className="Phonetic">
      {audio && <AudioPlayer audio={audio} />}
      {text && <span className="phonetic-text">{text}</span>}
    </div>
  );
};

export default Phonetic;
