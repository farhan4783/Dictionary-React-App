import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import "../styles/Quiz.css";

const Quiz = ({ favorites, history }) => {
  const [questionPool, setQuestionPool] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [definition, setDefinition] = useState("");
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState({ correct: 0, wrong: 0 });
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Initialize pool combining unique items from favorites and history
  useEffect(() => {
    const combined = [...new Set([...favorites, ...history])];
    setQuestionPool(combined);
  }, [favorites, history]);

  // Load a new question when necessary
  useEffect(() => {
    if (questionPool.length >= 4 && !currentWord && !isLoading) {
      loadNewQuestion();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionPool]);

  const loadNewQuestion = async () => {
    if (questionPool.length < 4) return;
    setIsLoading(true);
    setIsError(false);
    setSelectedAnswer(null);

    // Pick a random target word
    const targetIdx = Math.floor(Math.random() * questionPool.length);
    const target = questionPool[targetIdx];
    
    // Pick 3 other wrong options
    const otherOptions = questionPool.filter(w => w !== target).sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [target, ...otherOptions].sort(() => 0.5 - Math.random());

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${target}`);
      const meanings = response.data[0].meanings;
      
      // Try to find a good definition that doesn't literally include the target word
      let def = meanings[0].definitions[0].definition;
      // Basic scrub to avoid giving away the answer trivially
      const regex = new RegExp(`\\b${target}\\b`, "gi");
      def = def.replace(regex, "___");

      setCurrentWord(target);
      setDefinition(def);
      setOptions(allOptions);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleSelectOption = (opt) => {
    if (selectedAnswer) return; // Prevent double clicking
    setSelectedAnswer(opt);
    
    if (opt === currentWord) {
      setScore(s => ({ ...s, correct: s.correct + 1 }));
      // Give them a moment to see they got it right, then load next
      setTimeout(() => {
        loadNewQuestion();
      }, 1500);
    } else {
      setScore(s => ({ ...s, wrong: s.wrong + 1 }));
    }
  };

  if (questionPool.length < 4) {
    return (
      <div className="Quiz glass-panel empty-state">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faRotateRight} className="spin-icon" />
        </div>
        <h3>Not enough knowledge yet!</h3>
        <p>You need at least 4 unique words in your History or Favorites to play the Vocabulary Quiz.</p>
        <p>Go search for some more interesting words!</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="Quiz"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <div className="quiz-header glass-panel">
        <h2>Vocabulary Flashcards</h2>
        <div className="score-board">
          <span className="score correct">
             <FontAwesomeIcon icon={faCheckCircle} /> {score.correct}
          </span>
          <span className="score wrong">
             <FontAwesomeIcon icon={faTimesCircle} /> {score.wrong}
          </span>
        </div>
      </div>

      <div className="quiz-card glass-panel">
        {isLoading ? (
          <div className="loader-container">
            <span className="loader"></span>
            <p>Loading next term...</p>
          </div>
        ) : isError ? (
          <div className="error-state">
            <p>Problem loading definition. Let's try another.</p>
            <button onClick={loadNewQuestion} className="quiz-btn primary">Skip</button>
          </div>
        ) : currentWord ? (
          <div className="question-container">
            <h3 className="definition-prompt">"{definition}"</h3>
            <p className="hint-text">Which word matches this definition?</p>
            
            <div className="options-grid">
              <AnimatePresence>
                {options.map((opt, index) => {
                  let statusClass = "";
                  if (selectedAnswer) {
                    if (opt === currentWord) statusClass = "correct-ans";
                    else if (opt === selectedAnswer) statusClass = "wrong-ans";
                  }

                  return (
                    <motion.button
                      key={opt}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`quiz-option ${statusClass}`}
                      onClick={() => handleSelectOption(opt)}
                      disabled={!!selectedAnswer}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {selectedAnswer && selectedAnswer !== currentWord && (
              <motion.button 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="quiz-btn secondary next-btn"
                onClick={loadNewQuestion}
              >
                Next Question
              </motion.button>
            )}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Quiz;
