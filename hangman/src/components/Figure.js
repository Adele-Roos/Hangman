import React, { useState, useEffect } from "react";
import { imageUrls } from "./constants";
import "./App.css";

function Figure({ incorrectGuessCount }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Update the current image index when the incorrectGuessCount changes
  useEffect(() => {
    if (incorrectGuessCount < imageUrls.length) {
      setCurrentImageIndex(incorrectGuessCount);
    }
  }, [incorrectGuessCount]);

  return (
    <div>
      {/* Display the current image based on the currentImageIndex */}
      <img
        src={process.env.PUBLIC_URL + `/assets/${imageUrls[currentImageIndex]}`}
        alt="Figure"
      />
    </div>
  );
}

export default Figure;
