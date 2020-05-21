

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
            ["X", "0", "0", "Y", "0", "X", "X", "X", "X", "X", "X", "X"],
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
         //9,9 13,4
        this.YPosition = [{x:9, y:9}, {x: 13, y:4}]
        this.startPosition={x:0, y:0};
        this.activePosition={x:0, y:0};
        this.on = false;
        this.piece = [];
    }
    chooseBoard(extended){
        extended===true? this.activeBoard=this.extendedBoard : this.activeBoard=this.board;
   
    }
 
    placePiece(piece){
        let {x,y}=piece.position;
        this.on=true;
        this.activeBoard[x][y] = piece;
    }

    returnBoard(){
        return this.activeBoard;
    }
  
    play(piece){
        let {x, y} = piece.position;
        let nextX = x+1*piece.vector.x;
        let nextY = y+1*piece.vector.y;
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
            
             this.isStartingPosition(piece)===true?this.on=false: this.on=true; 
           
          
          
            }else if(nextTile==="Y" || nextTile.symbol==="Y"){
                
            let borderXY = piece.vectorsDiagonal.filter(v=>{
                let borderX = piece.position.x+1*v.x;
                let borderY = piece.position.y+1*v.y;
                if(this.activeBoard[borderX][borderY] === "X"){
                    return v;
                }
             })
             this.activeBoard[nextX][nextY]={position:{x,y}, symbol:0, checked:true};
            piece.changeVector(piece.vector, borderXY[0], true);
            
            this.randomizeYPosition();
            
            this.isStartingPosition(piece)===true?this.on=false:this.on=true;
         
        }else{
            //zmieniamy obecny kafelek na 0 i checked
            this.activeBoard[x][y]={position:{x,y}, symbol:0, checked:true};
           
            //w następnym kafelku wstawiamy obiekt klasy Piece 1 i dla pionka zmieniamy pozycję startową
            piece.position = {x:nextX,y:nextY};
            this.activeBoard[nextX][nextY] = piece;
            this.isStartingPosition(piece)===true?this.on=false: this.on=true;
          
        }
    
    }
    isStartingPosition(piece){
        return (piece.position.x===piece.startPosition.x && piece.position.y===this.startPosition.y) ? true : false;
    }
    randomizeYPosition(){
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
          }
        // let positions = this.activeBoard.filter(item=>{item==="0"||item.symbol==="0"})
        let x = getRandomInt(1,11);
        let y = getRandomInt(1,11);
        let newPlace = this.activeBoard[x][y];
        while(newPlace==="X"|| newPlace==="Y"){
            x=getRandomInt(1,11);
            y=getRandomInt(1,11);
            newPlace = this.activeBoard[x][y];
        }
        this.activeBoard[x][y] = "Y";
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