import React, {useState, useEffect} from 'react';
import styled from "styled-components";
import Controls from "./components/Controls";
import "./App.css";
let Game = require("./classes/Game");
let Piece = require("./classes/Piece");

function App() {
  
  const [startPosition, setStartPosition] = useState({x:1, y:1});
  const [start, setStart] = useState(false);
  const Title = styled.h1`
    margin: 0 auto;
    margin-top: 3%;
    font-family: "Press Start 2P", cursive;
  `
  const Container = styled.div`
  margin: 0 auto;
    width: 80%;
    text-align: center;
  `
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
      <Container>
      <Title>Not Another Ordinary Bouncy Ball</Title>
      
      <Controls start={start} newPiece={piece} newGame={newGame}>
        
      </Controls>
      
      </Container>
    </div>
  );
}

export default App;
