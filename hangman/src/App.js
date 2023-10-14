import React, { useState } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import Word from "./components/Word";
import { imageUrls } from "./components/constants"; 
import "./App.css";

function App() {
  // Declare and initialize the state for tracking incorrect guess count
  const [incorrectGuessCount, setIncorrectGuessCount] = useState(0);

  // Determine if the game has been lost based on the incorrect guess count
  const hasLostGame = incorrectGuessCount >= imageUrls.length;

  return (
    <div className="App">
      <div className="center-content">
        {/* Include the Header component */}
        <Header />

        {/* Include the Figure component and pass the incorrect guess count as a prop */}
        <Figure incorrectGuessCount={incorrectGuessCount} />

        {/* Include the Word component, pass the incorrect guess count and the function to update it */}
        <Word
          incorrectGuessCount={incorrectGuessCount}
          setIncorrectGuessCount={setIncorrectGuessCount}
          hasLostGame={hasLostGame}
        />
      </div>
    </div>
  );
}

export default App;
