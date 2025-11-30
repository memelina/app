import React from 'react';
import Timer from './Timer';
import './GameHeader.css';
import vivoImg from '/images/vivo.png'; // Vite va procesa imaginea

export default function GameHeader({
  turns,
  timeLeft,
  isGameOver,
  matchedPairs,
  showRegisterButton,
  onShowRegister,
  onRestart,
}) {
  return (
    <div className="game-header">
      <div className="header-image-container">
        <img src={vivoImg} alt="Banner" className="header-image" />
      </div>

      {showRegisterButton ? (
        <button className="promo-button" onClick={onShowRegister}>
          Înscrie-te, joacă și câștigă premii instant!
        </button>
      ) : (
        <div className="timer-and-restart">
          <Timer timeLeft={timeLeft} isGameOver={isGameOver} />
          <button className="restart-button" onClick={onRestart}>
            Restart
          </button>
          <div className="game-stats-inline">
  
            <div className="stat-item">
              <span className="stat-label">Perechi:</span>
              <span className="stat-value">{matchedPairs}/12</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
