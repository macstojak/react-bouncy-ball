import React, {useState, useEffect, useRef} from 'react';
import Controls from "./components/Controls";
import "./App.css";
import "./css/main.css";
let Piece = require("./classes/Piece");

let Game = require("./classes/Game");
let pieceObj = new Piece();
        
pieceObj.setStartPosition({x:1,y:1});

function App() {
  const [startPosition, setStartPosition] = useState({x:1, y:1});
  const [start, setStart] = useState(false);
  
  function endGame(){
    setStart(true);
  }
  let newGame = new Game();
  newGame.chooseBoard(false);
  let piece = new Piece(startPosition);
  useEffect(()=>{
    newGame.on===true?this.endGame():setStart(false);
    
  }, [newGame.on])
  return (
    <div className="App">
      <div className="container">
      <h1 className="title">Not Another Ordinary Bouncy Ball</h1>
      <Controls start={start} newPiece={piece} newGame={newGame}/> 
      </div>
    </div>
  );
}

export default App;
