import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import GameHeader from "./components/GameHeader";
import WinMessage from "./components/WinMessage";
import GameBoard from "./components/GameBoard";
import GameFooter from "./components/GameFooter";
import RegisterForm from "./components/RegisterForm";
import { cardImages } from "./data/cards";
import "./styles/game.css";

// --- GamePage ---
function GamePage({ gameActive, setGameActive, playerData, setPlayerData }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [turns, setTurns] = useState(0);
  const [timeLeft, setTimeLeft] = useState(120);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const matchedPairs = cards.filter((c) => c.matched).length / 2;

 
  // Initializează cardurile
  useEffect(() => shuffleCards(), []);

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: `card-${index}` }));
    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setTimeLeft(120);
    setIsGameOver(false);
    setGameWon(false);
    setIsTimeUp(false);
  };

  const handleChoice = (card) => {
    if (!gameActive || disabled || isGameOver) return;
    if (choiceOne && choiceOne.id !== card.id) setChoiceTwo(card);
    else if (!choiceOne) setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns((prev) => prev + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prev) =>
          prev.map((c) => (c.src === choiceOne.src ? { ...c, matched: true } : c))
        );
        resetTurn();
      } else setTimeout(resetTurn, 1000);
    }
  }, [choiceOne, choiceTwo]);

  // Timer
  useEffect(() => {
    if (!isGameOver && timeLeft > 0 && !gameWon && gameActive) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimeUp(true);
            setIsGameOver(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isGameOver, gameWon, gameActive]);

  // Verifică câștig
  useEffect(() => {
    const matchedCount = cards.filter((c) => c.matched).length;
    if (cards.length > 0 && matchedCount === 16) {
      setGameWon(true);
      setIsGameOver(true);
    }
  }, [cards]);

  const handleRestart = () => {
    shuffleCards();
    setPlayerData(null);
    setGameActive(false);
    navigate("*");
  };

  return (
    <div className="game-container">
      <div className="game-card">
        <GameHeader
          turns={turns}
          timeLeft={timeLeft}
          isGameOver={isGameOver}
          matchedPairs={matchedPairs}
          showRegisterButton={!gameActive}
          onShowRegister={() => navigate("/register")}
          onRestart={handleRestart}
        />
        <WinMessage
          turns={turns}
          show={gameWon || isTimeUp}
          timeLeft={timeLeft}
          isTimeUp={isTimeUp}
        />
        <GameBoard
          cards={cards}
          handleChoice={handleChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          disabled={!gameActive || disabled || isGameOver}
        />
        <GameFooter onRestart={handleRestart} />
      </div>
    </div>
  );
}

function RegisterPage({ setGameActive, setPlayerData }) {
  const navigate = useNavigate();

const handleSubmit = async (data) => {
  try {
    const response = await fetch("http://localhost:3001/api/players", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!result.success) throw new Error(result.message || "Eroare la server");

    setPlayerData(data);
    setGameActive(true);
    navigate("/");
  } catch (err) {
    alert(`Eroare: ${err.message}`);
  }
};

  return <RegisterForm onSubmit={handleSubmit} loading={false} />;
}

// --- App Component ---
export default function App() {
  const [playerData, setPlayerData] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <GamePage
              playerData={playerData}
              gameActive={gameActive}
              setGameActive={setGameActive}
              setPlayerData={setPlayerData}
            />
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              setGameActive={setGameActive}
              setPlayerData={setPlayerData}
            />
          }
        />
        <Route
          path="*"
          element={
            <GamePage
              playerData={playerData}
              gameActive={gameActive}
              setGameActive={setGameActive}
              setPlayerData={setPlayerData}
            />
          }
        />
      </Routes>
    </Router>
  );
}
