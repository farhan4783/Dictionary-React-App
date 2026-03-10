import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHistory, faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/Sidebar.css';

const Sidebar = ({ history, favorites, onSelectWord }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <>
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </button>

            <div className={`sidebar glass-panel ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-content">
                    <section className="sidebar-section">
                        <h3>
                            <FontAwesomeIcon icon={faStar} className="section-icon text-warning" />
                            Favorites
                        </h3>
                        {favorites.length === 0 ? (
                            <p className="empty-state">No favorites yet.</p>
                        ) : (
                            <ul className="word-list">
                                {favorites.map((word, index) => (
                                    <li key={index} onClick={() => { onSelectWord(word); setIsOpen(false); }}>
                                        {word}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    <section className="sidebar-section">
                        <h3>
                            <FontAwesomeIcon icon={faHistory} className="section-icon" />
                            History
                        </h3>
                        {history.length === 0 ? (
                            <p className="empty-state">No search history.</p>
                        ) : (
                            <ul className="word-list">
                                {history.map((word, index) => (
                                    <li key={index} onClick={() => { onSelectWord(word); setIsOpen(false); }}>
                                        {word}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
