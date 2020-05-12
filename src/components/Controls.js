import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic, faDeaf, faVolumeUp, faVolumeOff } from '@fortawesome/free-solid-svg-icons';
import MainTheme from "../classes/Audio";
let mainTheme = new MainTheme();

const Controls = (props) => {
  const [music, setMusic] = useState(true);
  const [sounds, setSounds] = useState(true);
  
  useEffect(()=>{
   
    music===true?mainTheme.play():mainTheme.stop();
  }, [music])
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
  return (
    <div>
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
      
    </div>
  );
};
export default Controls;
