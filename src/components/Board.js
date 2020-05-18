import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Controls from "./Controls";
import data from "../database/data.json";
let Piece = require("../classes/Piece");
let Game = require("../classes/Game");

const Board = () => {
  const [level, setLevel] = useState(false);
  const [start, setStart] = useState(false);
  const [startPosition, setStartPosition] = useState({x:1, y:1});
  const [piece, setPiece] = useState();
  const [board, setBoard] = useState([]);

  let newGame = new Game();
  let newPiece = new Piece(startPosition);
  newGame.chooseBoard(level);
  useEffect(()=>{
  console.log("newGame", newGame)
    setPiece(newPiece);
    if(start===true){
      newGame.play(newPiece);
    }
    
  }, [start])

  useEffect(()=>{
    if(data.length>0){
      data.splice(0, data.length)
    }
    newGame.chooseBoard(level);
    console.log("activeBoard", newGame.activeBoard)
    newGame.placePiece(newPiece);
    setPiece(newPiece);
    let b = newGame.returnBoard();

    b.forEach(r=>{
      data.push(r);
    })
    setBoard(b);
  }, [level])

  const LevelLabel = styled.h2`
    font-family:"Press Start 2P", cursive;
    font-size: 22px;
    margin-bottom: 0;
  `
  const LevelButton = styled.button`
    position: block;
    margin-top: 1%;
    font-family: "Audiowide", cursive;
    font-size: 16px;
    padding: 5px;
    height: 10%;
    border: 5px solid indigo;
    width: 250px;
    background-color: white;
    color: indigo;
    &:hover {
      color: white;
      background-color: firebrick;
      font-weight: bold;
    }
  `;
  const StartButton = styled(LevelButton)``;
  const Table = styled.table`
    width: ${(props) => (props.lengthOfBoard <= 10 ? "25%" : "50%")};
    margin: 0 auto;
    padding: 15px;
    margin-top: 5%;
    font-family: "Press Start 2P", cursive;
    border: 2px solid white;
  `;
  const TBody = styled.tbody``;
  const NextButton = styled(LevelButton)``;

  const handleNextClick = () => {
   let {x,y} = piece.position;
      // data[x].splice(y,1, {position:{x, y}, symbol:0, checked:true})
      newGame.play(piece);
      // data[piece.position.x].splice(piece.position.y,1, piece);
      setBoard(newGame.returnBoard());
    setPiece(piece);
    
  }

  const TRow = styled.tr`
  margin: 0 auto;
`;
const TData = styled.td`
  margin: 0 auto;
  padding: 5px;
  color: ${(props) =>
    props.type === "X"  ? "black"
      : props.type === "Y"
      ? "lime"
      : props.type.symbol === "1"
      ? "blue"
      : props.type.checked===true
      ? "gold"
      : "white"};
`;
 
  return (
    <div>
        <Controls level={e=>level}></Controls>
        <LevelLabel>Choose mode:</LevelLabel>
        <LevelButton
        onClick={(e) => {
          setLevel(!level);
        }}
      >
        {level === false ? "Easy" : "Hard"}
      </LevelButton>
      <br/>
      <StartButton
        onClick={e=>{setStart(!start)}}
      >
        {start === true ? "Pause" : "Start"}
      </StartButton>
      <NextButton onClick={e=>handleNextClick()}>Kolejny ruch</NextButton>
       <Table lengthOfBoard={board.length}>
        <TBody>
          {console.table(board)}
        {board.map((row, i) => {
         
          return (
          <TRow key={i}>
              {row.map((item, j) => {
              return (
                  <TData key={j} type={item}>
                      { typeof item === "object" ? item.symbol : item}
                      
                  </TData>
              );
              })}
          </TRow>
          );
          })}
        </TBody>
      </Table>
    </div>
  );
};
export default Board;
