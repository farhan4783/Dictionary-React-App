import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faHistory, faStar, faDownload, faUpload } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Sidebar.css';

const Sidebar = ({ history, favorites, onSelectWord }) => {
    const [isOpen, setIsOpen] = useState(false);
    const fileInputRef = useRef(null);

    const toggleSidebar = () => setIsOpen(!isOpen);

    const exportData = () => {
        const data = { history, favorites };
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href",     dataStr);
        downloadAnchorNode.setAttribute("download", "lexicon-vocabulary.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    const importData = (event) => {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], "UTF-8");
        fileReader.onload = e => {
            try {
                const parsed = JSON.parse(e.target.result);
                if (parsed.history && parsed.favorites) {
                    localStorage.setItem('dictionary-history', JSON.stringify(parsed.history));
                    localStorage.setItem('dictionary-favorites', JSON.stringify(parsed.favorites));
                    // Reload to reflect changes globally in App.js state
                    window.location.reload(); 
                }
            } catch (err) {
                console.error("Invalid JSON file uploaded.");
                alert("Failed to parse the uploaded file. Please make sure it's a valid Lexicon export.");
            }
        };
    };

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
                                <AnimatePresence>
                                    {favorites.map((word, index) => (
                                        <motion.li 
                                            key={`${word}-${index}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => { onSelectWord(word); setIsOpen(false); }}
                                        >
                                            {word}
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
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
                                <AnimatePresence>
                                    {history.map((word, index) => (
                                        <motion.li 
                                            key={`${word}-${index}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => { onSelectWord(word); setIsOpen(false); }}
                                        >
                                            {word}
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        )}
                    </section>
                </div>
                
                <div className="sidebar-footer">
                    <button className="export-btn" onClick={exportData}>
                        <FontAwesomeIcon icon={faDownload} /> Export Data
                    </button>
                    <button className="export-btn" onClick={() => fileInputRef.current.click()}>
                        <FontAwesomeIcon icon={faUpload} /> Import Data
                    </button>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: "none" }} 
                        accept=".json" 
                        onChange={importData} 
                    />
                </div>
            </div>
            {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
        </>
    );
};

export default Sidebar;
