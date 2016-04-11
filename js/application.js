$(document).ready(function() {
  var newBoard = new Board();
  newBoard.placeTile();
  var el = document.querySelector('.board');
  var newView = new View(el, newBoard);
  newView.render();

  $(document).on('keyup', function(event){
    switch (event.keyCode){
      case 37:
        newBoard.move('left');
        break;
      case 38:
        newBoard.move('up');
        break;
      case 39:
        newBoard.move('right');
        break;
      case 40:
        newBoard.move('down');
        break;
    }
    newView.render();
  })
});