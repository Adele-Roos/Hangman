import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import "./App.css";

const MAX_INCORRECT_GUESSES = 9; // Define the maximum allowed incorrect guesses

function Word({ setIncorrectGuessCount }) {
  const [chosenWord, setChosenWord] = useState(""); // State to store the randomly chosen word
  const [guessedLetters, setGuessedLetters] = useState([]); // State to store guessed letters
  const [guess, setGuess] = useState(""); // State to store the current guess
  const [incorrectGuesses, setIncorrectGuesses] = useState(new Set()); // State to track incorrect guesses
  const [repeatedLetter, setRepeatedLetter] = useState(null); // State to track repeated incorrect guesses
  const [gameState, setGameState] = useState("playing"); // State to track the game state (playing, won, or lost)

  useEffect(() => {
    // Fetch a random word when the component mounts
    fetchWord();
  }, []);

  const fetchWord = async () => {
    try {
      const response = await fetch(
        process.env.PUBLIC_URL + "/assets/words.txt"
      );
      const text = await response.text();
      const words = text.split("\n").filter(Boolean);
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];

      setChosenWord(randomWord);

      // Initialize guessedLetters with underscores
      const initialGuessedLetters = randomWord.split("").map(() => "_");
      setGuessedLetters(initialGuessedLetters);
    } catch (error) {
      console.error("Error reading the file:", error);
    }
  };

  const handleGuess = () => {
    if (gameState !== "playing") {
      // Do nothing if the game is not in the "playing" state
      return;
    }

    // Check if the guess is a valid letter (alphabetic character)
    if (/^[a-zA-Z]$/.test(guess)) {
      const updatedGuessedLetters = guessedLetters.map((letter, index) =>
        chosenWord[index] === guess ? guess : letter
      );

      if (!chosenWord.includes(guess)) {
        if (incorrectGuesses.has(guess)) {
          setRepeatedLetter(guess); // Track repeated incorrect guesses
        } else {
          setIncorrectGuesses(new Set(incorrectGuesses).add(guess));
          setIncorrectGuessCount(incorrectGuesses.size + 1);
        }
      }

      setGuessedLetters(updatedGuessedLetters);

      if (updatedGuessedLetters.join("") === chosenWord) {
        // Check for the winning condition here
        setGameState("won");
      }
    } else {
      // Alert the player that only letters are allowed
      alert("Please enter a valid letter (A-Z).");
    }

    if (incorrectGuesses.size >= MAX_INCORRECT_GUESSES) {
      setGameState("lost");
    }

    setGuess("");
  };

  const resetGame = () => {
    // Reset the game to its initial state
    setChosenWord("");
    setGuessedLetters([]);
    setGuess("");
    setIncorrectGuesses(new Set());
    setRepeatedLetter(null);
    setGameState("playing");
    setIncorrectGuessCount(0);
    fetchWord();
  };

  return (
    <div>
      {gameState === "playing" ? (
        <div>
          <h1>{guessedLetters.join(" ")}</h1>
          <h3>Incorrect Guesses: {Array.from(incorrectGuesses).join(", ")}</h3>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter a letter"
            autoComplete="off"
          />
          <button onClick={handleGuess}>Guess</button>
          <button className="reset" onClick={resetGame}>
            Restart Game
          </button>
          <Notification repeatedLetter={repeatedLetter} />
        </div>
      ) : gameState === "won" ? (
        <div>
          <h3>Congratulations, you've won!</h3>
          <h4>The word was: {chosenWord}</h4>
          <button className="reset" onClick={resetGame}>
            Restart Game
          </button>
        </div>
      ) : gameState === "lost" ? (
        <div>
          <h3>Sorry, you lose!</h3>
          <h4>The word was: {chosenWord}</h4>
          <button className="reset" onClick={resetGame}>
            Restart Game
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Word;
