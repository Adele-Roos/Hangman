import React, { useState } from "react";
import "./App.css";

const Header = () => {
  // Define state to control the visibility of the instructions popup
  const [showInstructions, setShowInstructions] = useState(false);

  // Function to toggle the visibility of instructions
  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div>
      {/* Render the game header, including a heading and a "How to Play" button */}
      <img src="./assets/header.png" alt="Heading" width="400"></img>
      <h3>
        Guess the word - Enter a letter{" "}
        <button className="help" onClick={toggleInstructions}>
          HOW TO PLAY
        </button>
      </h3>

      {/* Conditionally display the instructions popup based on the state */}
      {showInstructions && (
        <div className="instructions-popup">
          <div className="popup-content">
            {/* Instructions for playing the Hangman game */}
            <h2>How to Play Hangman</h2>
            <p>
              <strong>Objective:</strong> Guess the hidden word before the
              hangman is fully drawn.
            </p>
            <p>
              <strong>1. Guess Letters:</strong> Click or type a letter to
              guess.
            </p>
            <p>
              <strong>2. Correct Guess:</strong> The letter appears in the word.
            </p>
            <p>
              <strong>3. Incorrect Guess:</strong> Part of the hangman is drawn.
            </p>
            <p>
              <strong>4. Win:</strong> Guess the whole word.
            </p>
            <p>
              <strong>5. Lose:</strong> Hangman is fully drawn.
            </p>
            <p>
              <strong>6. Restart:</strong> Click "Restart" to play again.
            </p>
            <button className="close-button" onClick={toggleInstructions}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
