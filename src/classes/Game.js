class Game{
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

    }
    chooseBoard(extended){
        this.activeBoard = extended===true? this.extendedBoard : this.board;
   
    }
    placePiece(piece){
        let {x,y}=piece.position;
        this.activeBoard[x][y] = piece;
    }

    returnBoard(){
        return this.activeBoard;
    }
    returnNonOccupiedTiles(){
        return this.activeBoard.filter(row=>row.filter(item=>item.checked===false));
    }
    play(piece){
        let {x, y} = piece.position;
        let nextX = piece.position.x+1*piece.vector.x;
        let nextY = piece.position.y+1*piece.vector.y;
        let nextTile = this.activeBoard[nextX][nextY];
        
        //sprawdzamy czy następny kafelek to ściana (X) lub Y, jak X to zmieniamy wektor, jak Y to zmieniamy randomowo wektor i randomowo wyznaczamy miejsce dla Y
        if(nextTile==="X" || nextTile.symbol==="X"){
            piece.changeVector(piece.vector);
            nextX = piece.position.x+1*piece.vector.x;
            nextY = piece.position.y+1*piece.vector.y;
            this.activeBoard[x][y]={position:{x,y}, symbol:0};
            
            //w następnym kafelku wstawiamy obiekt klasy Piece 1 i dla pionka zmieniamy pozycję startową
            piece.position = {x:nextX,y:nextY};
            this.activeBoard[nextX][nextY] = piece;
            this.play(piece);
        }else if(nextTile==="Y" || nextTile.symbol==="Y"){
            piece.changeVector(piece.vector);
            nextX = piece.position.x+1*piece.vector.x;
            nextY = piece.position.y+1*piece.vector.y;
            this.activeBoard[x][y]={position:{x,y}, symbol:0};
            //w następnym kafelku wstawiamy obiekt klasy Piece 1 i dla pionka zmieniamy pozycję startową
            piece.position = {x:nextX,y:nextY};
            this.activeBoard[nextX][nextY] = piece;
            this.play(piece);
        }else{
            //zmieniamy obecny kafelek na 0 i checked
            this.activeBoard[x][y]={position:{x,y}, symbol:0};
            
            //w następnym kafelku wstawiamy obiekt klasy Piece 1 i dla pionka zmieniamy pozycję startową
            piece.position = {x:nextX,y:nextY};
            this.activeBoard[nextX][nextY] = piece;
            this.play(piece);  
        }
    }
    isEveryTileFilled(){
        let result;
        let board = this.activeBoard.filter(row=>{
            row.filter(item=>{
                if(item.symbol===0 && item.checked===false){
                    return item;
                }
            })
        })
        
        board.length>0 ? result = false : result = true;
        return result;
    }
   
}
let Piece = require("./Piece");

let piece = new Piece({x:1, y:1});
let game = new Game();
game.chooseBoard(false);
game.placePiece(piece);
game.play(piece);