import React from "react";
import Cell from "./Cell";

export default function Board(props) {
  const { cells, onClick, winningLine = [] } = props;

  return (
    <div className="game-board">
      {cells.map((item, index) => {
        const isWinningCell = winningLine.includes(index);
        let className = "";

        if (item === "X") {
          className = "is-x";
        } else if (item === "O") {
          className = "is-o";
        }

        if (isWinningCell) {
          className += " winning-cell";
        }

        return (
          <Cell
            key={index}
            value={item}
            onClick={() => onClick(index)}
            className={className}
          />
        );
      })}
    </div>
  );
}
