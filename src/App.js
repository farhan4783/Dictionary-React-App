import React, { useState, useEffect } from "react";
import Dictionary from "./components/Dictionary";
import Sidebar from "./components/Sidebar";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('dictionary-theme') || 'light');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('dictionary-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('dictionary-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [keywordToSearch, setKeywordToSearch] = useState("");

  useEffect(() => {
    localStorage.setItem('dictionary-history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('dictionary-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToHistory = (word) => {
    if (!word) return;
    setHistory(prev => {
      const newHistory = [word, ...prev.filter(w => w !== word)].slice(0, 20); // Keep last 20
      return newHistory;
    });
  };

  const toggleFavorite = (word) => {
    if (!word) return;
    setFavorites(prev => {
      if (prev.includes(word)) {
        return prev.filter(w => w !== word);
      }
      return [word, ...prev];
    });
  };

  const handleSelectWord = (word) => {
    setKeywordToSearch(word);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`App ${theme}`}>
      <Sidebar
        history={history}
        favorites={favorites}
        onSelectWord={handleSelectWord}
      />

      <div className="main-wrapper">
        <div className="top-bar">
          <ThemeToggle theme={theme} setTheme={setTheme} />
        </div>

        <div className="container">
          <header className="App-header animate-fade-in">
            <h1 className="heading">Lexicon</h1>
            <p className="subheading">Discover the eloquence of the English language.</p>
          </header>

          <main>
            <Dictionary
              externalKeyword={keywordToSearch}
              onSearchSuccess={addToHistory}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          </main>

          <footer className="mt-5 footer">
            <div className="footer-content glass-panel">
              <p className="credit">
                Coded by{" "}
                <a
                  href="https://github.com/farhan4783"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  farhan4783
                </a>
                {" "} | {" "}
                <a
                  href="https://github.com/farhan4783/Dictionary-React-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Open sourced on Github
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
