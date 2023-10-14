import React from "react";

function Notification({ repeatedLetter }) {
  return (
    <div>
      {/* Conditionally render a notification if a repeated letter is provided */}
      {repeatedLetter && (
        <p>You've already guessed the letter "{repeatedLetter}" incorrectly.</p>
      )}
    </div>
  );
}

export default Notification;
