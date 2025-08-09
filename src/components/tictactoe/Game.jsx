import React from "react";
import Board from "./Board";
import "./GameStyle.css";
import { useState } from "react";
import calculateWinner from "../../helper";

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);
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
  };
  return (
    <div>
      <div className="game-winner">
        {winner ? `Winner is ${winner}` : `Next turn is ${xIsNext ? "X" : "O"}`}
      </div>
      <Board cells={board} onClick={handleClick}></Board>
      <button className="game-reset" onClick={handleResetGame}>
        Reset Game
      </button>
    </div>
  );
}
