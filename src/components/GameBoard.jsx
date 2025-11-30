import React from "react";
import Card from "./Card";

export default function GameBoard({
  cards,
  handleChoice,
  choiceOne,
  choiceTwo,
  disabled,
  initialReveal, // 👈 nou
}) {
  return (
    <div className="game-board-4x4">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          disabled={disabled}
          flipped={
            initialReveal || card === choiceOne || card === choiceTwo || card.matched
          }
        />
      ))}
    </div>
  );
}
