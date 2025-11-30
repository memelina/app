import React from "react";
import Card from "./Card";

export default function GameBoard({ cards, handleChoice, choiceOne, choiceTwo, disabled }) {
  return (
    <div className="game-board-4x4">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}
        />
      ))}
    </div>
  );
}