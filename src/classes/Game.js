// module.exports = 
class Game {
  constructor() {
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
      ["X", "X", "X", "X", "X", "X", "X"],
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
      ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ];
    this.activeBoard = [];
  
    this.startPosition = { x: 0, y: 0 };
    this.activePosition = { x: 0, y: 0 };
    this.sound = false;
    this.on = false;
    this.piece = [];
  }
  chooseBoard(extended) {
    extended === true
      ? (this.activeBoard = this.extendedBoard)
      : (this.activeBoard = this.board);
  }

  placePiece(piece) {
    let { x, y } = piece.position;
    
    this.activeBoard[x][y] = piece;
  }

  returnBoard() {
  
    return this.activeBoard;
    
  }
  countPosition(coordinate, vector) {
    return coordinate + 1 * vector;
  }
  searchForBorderDiagonally(piece) {
    let borderDiagonal = piece.vectorsDiagonal.filter((v) => {
      let borderX = this.countPosition(piece.position.x, v.x);
      let borderY = this.countPosition(piece.position.y, v.y);
      let result;
      if(this.activeBoard[borderX][borderY] === "X"){ 
      result = v;
      }
      return result;
    });
    return borderDiagonal;
  }
  searchForBorderAxially(piece) {
    let borderAxial = piece.vectorsAxial.filter((v) => {
      let borderX = this.countPosition(piece.position.x, v.x);
      let borderY = this.countPosition(piece.position.y, v.y);
      let result;
      if (this.activeBoard[borderX][borderY] === "X") {
        result= v;
      }
      return result;
    });
    return borderAxial;
  }


  play(piece) {
    let { x, y } = piece.position;
    let nextX = this.countPosition(x, piece.vector.x);
    let nextY = this.countPosition(y, piece.vector.y);
  
    let nextTile = this.activeBoard[nextX][nextY];
    this.activePosition = { x: nextX, y: nextY };

    //sprawdzamy czy następny kafelek to ściana (X) lub Y, jak X to zmieniamy wektor, jak Y to zmieniamy randomowo wektor i randomowo wyznaczamy miejsce dla Y
    if (nextTile === "X" || nextTile.symbol === "X") {
      let borderXY = this.searchForBorderDiagonally(piece);
      let borderZ = this.searchForBorderAxially(piece);
      if (borderXY.length === 2) {
        
        piece.changeVector(piece.vector, borderXY[0], false, false);
        
        piece.changeVector(piece.vector, borderXY[1], false, false);
        
      } else if (borderXY.length === 1) {
        piece.changeVector(piece.vector, borderXY[0],false, false);
      } else if (borderXY.length === 0 && borderZ.length > 0 ) {
        piece.changeVector(piece.vector, borderZ[0], false, true);
      }
      
      this.isStartingPosition(piece) === true
        ? (this.on = false)
        : (this.on = true);
    } else if (nextTile === "Y" || nextTile.symbol === "Y") {
      this.sound=false;
      let borderXY = this.searchForBorderDiagonally(piece);
      this.sound = true;
      this.activeBoard[nextX][nextY] = {
        position: { x, y },
        symbol: 0,
        checked: true,
      };
      piece.changeVector(piece.vector, borderXY[0], true);

      this.randomizeYPosition();

      this.isStartingPosition(piece) === true
        ? (this.on = false)
        : (this.on = true);
    } else {
      //zmieniamy obecny kafelek na 0 i checked
      this.activeBoard[x][y] = { position: { x, y }, symbol: 0, checked: true };

      //w następnym kafelku wstawiamy obiekt klasy Piece 1 i dla pionka zmieniamy pozycję startową
      piece.position = { x: nextX, y: nextY };
      this.activeBoard[nextX][nextY] = piece;
      this.isStartingPosition(piece) === true
        ? (this.on = false)
        : (this.on = true);
    }
  }
  isStartingPosition(piece) {
    return piece.position.x === piece.startPosition.x &&
      piece.position.y === this.startPosition.y
      ? true
      : false;
  }
  randomizeYPosition() {
    function getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    // let positions = this.activeBoard.filter(item=>{item==="0"||item.symbol==="0"})
    let x = getRandomInt(1, 11);
    let y = getRandomInt(1, 11);
    let newPlace = this.activeBoard[x][y];
    while (newPlace === "X" || newPlace === "Y") {
      x = getRandomInt(1, 11);
      y = getRandomInt(1, 11);
      newPlace = this.activeBoard[x][y];
    }
    this.activeBoard[x][y] = "Y";
  }
  checkTheSound(){
    return this.sound;
  }
};

let Piece = require("./Piece");

let piece = new Piece({x:1, y:1});
let game = new Game();
game.chooseBoard(false);
game.placePiece(piece);
game.on=true;
while(game.on===true){

    game.play(piece);
    console.table(game.returnBoard())
}

// console.log("DOOOOOOOONE")
