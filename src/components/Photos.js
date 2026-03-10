import React from "react";
import "../styles/Photos.css";

const Photos = ({ photos }) => {
  if (photos && photos.length > 0) {
    return (
      <section className="Photos glass-panel">
        <h3 className="photos-heading">Related Images</h3>
        <div className="photo-grid">
          {photos.map((photo, index) => {
            return (
              <a
                href={photo.src.original}
                target="_blank"
                rel="noreferrer"
                key={index}
                className="photo-link"
              >
                <img
                  src={photo.src.landscape}
                  alt={photo.alt}
                  className="photo-img"
                  loading="lazy"
                />
              </a>
            );
          })}
        </div>
      </section>
    );
  } else {
    return null;
  }
};

export default Photos;
