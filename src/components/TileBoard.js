import React, {useState} from 'react';
import Tile from "./Tile";
import styled from 'styled-components';

const TileBoard = (props) =>{
        const [board, setBoard] = useState(props.board);

   

        return(
            <div>
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
            </div>
        )
}
export default TileBoard;