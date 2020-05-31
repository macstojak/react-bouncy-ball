import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faDeaf, faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import MainTheme from "../classes/Audio";
import data from "../database/data.json";

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
        newGame.placePiece(piece);
        setPiece(piece);
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
  const MusicButton = styled(LevelButton)`
        border-radius:50%;
        height: 50px;
        width: 50px;
       
   `;
   const SoundButton =styled(MusicButton)`
   `
   const LevelLabel = styled.h2`
   font-family:"Press Start 2P", cursive;
   font-size: 22px;
   margin-bottom: 0;
 `
 const StartButton = styled(LevelButton)``;
 
  return (
    <div>
        <LevelLabel>Choose mode:</LevelLabel>
        <LevelButton
        onClick={(e) => {
          setLevel(!level);
        }}
      >
        {level === false ? "Easy" : "Hard"}
      </LevelButton>
      <br/>
     
      <MusicButton onClick={(e) => setMusic(!music)}>
        {music === true ? (
          <FontAwesomeIcon icon={faMusic}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faDeaf}></FontAwesomeIcon>
        )}
      </MusicButton>
      <SoundButton onClick={(e) => setSounds(!sounds)}>
        {sounds === true ? (
          <FontAwesomeIcon icon={faVolumeUp}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faVolumeOff}></FontAwesomeIcon>
        )}
      </SoundButton>
      <br/>
      <StartButton
        onClick={e=>{setStart(!start)}}
      >
        {start === true ? "Start" : "Start"}
      </StartButton>
      <br/>
      <Board newPiece={piece} board={board} newGame={newGame}></Board>
    </div>
  );
};
export default Controls;
