function Tile(value){
  this.value = value;
  this.hasMerged = false;
  this.isNew = false;
}

Tile.prototype.toJSON = function() {
  return { value: this.value, hasMerged: this.hasMerged, isNew: this.isNew }
};
// new functionality //

// wasMerged status changes to true
// when a tile has been merged once


// a player wins when the tile value is 2048


// add animation
  // new tile
  // merged tile



// [{value: 0, wasMerged: false, isNew: ; direction, }