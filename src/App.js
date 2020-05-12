import React from 'react';
import styled from "styled-components";
import Board from "./components/Board";
import "./App.css";

function App() {
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
  
  return (
    <div className="App">
      <Container>
      <Title>Not Another Ordinary Bouncy Ball</Title>
      
      <Board></Board>
      </Container>
    </div>
  );
}

export default App;
