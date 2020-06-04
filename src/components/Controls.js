import React, {useState, useEffect} from "react";
import '../css/buttons.css';
import Board from "./Board";

const Controls = (props) => {
  const [piece, setPiece] = useState(props.newPiece);
  const [board, setBoard] = useState();
  const [level, setLevel] = useState(false);
  const [start, setStart] = useState(false);

 
  useEffect(()=>{
      if(start===true){
        props.newGame.placePiece(piece);
        props.newGame.play(piece);
      }
    }, [start, piece, props.newGame])
  
   

    useEffect(()=>{
     
        props.newGame.chooseBoard(level)
        let b = props.newGame.returnBoard();
        setBoard(b);
      
    }, [level, props.newGame])
    
   
 
  return (
    <div>
       
        <h3 className="level-label">Choose mode:</h3>
        <button className="level-button"
        onClick={
          e=>setLevel(!level)
        }
      >
        {level === false ? "Easy" : "Hard"}
      </button>
      <br/>
      <button className="level-button"
        onClick={e=>setStart(!start)}
      >
       Start
      </button>
      <br/>
     
      <Board newPiece={piece} board={board} newGame={props.newGame}></Board>
    </div>
  );
};
export default Controls;
