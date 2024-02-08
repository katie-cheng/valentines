import React, { useState } from "react";
import "./App.css";

const phrases = ["NO!", "Are you sure?", "Really sure?", ":("];

function App() {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [hearts, setHearts] = useState([]); // New state to track hearts
  const yesButtonSize = noCount * 20 + 16;

  function handleNoClick() {
    setNoCount(noCount + 1);
  }

  function getNoButtonText() {
    return phrases[Math.min(noCount, phrases.length - 1)];
  }

  function handleGifClick(e) {
    const newHeart = {
      id: new Date().getTime(), // Unique ID for key prop
      style: {
        left: e.clientX - 25 + "px",
        top: e.clientY - 25 + "px",
      },
    };

    setHearts((currentHearts) => [...currentHearts, newHeart]);

    setTimeout(() => {
      setHearts((currentHearts) =>
        currentHearts.filter((heart) => heart.id !== newHeart.id),
      );
    }, 600); // Matches the duration until the heart disappears
  }

  return (
    <div className="valentine-container">
      <div className="valentine-content" onClick={handleGifClick}>
        {yesPressed ? (
          <img
            alt="bears kissing"
            src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
          />
        ) : (
          <>
            <img
              alt="allan + katie"
              className="h-[200px]"
              style={{ width: "310px", height: "300px" }}
              src="IMG_0039.gif"
            />
            <h1 className="text-container">Will you be my Valentine?</h1>
            <div>
              <button
                className="yes-button"
                style={{ fontSize: `${yesButtonSize}px` }}
                onClick={() => setYesPressed(true)}
              >
                YES!
              </button>
              <button onClick={handleNoClick} className="no-button">
                {noCount === 0 ? "No" : getNoButtonText()}
              </button>
            </div>
          </>
        )}
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="heart"
            style={{
              ...heart.style,
              position: "fixed",
              transform: "translate(-50%, -50%)",
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
