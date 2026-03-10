import React from "react";
import "../styles/Antonyms.css";

const Antonyms = ({ antonyms }) => {
  if (antonyms && antonyms.length > 0) {
    return (
      <ul className="Antonyms">
        {antonyms.map((antonym, index) => {
          return <li key={index} className="antonym-tag">{antonym}</li>;
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default Antonyms;
