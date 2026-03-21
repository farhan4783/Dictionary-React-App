import React from "react";
import { motion } from "framer-motion";
import "../styles/Synonyms.css";

const Synonyms = ({ synonyms }) => {
  if (synonyms && synonyms.length > 0) {
    return (
      <ul className="Synonyms">
        {synonyms.map((synonym, index) => {
          return (
            <motion.li 
              key={index} 
              className="synonym-tag"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {synonym}
            </motion.li>
          );
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default Synonyms;
