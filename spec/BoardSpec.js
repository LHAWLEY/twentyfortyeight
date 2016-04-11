describe("Board", function(){
  it("it initializes a board when none is provided", function(){
    var board = new Board();

    expect(board.tiles).toEqual([0, 0, 0, 0,
                                 0, 0, 0, 0,
                                 0, 0, 0, 0,
                                 0, 0, 0, 0]);
  });

   it("it uses a board if one is provided", function(){
    var board = new Board([1, 2, 3, 4,
                           5, 6, 7, 8,
                           5, 6, 7, 8,
                           1, 2, 3, 4]);

    expect(board.tiles).toEqual([1, 2, 3, 4,
                                 5, 6, 7, 8,
                                 5, 6, 7, 8,
                                 1, 2, 3, 4]);
  });

  it("places a tile on the board", function(){
    var board = new Board();
    var updatedBoard = board.placeTile();

    expect(board.tiles).toContain(2);
  });

  it("places a tile randomly", function(){
    var board1 = new Board();
    var board2 = new Board();

    board1.placeTile();
    board2.placeTile();

    expect(board1.tiles).not.toEqual(board2.tiles);
  });

  it("places tiles only in empty spaces", function(){
    var board = new Board([2, 2, 2, 2,
                           2, 2, 2, 2,
                           2, 0, 2, 2,
                           2, 2, 2, 2]);
    board.placeTile();

    expect(board).not.toContain(0);
  });

  it("swaps the value at a given index with the value to its left", function(){
    var board = new Board([0, 0, 0, 0,
                           0, 0, 0, 0,
                           0, 0, 2, 0,
                           0, 0, 0, 0]);

    board.swap(10);

    expect(board.tiles).toEqual([0, 0, 0, 0,
                                 0, 0, 0, 0,
                                 0, 2, 0, 0,
                                 0, 0, 0, 0])
  });

  describe('is true when the index is against a wall and false when not', function(){
    it("is true when the index is 0", function(){
      var board = new Board();
      expect(board.isAgainstWall(0)).toBe(true);
    });

    it("is true when the index is against the left wall and false when it is not", function(){
      var board = new Board();
      expect(board.isAgainstWall(1)).toBe(false);
    });

    it("is true when the index is against the left wall and false when it is not", function(){
      var board = new Board();
      expect(board.isAgainstWall(4)).toBe(true);
    });

    it("is true when the index is against the left wall and false when it is not", function(){
      var board = new Board();
      expect(board.isAgainstWall(8)).toBe(true);
    });

    it("is true when the index is against the left wall and false when it is not", function(){
      var board = new Board();
      expect(board.isAgainstWall(12)).toBe(true);
    });
  });

  it("slides the values to the left wall", function(){
    var board = new Board([ 2, 0, 0, 0,
                            0, 2, 0, 0,
                            0, 0, 2, 0,
                            0, 0, 0, 2]);
    board.slideAll();
    expect(board.tiles).toEqual([2, 0, 0, 0,
                                 2, 0, 0, 0,
                                 2, 0, 0, 0,
                                 2, 0, 0, 0]);
  });

  it("slides the values to the left wall with merging", function(){
    var board = new Board([2, 0, 0, 2,
                           0, 2, 2, 2,
                           0, 0, 2, 2,
                           0, 0, 0, 2]);
    board.slideAll();
    expect(board.tiles).toEqual([4, 0, 0, 0,
                                 4, 2, 0, 0,
                                 4, 0, 0, 0,
                                 2, 0, 0, 0
]);
  });

  it("transposes a column into a row", function(){
    var board = new Board([1,  2,  3,  4,
                           5,  6,  7,  8,
                           9, 10, 11, 12,
                           13, 14, 15, 16]);
    var row = board.transpose(1);
    expect(row).toEqual([2, 6, 10, 14]);
  });

  it("rotates the board once", function(){
    var board = new Board([1,  2,  3,  4,
                           5,  6,  7,  8,
                           9, 10, 11, 12,
                           13, 14, 15, 16]);
    board.rotate();
    expect(board.tiles).toEqual([13,  9, 5, 1,
                                 14, 10, 6, 2,
                                 15, 11, 7, 3,
                                 16, 12, 8, 4]);
  });

  describe('rotates the board a given number of times', function(){
    it("rotates the board four times", function(){
      var board = new Board([1,  2,  3,  4,
                             5,  6,  7,  8,
                             9, 10, 11, 12,
                             13, 14, 15, 16]);
      board.rotateTimes(4)
      expect(board.tiles).toEqual([1,  2,  3,  4,
                                   5,  6,  7,  8,
                                   9, 10, 11, 12,
                                   13, 14, 15, 16]);

    });
  });

  it("rotating the board once is the same as calling rotate", function(){
    var board1 = new Board([1,  2,  3,  4,
                            5,  6,  7,  8,
                            9,  10, 11, 12,
                            13, 14, 15, 16]);

    var board2 = new Board([1,  2,  3,  4,
                            5,  6,  7,  8,
                            9,  10, 11, 12,
                            13, 14, 15, 16]);

    board1.rotate();
    board2.rotateTimes(1);
    expect(board1.tiles).toEqual(board2.tiles);
  });

  it("moves values against the left wall and merges similar values", function(){
    var board = new Board([2, 2, 0, 0,
                           0, 0, 0, 0,
                           0, 0, 0, 0,
                           0, 0, 0, 0]);
    board.merge(1);
    expect(board.tiles).toEqual([4, 0, 0, 0,
                                 0, 0, 0, 0,
                                 0, 0, 0, 0,
                                 0, 0, 0, 0]);
  });
});