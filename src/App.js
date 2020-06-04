import React, {useState} from 'react';
import Controls from "./components/Controls";
import "./App.css";
import "./css/main.css";
let Piece = require("./classes/Piece");

let Game = require("./classes/Game");

function App() {
  const [startPosition, setStartPosition] = useState({x:1, y:1});

  let newGame = new Game();
  newGame.chooseBoard(false);
  let piece = new Piece(startPosition);
 
  return (
    <div className="App">
      <div className="container">
      <h1 className="title">Not Another Ordinary Bouncy Ball</h1>
      <Controls newPiece={piece} newGame={newGame}/> 
      </div>
    </div>
  );
}

export default App;
