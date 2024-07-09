import { useState } from "react";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setCurrentMove(nextHistory.length - 1);
    setHistory(nextHistory);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="container">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}></Board>
      <div className="game-info row">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "winner is : " + winner;
  } else {
    status = "Next player is : " + (xIsNext ? "X" : "O");
  }

  const boardArray = [];

  Array(3).fill(null).map((rowValue, rowIndex) => {
    Array(3).fill(null).map(columnValue, columnIndex)
  });

  // for (let i = 0; i < 3; i++) {
  //   let squareColumnElements = [];
  //   for (let j = 0; j < 3; j++) {
  //     console.log(i * 3 + j);
  //     squareColumnElements.push(<Square key={i * 3 + j} value={squares[i * 3 + j]} onSquareClick={() => handleClick(i * 3 + j)} />);
  //   }
  //   squareElements.push(<div key={i} className="row justify-content-center ">{squareColumnElements}</div>);
  // }



  return (
    <div className="container mx-auto">
      <h1 className="row justify-content-center ">{status}</h1>
      {squareElements}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
