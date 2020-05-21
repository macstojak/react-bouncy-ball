import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Controls from "./Controls";
import data from "../database/data.json";

const Board = (props) => {
 
  const [piece, setPiece] = useState(props.newPiece);
  const [board, setBoard] = useState(props.newGame.returnBoard());
  
  useEffect(()=>{
    setBoard(props.newGame.returnBoard())
  }, [props]);

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
    props.type === "X"  ? "black"
      : props.type === "Y"
      ? "lime"
      : props.type.symbol === "1"
      ? "blue"
      : props.type.checked===true
      ? "gold"
      : "white"};
`;
 
  return(
    <div>
      
    
       <Table lengthOfBoard={board.length}>
        <TBody>
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
