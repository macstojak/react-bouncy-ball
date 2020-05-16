module.exports = class Game{
    constructor(){
        this.board = [
            ["X", "X", "X", "X", "X", "X", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "X"],
            ["X", "X", "X", "X", "X", "X", "X"]
          ];
          this.extendedBoard = [
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X", "X"],
            ["X", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X", "X"],
            ["X", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X", "X"],
            ["X", "0", "0", "0", "0", "0", "0", "0", "X", "X", "X", "X"],
            ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "X", "0", "0", "0", "0", "Y", "0", "X"],
            ["X", "0", "0", "X", "X", "X", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "X", "0", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "Y", "0", "0", "0", "0", "0", "0", "0", "X"],
            ["X", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "X"],
            ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"]
          ];
         this.activeBoard = [];
        this.startPosition={x:0, y:0};
        this.activePosition={x:0, y:0};
        this.on = false;
    }
    chooseBoard(extended){
        this.activeBoard = extended===true? this.extendedBoard : this.board;
   
    }
    placePiece(piece){
        let {x,y}=piece.position;
        this.startPosition={x, y};
        this.on=true;
        this.activeBoard[x][y] = piece;
    }

    returnBoard(){
        return this.activeBoard;
    }
  
    play(piece){
        let {x, y} = piece.position;
        let nextX = piece.position.x+1*piece.vector.x;
        let nextY = piece.position.y+1*piece.vector.y;
        let nextTile = this.activeBoard[nextX][nextY];
        this.activePosition={x:nextX, y:nextY};
       
       
        //sprawdzamy czy następny kafelek to ściana (X) lub Y, jak X to zmieniamy wektor, jak Y to zmieniamy randomowo wektor i randomowo wyznaczamy miejsce dla Y
        if(nextTile==="X" || nextTile.symbol==="X"){
            let borderXY = piece.vectorsDiagonal.filter(v=>{
                let borderX = piece.position.x+1*v.x;
                let borderY = piece.position.y+1*v.y;
                if(this.activeBoard[borderX][borderY] === "X"){
                    return v;
                }
               
             })
            
             if(borderXY.length===2){
                piece.changeVector(piece.vector,borderXY[0]);
                piece.changeVector(piece.vector,borderXY[1]);
               
             }else{
                piece.changeVector(piece.vector, borderXY[0])
             }
            
             
             this.isStartingPosition(piece)===true?this.on=false: setTimeout(()=>{this.play(piece)},1000); 
      
          
          
            }else if(nextTile==="Y" || nextTile.symbol==="Y"){
            let borderXY = piece.vectorsDiagonal.filter(v=>{
                let borderX = piece.position.x+1*v.x;
                let borderY = piece.position.y+1*v.y;
                if(this.activeBoard[borderX][borderY] === "X"){
                    return v;
                }
             })
            
            piece.changeVector(piece.vector, borderXY);
        
            this.isStartingPosition(piece)===true?this.on=false:setTimeout(()=>{this.play(piece)},1000);
           
        }else{
            //zmieniamy obecny kafelek na 0 i checked
            this.activeBoard[x][y]={position:{x,y}, symbol:0, checked:true};
           
            //w następnym kafelku wstawiamy obiekt klasy Piece 1 i dla pionka zmieniamy pozycję startową
            piece.position = {x:nextX,y:nextY};
            this.activeBoard[nextX][nextY] = piece;
            this.isStartingPosition(piece)===true?this.on=false: setTimeout(()=>{this.play(piece)},1000);
           
        }
    
    }
    isStartingPosition(piece){
        return piece.position.x===piece.startPosition.x && piece.position.y===this.startPosition.y ?true:false;
    }
    
}

// let Piece = require("./Piece");

// let piece = new Piece({x:1, y:1});
// let game = new Game();
// game.chooseBoard(false);
// game.placePiece(piece);
// game.on=true;
// while(game.on===true){

//     game.play(piece);
// }
   
// console.log("DOOOOOOOONE")