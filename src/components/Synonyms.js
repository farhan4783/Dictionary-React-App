import React from "react";
import "../styles/Synonyms.css";

const Synonyms = ({ synonyms }) => {
  if (synonyms && synonyms.length > 0) {
    return (
      <ul className="Synonyms">
        {synonyms.map((synonym, index) => {
          return <li key={index} className="synonym-tag">{synonym}</li>;
        })}
      </ul>
    );
  } else {
    return null;
  }
};

export default Synonyms;
