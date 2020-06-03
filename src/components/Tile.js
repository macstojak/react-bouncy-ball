import React from "react";
import "../css/tiles.css";

const Tile = (props) =>{
    
    const tdata = {
     
      color: props.item === "X"  ? "black"
      : props.item === "Y"
      ? "lime"
      : props.item.symbol === "1"
      ? "blue"
      : props.item.checked===true
      ? "gold"
      : "white"
    }
    return(
        <td style={tdata}>
                      { typeof props.item === "object" ? props.item.symbol : props.item}
                      
                  </td>
    )
}
export default Tile;