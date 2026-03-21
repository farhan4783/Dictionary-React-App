import React from "react";
import { motion } from "framer-motion";
import "../styles/Antonyms.css";

const Antonyms = ({ antonyms }) => {
  if (antonyms && antonyms.length > 0) {
    return (
      <ul className="Antonyms">
        {antonyms.map((antonym, index) => {
          return (
            <motion.li 
              key={index} 
              className="antonym-tag"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {antonym}
            </motion.li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default Antonyms;
