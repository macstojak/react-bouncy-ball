import React, {useState} from 'react';
import styled from "styled-components";
import Controls from "./components/Controls";
import "./App.css";
let Game = require("./classes/Game");
let Piece = require("./classes/Piece");

function App() {
  
  const [startPosition, setStartPosition] = useState({x:1, y:1});
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
  let newGame = new Game();
  newGame.chooseBoard(false);
  let piece = new Piece(startPosition);
  return (
    <div className="App">
      <Container>
      <Title>Not Another Ordinary Bouncy Ball</Title>
      
      <Controls newPiece={piece} newGame={newGame}>
        
      </Controls>
      
      </Container>
    </div>
  );
}

export default App;
