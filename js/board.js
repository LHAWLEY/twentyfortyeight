var ROTATIONS = {
  left:  0,
  down:  1,
  right: 2,
  up:    3,
  total: 4
};

function Board(tiles){
  this.tiles = tiles || this.getDefaultBoard();
  this.over = false
}

Board.prototype.getEmpties = function () {
  var emptyTiles = [];
  for (var i = 0; i < this.tiles.length; i++){
    if (this.tiles[i].value === 0){
      emptyTiles.push(i);
    }
  }
  return emptyTiles;
}

Board.prototype.placeTile = function(){
  var emptyTiles = this.getEmpties();

  if (emptyTiles.length === 0) {
    return this.over = true
  }

  var selectedTile = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]

  this.tiles[selectedTile].value = 2;
  this.tiles[selectedTile].isNew = true;
};

Board.prototype.swap = function(i){
  var currentIndex = i;
  var currentTileValue = this.tiles[i].value;
  var leftIndex = i - 1;
  var leftTileValue = this.tiles[i - 1].value;

  this.tiles[currentIndex].value = leftTileValue;
  this.tiles[leftIndex].value = currentTileValue;
};

Board.prototype.isAgainstWall = function(i){
  return i % 4 === 0
};

Board.prototype.isEmpty = function(i){
  return this.tiles[i].value === 0;
};

Board.prototype.slideAll = function(){
  for (var i = 0; i < this.tiles.length; i++) {
    if (!this.isEmpty(i)){
      this.slide(i);
    }
  }
};

Board.prototype.slide = function(index){
  for (var i = index; !this.isAgainstWall(i); i--){
    if (this.isEmpty(i - 1)){
      this.swap(i);
    } else if (this.tiles[i].value === this.tiles[i - 1].value && !this.tiles[i - 1].hasMerged && !this.tiles[i].hasMerged){
      this.merge(i);
    }
  }
};

Board.prototype.transpose = function(i){
  var column = [];
  for (i; i < this.tiles.length; i += 4) {
    column.push(this.tiles[i]);
  }
  return column;
};

Board.prototype.rotate = function(){
  var updatedBoard = [];
  for (var i = 0; i < 4; i++){
    updatedBoard = updatedBoard.concat(this.transpose(i).reverse());
  }
  this.tiles = updatedBoard;
};

Board.prototype.rotateTimes = function(number){
  for (number; number > 0; number--){
    this.rotate();
  }
};

Board.prototype.merge = function(i){
  var currentIndex = i;
  var leftIndex = i - 1;
  var currentTileValue = this.tiles[i].value;
  var leftTileValue = this.tiles[leftIndex].value;

  this.tiles[leftIndex].value = leftTileValue + currentTileValue;
  this.tiles[i].value = 0;
  this.tiles[leftIndex].hasMerged = true;
};

Board.prototype.getDefaultBoard = function(){
  var board = [];

  for (var i = 0; i < 16; i++){
    board.push(new Tile(0))
  }

  return board;
};

Board.prototype.move = function(direction){
  if (!this.over) {
    var numRotations = ROTATIONS[direction];

    this.rotateTimes(numRotations);
    this.slideAll();
    this.resetNewTile();
    this.placeTile();
    this.rotateTimes((ROTATIONS['total'] - numRotations) % 4);

    if (this.over) {
      alert('Game over!')
    } else {
      this.checkForWin();
    }
  this.resetMerged();
  }
};

Board.prototype.checkForWin = function(){
  for (var i = 0; i < this.tiles.length; i++) {
    if (this.tiles[i].value === 2048) {
      alert('You win!');
      this.over = true;
    }
  }
}

Board.prototype.toJSON = function(){
  var board = [];
  for (var i = 0; i < this.tiles.length; i++){
    board.push(this.tiles[i].toJSON());
  }
  return board;
};

Board.prototype.resetMerged = function(){
  for (var i = 0; i < this.tiles.length; i++){
    this.tiles[i].hasMerged = false;
  }
};

Board.prototype.resetNewTile = function(){
  for (var i = 0; i < this.tiles.length; i++){
    this.tiles[i].isNew = false;
  }
}