import React from "react";
import Board from "./Board";
import "./GameStyle.css";
import { useState, useEffect } from "react";
import calculateWinner from "../../helper";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [showParticles, setShowParticles] = useState(false);

  const gameResult = calculateWinner(board);
  const winner = gameResult?.winner;
  const winningLine = gameResult?.line || [];
  const isDraw = !winner && board.every((cell) => cell !== null);

  useEffect(() => {
    if (winner) {
      setShowParticles(true);
      const timer = setTimeout(() => setShowParticles(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [winner]);

  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) return;
    boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext(!xIsNext);
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setShowParticles(false);
  };

  const getStatusMessage = () => {
    if (winner) {
      return `🎉 Player ${winner} Wins! 🎉`;
    } else if (isDraw) {
      return `🤝 It's a Draw! 🤝`;
    } else {
      return `Player ${xIsNext ? "X" : "O"}'s Turn`;
    }
  };

  const getStatusClass = () => {
    if (winner) return "winner";
    if (isDraw) return "draw";
    return "next-turn";
  };

  const createParticles = () => {
    const particles = [];
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 300;
      particles.push(
        <div
          key={i}
          className="particle"
          style={{
            "--x": `${x}px`,
            "--y": `${y}px`,
            animationDelay: `${Math.random() * 0.5}s`,
            backgroundColor: Math.random() > 0.5 ? "#ffd700" : "#ff69b4",
          }}
        />
      );
    }
    return particles;
  };

  return (
    <div className="game-container">
      <h1 className="game-title">TIC TAC TOE</h1>
      <div className={`game-status ${getStatusClass()}`}>
        {getStatusMessage()}
        {showParticles && (
          <div className="celebration-particles">{createParticles()}</div>
        )}
      </div>
      <Board cells={board} onClick={handleClick} winningLine={winningLine} />
      <button className="game-reset" onClick={handleResetGame}>
        New Game
      </button>
    </div>
  );
}
