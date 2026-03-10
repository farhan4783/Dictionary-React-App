import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import '../styles/ThemeToggle.css';

const ThemeToggle = ({ theme, setTheme }) => {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dictionary-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button 
      className={`theme-toggle ${theme}`} 
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
    >
      <div className="toggle-thumb">
        <FontAwesomeIcon icon={theme === 'light' ? faSun : faMoon} />
      </div>
    </button>
  );
};

export default ThemeToggle;
