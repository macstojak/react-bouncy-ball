import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import "../css/table.css";

const Board = (props) => {
  const [board, setBoard] = useState(props.newGame.returnBoard());

  useEffect(()=>{
    setBoard(props.newGame.returnBoard())
  }, [props]);


let tableStyle;

const tableSmall={
  
  width: "25%",
  margin: "0 auto",
  padding: "15px",
  marginTop: "5%",
  fontFamily: "Press Start 2P",
  border: "2px solid white"
}
const tableBig={
  width: "50%",
  margin: "0 auto",
  padding: "15px",
  marginTop: "5%",
  fontFamily: "Press Start 2P",
  border: "2px solid white"
}
if(board.length>10){
  tableStyle=tableBig;
}else{
  tableStyle=tableSmall;
}
 
  return(
    <div>
      
    
       <table style={tableStyle} >
        <tbody>
        {board.map((row, i) => {
         
          return (
          <tr key={i}>
              {row.map((item, j) => {
              return (
                <Tile item={item}></Tile>
                 
              );
              })}
          </tr>
          );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default Board;
