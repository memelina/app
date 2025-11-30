import React from "react";

export default function Timer({ timeLeft, isGameOver }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeLeft <= 30) return 'timer-critical';
    if (timeLeft <= 60) return 'timer-warning';
    return 'timer-normal';
  };

  return (
    <div className={`timer ${getTimerColor()}`}>
      {formatTime(timeLeft)}
    </div>
  );
}
