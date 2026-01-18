"use client";
import React, { useState, memo, useCallback, useEffect } from "react";

export default function TicTacToePage() {
  return (
    <main className="w-full h-svh text-white">
      <div className="grid w-full h-full place-content-center">
        <GameBoard></GameBoard>
      </div>
    </main>
  );
}

function GameBoard() {
  const [board, setBoard] = useState(new Array(9).fill(""));
  const [turn, setTurn] = useState(0); //0 | 1
  const [gameState, setGameState] = useState("active"); // idle | active | over

  // const handleClick = (index: number): void => {
  //   if (board[index] || gameState === "over") return;
  //   const newBoard = [...board];
  //   newBoard[index] = turn === 0 ? "X" : "O";
  //   if (!turn) setTurn(1);
  //   else setTurn(0);
  //   setBoard(newBoard);
  // };

  const handleClickk = useCallback(
    (index: number) => {
      setBoard((prevBoard) => {
        if (prevBoard[index] || gameState === "over") return prevBoard;
        const newBoard = [...prevBoard];
        console.log(prevBoard);
        const xCount = prevBoard.reduce((sum, curChar) => {
          return curChar === "X" ? sum + 1 : sum;
        }, 0);
        const oCount = prevBoard.reduce((sum, curChar) => {
          return curChar === "O" ? sum + 1 : sum;
        }, 0);
        console.log("X Count", xCount);
        console.log("O Count", oCount);
        if (xCount === oCount) newBoard[index] = "X";
        else newBoard[index] = "O";
        return newBoard;
      });
    },
    [gameState]
  );
  useEffect(() => {
    const winningPattern = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    winningPattern.forEach((pattern) => {
      if (
        board[pattern[0]] != "" &&
        board[pattern[0]] === board[pattern[1]] &&
        board[pattern[1]] === board[pattern[2]]
      ) {
        setGameState("over");
        console.log("winner", turn ? "X" : "O");
      }
    });
  }, [board]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-6">
        {board.map((item, index) => {
          return (
            <MGameTile handleClick={handleClickk} index={index} key={index}>
              {item}
            </MGameTile>
          );
        })}
        {gameState === "over" && <p>Game Over</p>}
      </div>
    </div>
  );
}

const MGameTile = memo(GameTile);

function GameTile({
  children,
  handleClick,
  index,
}: {
  children: React.ReactNode;
  handleClick: (index: number) => void;
  index: number;
}) {
  console.log("rendering tile", index);
  return (
    <button
      onClick={() => {
        handleClick(index);
      }}
      className="w-20 border-2 border-white text-6xl grid place-items-center aspect-square"
    >
      {children}
    </button>
  );
}
