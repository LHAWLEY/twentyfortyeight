function Tile(value){
  this.value = value;
  this.hasMerged = false;
  this.isNew = false;
}

Tile.prototype.toJSON = function() {
  return { value: this.value, hasMerged: this.hasMerged, isNew: this.isNew }
};

