import React from "react";
import Meaning from "./Meaning";
import Phonetic from "./Phonetic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import "../styles/Results.css";

const Results = ({ results }) => {
  if (!results) {
    return null;
  }

  const { word, phonetics, meanings } = results;

  return (
    <motion.div 
      className="Results"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, staggerChildren: 0.2 }}
    >
      <motion.section 
        className="word-header-section glass-panel"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="word-title">
          <FontAwesomeIcon icon={faBookOpen} className="word-icon" />
          {word}
        </h2>
        <div className="phonetics-container">
          {phonetics.filter(p => p.text || p.audio).map((phonetic, index) => (
            <Phonetic key={index} phonetics={phonetic} />
          ))}
        </div>
      </motion.section>

      <div className="meanings-container">
        {meanings.map((meaning, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            <Meaning meanings={meaning} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Results;
