import React from "react";
import Meaning from "./Meaning";
import Phonetic from "./Phonetic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import "../styles/Results.css";

const Results = ({ results }) => {
  if (!results) {
    return null;
  }

  const { word, phonetics, meanings } = results;

  return (
    <div className="Results animate-fade-in">
      <section className="word-header-section glass-panel">
        <h2 className="word-title">
          <FontAwesomeIcon icon={faBookOpen} className="word-icon" />
          {word}
        </h2>
        <div className="phonetics-container">
          {phonetics.filter(p => p.text || p.audio).map((phonetic, index) => (
            <Phonetic key={index} phonetics={phonetic} />
          ))}
        </div>
      </section>

      <div className="meanings-container">
        {meanings.map((meaning, index) => (
          <Meaning key={index} meanings={meaning} />
        ))}
      </div>
    </div>
  );
};

export default Results;
