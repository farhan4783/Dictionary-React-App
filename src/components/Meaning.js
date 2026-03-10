import React from "react";
import Synonyms from "./Synonyms";
import Antonyms from "./Antonyms";
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

  return (
    <div className="Meaning glass-panel">
      <div className="meaning-header">
        <span className={`part-of-speech-badge ${getPOSClass(partOfSpeech)}`}>
          {partOfSpeech}
        </span>
        <div className="header-line"></div>
      </div>

      <div className="definitions-list">
        {definitions.map(
          ({ definition, example, synonyms, antonyms }, index) => (
            <div key={index} className="definition-item">
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
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Meaning;
