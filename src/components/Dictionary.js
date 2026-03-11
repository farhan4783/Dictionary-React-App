import React, { useState, useEffect } from "react";
import axios from "axios";
import Results from "./Results";
import Photos from "./Photos";
import WordOfTheDay from "./WordOfTheDay";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar as faStarSolid, faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import { motion } from 'framer-motion';
import "../styles/Dictionary.css";

// Speech Recognition Setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = SpeechRecognition ? new SpeechRecognition() : null;
if (mic) {
  mic.continuous = false;
  mic.interimResults = false;
  mic.lang = 'en-US';
}

const Dictionary = ({ externalKeyword, onSearchSuccess, favorites, toggleFavorite }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (externalKeyword) {
      setKeyword(externalKeyword);
      searchWord(externalKeyword);
    }
  }, [externalKeyword]);

  useEffect(() => {
    handleListen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isListening]);

  const handleListen = () => {
    if (!mic) return;

    if (isListening) {
      mic.start();
      mic.onend = () => {
        console.log('continue..');
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        console.log('Stopped Mic on Click');
      };
    }

    mic.onstart = () => {
      console.log('Mics on');
    };

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      
      setKeyword(transcript);
      mic.stop();
      setIsListening(false);
      searchWord(transcript); // auto search when done speaking
    };

    mic.onerror = event => {
      console.log('Mic Error:', event.error);
      setIsListening(false);
    };
  };

  const searchWord = (wordToSearch) => {
    if (!wordToSearch) return;
    setIsSearching(true);
    setError(null);
    setResults(null);
    setPhotos(null);

    const dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${wordToSearch}`;
    const pexelsApiKey = process.env.REACT_APP_PEXELS_API_KEY;
    const pexelsApiUrl = `https://api.pexels.com/v1/search?query=${wordToSearch}&per_page=9`;

    // Default headers for Pexels, though API key missing is handled locally usually
    let pexelsApiHeaders = {};
    if (pexelsApiKey) {
      pexelsApiHeaders = { Authorization: pexelsApiKey };
    }

    axios
      .get(dictionaryApiUrl)
      .then((response) => {
        setResults(response.data[0]);
        onSearchSuccess(wordToSearch); // Add to history
        setIsSearching(false);
      })
      .catch((error) => {
        console.error("Error fetching dictionary data:", error);
        setError("Definition not found. Please try another word.");
        setIsSearching(false);
      });

    // Pexels API will fail if no API key is present. 
    // Just suppressing error for now to allow dictionary to work
    if (pexelsApiKey) {
      axios
        .get(pexelsApiUrl, { headers: pexelsApiHeaders })
        .then((response) => setPhotos(response.data.photos))
        .catch((error) => console.error("Error fetching photos:", error));
    }
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchWord(keyword);
  };

  const handleWotdExplore = (word) => {
    setKeyword(word);
    searchWord(word);
  };

  const isFavorite = results ? favorites.includes(results.word) : false;

  return (
    <div className="Dictionary">
      <motion.section 
        className="search-section glass-panel"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      >
        <form onSubmit={handleSubmit} className="search-form animate-fade-in">
          <div className="search-input-wrapper">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              className="search-input"
              type="search"
              name="keyword"
              onChange={handleKeywordChange}
              value={keyword}
              placeholder="What word piques your interest?"
              autoFocus={true}
            />
            {mic && (
              <button 
                type="button" 
                className={`mic-button ${isListening ? 'listening' : ''}`}
                onClick={() => setIsListening(prevState => !prevState)}
                title={isListening ? "Stop listening" : "Voice search"}
              >
                <FontAwesomeIcon icon={isListening ? faMicrophoneSlash : faMicrophone} />
              </button>
            )}
          </div>
          <button type="submit" className="search-button">
            {isSearching ? <span className="loader"></span> : "Search"}
          </button>
        </form>
        <div className="suggestions">
          Suggested concepts: <span onClick={() => searchWord("ephemeral")}>ephemeral</span>,{" "}
          <span onClick={() => searchWord("ubiquitous")}>ubiquitous</span>,{" "}
          <span onClick={() => searchWord("pragmatic")}>pragmatic</span>...
        </div>
      </motion.section>

      {!results && !error && !isSearching && (
        <WordOfTheDay onSearch={handleWotdExplore} />
      )}

      {error && (
        <div className="error-message glass-panel">
          {error}
        </div>
      )}

      {results && (
        <>
          <div className="dictionary-toolbar">
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(results.word)}
              title={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} />
              {isFavorite ? " Favorited" : " Favorite"}
            </button>
          </div>
          <Results results={results} />
        </>
      )}
      {photos && photos.length > 0 && <Photos photos={photos} />}
    </div>
  );
};

Dictionary.propTypes = {
  externalKeyword: PropTypes.string,
  onSearchSuccess: PropTypes.func.isRequired,
  favorites: PropTypes.array.isRequired,
  toggleFavorite: PropTypes.func.isRequired
};

export default Dictionary;
