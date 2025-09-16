import React from "react";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card);
    }
  };

  const handleTouch = (e) => {
    e.preventDefault(); // Previne double-tap zoom
    handleClick();
  };

  return (
    <div className="card-container">
      <div
        className={`card ${flipped ? "flipped" : ""}`}
        onClick={handleClick}
        onTouchEnd={handleTouch}
        role="button"
        tabIndex={0}
        aria-label={`Card ${flipped ? 'revealed' : 'hidden'}`}
      >
        {/* Spatele cardului (partea acoperită) */}
        <div className="card-face card-back">
          <div className="card-back-content">?</div>
        </div>
        
        {/* Fața cardului cu imaginea PNG */}
        <div className="card-face card-front">
          <img 
            src={card.src} 
            alt="card"
            className="card-image"
            onError={(e) => {
              // Fallback dacă imaginea nu se încarcă
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="card-fallback" style={{display: 'none'}}>
            🖼️
          </div>
        </div>
      </div>
    </div>
  );
}