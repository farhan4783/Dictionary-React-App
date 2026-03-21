import React from "react";
import Synonyms from "./Synonyms";
import Antonyms from "./Antonyms";
import { motion } from "framer-motion";
import "../styles/Meaning.css";

const Meaning = ({ meanings }) => {
  const { partOfSpeech, definitions } = meanings;

  const getPOSClass = (pos) => {
    switch (pos?.toLowerCase()) {
      case 'noun': return 'pos-noun';
      case 'verb': return 'pos-verb';
      case 'adjective': return 'pos-adj';
      case 'adverb': return 'pos-adv';
      default: return 'pos-default';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="Meaning glass-panel">
      <div className="meaning-header">
        <span className={`part-of-speech-badge ${getPOSClass(partOfSpeech)}`}>
          {partOfSpeech}
        </span>
        <div className="header-line"></div>
      </div>

      <motion.div 
        className="definitions-list"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {definitions.map(
          ({ definition, example, synonyms, antonyms }, index) => (
            <motion.div key={index} className="definition-item" variants={itemVariants}>
              <div className="definition-text">
                <span className="bullet">•</span>
                <p>{definition}</p>
              </div>

              {example && (
                <div className="example-text">
                  <span className="quote-mark">"</span>
                  <em>{example}</em>
                  <span className="quote-mark">"</span>
                </div>
              )}

              <div className="syn-ant-container">
                {synonyms && synonyms.length > 0 && (
                  <div className="nym-group">
                    <span className="nym-label">Synonyms:</span>
                    <Synonyms synonyms={synonyms} />
                  </div>
                )}
                {antonyms && antonyms.length > 0 && (
                  <div className="nym-group">
                    <span className="nym-label">Antonyms:</span>
                    <Antonyms antonyms={antonyms} />
                  </div>
                )}
              </div>
            </motion.div>
          )
        )}
      </motion.div>
    </div>
  );
};

export default Meaning;
