import React from "react";

export default function WinMessage({ turns, show, timeLeft, isTimeUp }) {
  if (!show) return null;

  // Dacă timpul s-a terminat
  if (isTimeUp) {
    return (
      <div className="game-over-message">
        <h2 className="game-over-title"> Timpul a expirat!</h2>
      </div>
    );
  }

  // Dacă a câștigat (găsit toate perechile)
  const timeUsed = 120 - timeLeft; // timpul folosit în secunde
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="win-message">
      <h2 className="win-title"> Felicitări!</h2>
      <div className="win-stats">
        <p> Ai găsit toate cele 8 perechi!</p>
        <p> Timp folosit: <strong>{formatTime(timeUsed)}</strong></p>
        <p> Încercări: <strong>{turns}</strong></p>
      </div>
    </div>
  );
}