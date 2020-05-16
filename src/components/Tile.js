import React from "react";

const Tile = (props) =>{
    return(
        <div>
        {typeof props.item === "object" ? props.item.symbol : props.item}
        </div>
    )
}
export default Tile;