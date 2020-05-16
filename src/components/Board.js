import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Controls from "./Controls";
import Tile from "./Tile";

let Game = require("../classes/Game");
let Piece = require("../classes/Piece");

const Board = () => {
  const [level, setLevel] = useState(false);
  const [start, setStart] = useState(false);
  const [actualPosition, setActualPosition] = useState({x:1, y:1});
  const [board, setBoard] = useState([]);

  
  let newGame = new Game();
  let newPiece = new Piece(actualPosition);
    newGame.chooseBoard(level);
    
    newGame.placePiece(newPiece);
 
  useEffect(()=>{
   
    setBoard(newGame.returnBoard());
    newGame.play(newPiece);
    
  }, [start])

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

  const TRow = styled.tr`
    margin: 0 auto;
  `;
  const TData = styled.td`
    margin: 0 auto;
    padding: 5px;
    color: ${(props) =>
      props.type === "X"
        ? "black"
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
       <Table lengthOfBoard={board.length}>
        <TBody>
          {board.map((row, i) => {

            return (
              <TRow key={i}>
                {row.map((item, j) => {
                  return (
                    <TData key={j} type={item}>
                      <Tile item={item} i={i} j={j}></Tile>
                      
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
