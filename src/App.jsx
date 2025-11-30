import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import GameHeader from "./components/GameHeader.jsx";
import WinMessage from "./components/WinMessage.jsx";
import TimeExpired from "./components/TimeExpired.jsx";
import GameBoard from "./components/GameBoard.jsx";
import GameFooter from "./components/GameFooter.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import ChoosePrize from "./components/ChoosePrize.jsx";
import AdminPanel from "./components/AdminPanel.jsx";
import { cardImages } from "./data/cards.js";
import { seedProducts } from "./components/db.js";
import { addPlayerLocal } from "./components/api.js";

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
  const [initialReveal, setInitialReveal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false)

  const matchedPairs = cards.filter(c => c.matched).length / 2;


  useEffect(() => {
    shuffleCards();
  }, []);

    const handleStartGame = () => {
    setGameStarted(true);
    setInitialReveal(true);
    setDisabled(true);
    const startTimer = () => {
  setTimeLeft(120); // reset timer
  const interval = setInterval(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        setIsTimeUp(true);
        setIsGameOver(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);
};

    // după 2 secunde de preview, se închide și jocul devine activ
    setTimeout(() => {
      setInitialReveal(false);
      setDisabled(false);
      startTimer()
    }, 2000);
  };


  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: `card-${index}`, matched: false }));
    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setTimeLeft(120);
    setIsGameOver(false);
    setGameWon(false);
    setIsTimeUp(false);
    setDisabled(false);
    setGameStarted(false);
  };

useEffect(() => {
  if (!gameActive) {
    const resetCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, id: `card-${index}`, matched: false }));
    setCards(resetCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setTimeLeft(120);
    setIsGameOver(false);
    setGameWon(false);
    setIsTimeUp(false);
    setDisabled(true); // cartonașele sunt inaccesibile pe pagina principală
    setGameStarted(false); // Asigurăm că e resetat
  }
}, [gameActive]);

  const handleChoice = (card) => {
    if (!gameActive || disabled || isGameOver || initialReveal || !gameStarted) return;
    if (choiceOne && choiceOne.id !== card.id) setChoiceTwo(card);
    else if (!choiceOne) setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns(prev => prev + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prev => prev.map(c => c.src === choiceOne.src ? { ...c, matched: true } : c));
        resetTurn();
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);


// Handle game win or time expired
useEffect(() => {
  const matchedCount = cards.filter(c => c.matched).length;

  if (cards.length > 0 && matchedCount === 24) {
    // Player won
    setGameWon(true);
    setIsGameOver(true);

    const timer = setTimeout(() => {
      navigate("/choose-prize"); // go to prize page after 3s
    }, 3000);

    return () => clearTimeout(timer);
  }

  if (isTimeUp) {
    // Time expired
    setIsGameOver(true);
    const timer = setTimeout(() => {
    handleRestart(); // go back to main page after 5s
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [cards, isTimeUp, navigate]);


  const handleRestart = () => {
    setPlayerData(null);
    setGameActive(false);
    navigate("/"); // duce la GameHeader cu butonul de start
  };

  return (

    <div className="game-container">
      <div className="game-card">
        <button
          style={{ backgroundColor: "#cc2632",color:"#cc2632", position: "absolute", top: "1rem", right: "1rem", padding: "0.5rem",border: "2px solid #cc2632", zIndex: 1000 }}
          onClick={() => navigate("/admin")}
        >
          Admin
        </button>

        <GameHeader
          turns={turns}
          timeLeft={timeLeft}
          isGameOver={isGameOver}
          matchedPairs={matchedPairs}
          showRegisterButton={!gameActive}
          onShowRegister={() => navigate("/register")}
          onRestart={handleRestart}
        />

        <WinMessage turns={turns} show={gameWon} timeLeft={timeLeft} isTimeUp={isTimeUp} />
        <TimeExpired show={isTimeUp && !gameWon} // show only if time ran out and not won
/>

        {gameActive && !gameStarted && ( // Afișează butonul Start Joc când e înregistrat, dar jocul nu a început
  <div
    style={{
      position: "absolute",
      // ADJUSTARE PE VERTICALĂ: top: "69%"
      top: "50%", 
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: 999,
    }}
  >
    <button
      // ADAUGĂ ACEASTĂ CLASĂ PENTRU PULSAȚIE
      className="start-pulse" 
      onClick={handleStartGame}
      style={{
        width: "220px",
        height: "220px",
        borderRadius: "50%",
        fontSize: "1.5rem",
        backgroundColor: "#cc2632",
        color: "white",
        border: "none",
        cursor: "pointer",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        lineHeight: "1.2"
      }}
    >
      START JOC!
    </button>
  </div>
)}
        <GameBoard
          cards={cards}
          handleChoice={handleChoice}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          disabled={!gameActive || disabled || isGameOver}
          initialReveal={initialReveal}
        />

        <GameFooter onRestart={handleRestart} />
      </div>
    </div>
  );
}

// --- RegisterPage ---
function RegisterPage({ setGameActive, setPlayerData }) {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await seedProducts();
    await addPlayerLocal(data);
    setPlayerData(data);
    setGameActive(true);
    navigate("/"); // duce la GameHeader cu butonul de start
  };

  return <RegisterForm onSubmit={handleSubmit} loading={false} />;
}

// --- AppWrapper ---
function AppWrapper() {
  const navigate = useNavigate();
  const [playerData, setPlayerData] = useState(null);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    seedProducts();
  }, []);

  const handleBack = () => {
    setPlayerData(null);
    setGameActive(false);
    navigate("/"); // pagina principală
  };

  return (
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
        path="/choose-prize"
        element={
          <ChoosePrize
            playerData={playerData}
            setPlayerData={setPlayerData}
            setGameActive={setGameActive}
          />
        }
      />
      <Route path="/admin" element={<AdminPanel onBack={handleBack} />} />
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
  );
}

// --- App principal ---
export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
