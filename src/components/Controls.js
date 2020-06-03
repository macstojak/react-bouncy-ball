import React, {useState, useEffect, useRef} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faDeaf, faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import MainTheme from "../classes/Audio";
import '../css/buttons.css';
import Board from "./Board";

let mainTheme = new MainTheme();

const Controls = (props) => {
  const [newGame, setNewGame] = useState(props.newGame);
  const [piece, setPiece] = useState(props.newPiece);
  const [sound, setSound] = useState()
  const [board, setBoard] = useState();
  const [music, setMusic] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [level, setLevel] = useState(false);
  const [start, setStart] = useState(props.start);
  

  useEffect(()=>{
   
    // music===true?mainTheme.play():mainTheme.stop();
  }, [music])

  useEffect(()=>{
      if(start===true){
        // newGame.placePiece(piece);
        // setPiece(piece);
        props.newGame.placePiece(piece);
        props.newGame.play(piece);
      }
    }, [start])
  
    useEffect(()=>{
    
      if(props.newGame.sound===true){
        mainTheme.crash();
      }
    }, [props.newGame.sound])

    useEffect(()=>{
      // if(data.length>0){
      //   data.splice(0, data.length)
      // }
      props.newGame.chooseBoard(level)
      let b = props.newGame.returnBoard();
      setBoard(b);

      // b.forEach(r=>{
      //   data.push(r);
      // })
     
    }, [level])
    
  
 
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
     
      <button className="music-button" onClick={(e) => setMusic(!music)}>
        {music === true ? (
          <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faDeaf}></FontAwesomeIcon>
        )}
      </button>
      <button className="music-button" onClick={(e) => setSounds(!sounds)}>
        {sounds === true ? (
          <FontAwesomeIcon icon={faVolumeUp}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faVolumeOff}></FontAwesomeIcon>
        )}
      </button>
      <br/>
      <button className="level-button"
        onClick={e=>{setStart(!start)}}
      >
        {start === true ? "Start" : "Start"}
      </button>
      <br/>
     
      <Board newPiece={piece} board={board} newGame={props.newGame}></Board>
    </div>
  );
};
export default Controls;
