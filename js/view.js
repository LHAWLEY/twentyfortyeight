function View(el, model){
  this.el = el;
  this.model = model;
}

View.prototype.template = function(){
  var tiles = this.model.toJSON()
  var html = ''
  for (var i = 0; i < tiles.length; i++){
    var tile = tiles[i],
        tileValue = tile.value === 0 ? '' : tile.value,
        emptyClass = tile.value === 0 ? 'empty' : '',
        newClass = tile.isNew ? 'new-tile' : '',
        mergeClass = tile.hasMerged ? 'merged' : '',
        allClasses = ['tile', emptyClass, newClass, mergeClass].join(' ');

    html += '<div class="' + allClasses + '">' + tileValue + '</div>';
  }
  return html
}

View.prototype.render = function(){
  this.el.innerHTML = this.template();
}