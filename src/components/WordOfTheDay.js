import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay, faPlay, faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/WordOfTheDay.css';

const words = [
    'serendipity', 'ephemeral', 'luminescence', 'eloquence', 'sonder',
    'effervescent', 'mellifluous', 'ethereal', 'petrichor', 'solitude',
    'aurora', 'idyllic', 'nebula', 'tranquility', 'velichor'
];

const WordOfTheDay = ({ onSearch }) => {
    const [wordData, setWordData] = useState(null);

    useEffect(() => {
        const todayIndex = new Date().getDate() % words.length;
        const word = words[todayIndex];

        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => {
                setWordData(response.data[0]);
            })
            .catch(err => console.error("Could not fetch word of the day", err));
    }, []);

    if (!wordData) return null;

    const getAudio = () => {
        const phoneticWithAudio = wordData.phonetics.find(p => p.audio);
        return phoneticWithAudio ? phoneticWithAudio.audio : null;
    };

    const playAudio = () => {
        const audioSrc = getAudio();
        if (audioSrc) {
            new Audio(audioSrc).play();
        }
    };

    const audioSrc = getAudio();

    return (
        <div className="word-of-the-day glass-panel animate-fade-in">
            <div className="wotd-header">
                <span className="wotd-badge">
                    <FontAwesomeIcon icon={faCalendarDay} /> Word of the Day
                </span>
            </div>

            <div className="wotd-content">
                <h2 className="wotd-word">{wordData.word}</h2>
                <div className="wotd-phonetic">
                    {wordData.phonetic}
                    {audioSrc && (
                        <button className="wotd-audio-btn" onClick={playAudio} aria-label="Play audio">
                            <FontAwesomeIcon icon={faPlay} />
                        </button>
                    )}
                </div>

                {wordData.meanings[0] && (
                    <div className="wotd-meaning">
                        <span className="part-of-speech">{wordData.meanings[0].partOfSpeech}</span>
                        <p className="definition">{wordData.meanings[0].definitions[0].definition}</p>
                    </div>
                )}
            </div>

            <button className="wotd-explore-btn" onClick={() => onSearch(wordData.word)}>
                <FontAwesomeIcon icon={faSearch} /> Explore Full Definition
            </button>
        </div>
    );
};

export default WordOfTheDay;
