goog.provide('bg.Board');

goog.require('goog.events');
goog.require('lime.Sprite');
goog.require('lime.animation.MoveTo');
goog.require('bg.Charactor');

/**
 * Board object. Manages the playing field.
 * @param {number} rows, Number of rows on board.
 * @param {number} columns, Number of columns on board.
 * @param {lime.Game} game
 * @constructor
 * @extends lime.Sprite
 */
bg.Board = function(rows, cols, game) {
    lime.Sprite.call(this);

    this.game = game;

    /**
     * @const
     * @type {number}
     */
    this.SIZE = 690;

    this.rows = rows;
    this.cols = cols;

    this.setSize(this.SIZE, this.SIZE).setAnchorPoint(0, 0);

    // mask out edges so bubbles flowing in won't be over game controls
    this.maskSprite = new lime.Sprite().setSize(this.SIZE, this.SIZE).
      setFill(100, 0, 0, .1).setAnchorPoint(0, 0);
    this.appendChild(this.maskSprite);
    this.setMask(this.maskSprite);

    // space that one bubble takes up
    this.GAP = Math.round(this.SIZE / cols);

    // create layer to contain Charactor
    this.charLayer = new lime.Layer();
    this.appendChild(this.charLayer);

    // load in player
    this.addCharactor(2, 2);

    // register listener
    goog.events.listen(this, ['mousedown', 'touchstart'], this.pressHandler_);

};
goog.inherits(bg.Board, lime.Sprite);

/**
 * Add a new charactor sprite to the board
 * @param {number} col
 * @param {number} row
 */
bg.Board.prototype.addCharactor = function(col, row) {
    this.charactor = new bg.Charactor();
    this.charactor.r = row;
    this.charactor.c = col;
    this.charactor.setPosition((col - .5) * this.GAP, (row - .5) * this.GAP);
    this.charactor.setSize(this.GAP, this.GAP);
    this.charLayer.appendChild(this.charactor);
};

/**
 * Handle presses on the board
 * @param {lime.Event} e Event.
 */
bg.Board.prototype.pressHandler_ = function(e) {
    // no touching allowed when still moving
    if (this.isMoving_) return;

    var pos = e.position;

    // get row and col values for the touch
    // var clickCol = Math.floor(pos.x / this.GAP);
    var clickCol = Math.ceil(pos.x / this.GAP);
    var clickRow = Math.ceil(pos.y / this.GAP);

    if (this.checkAdjacent(this.charactor, clickCol, clickRow)) {
        // if charactor and selected loc are adjacent then move
        this.moveCharactor(this.charactor, clickCol, clickRow);
    }

};

/**
 * Return true if charactor and clicked location are adjacent
 * @param {bg.Charactor} charactor
 * @param {number} clickCol
 * @param {number} clickRow
 * @return {boolean} Adjacent or not
 */
bg.Board.prototype.checkAdjacent = function(charactor, clickCol, clickRow) {
    return charactor.r == clickRow && Math.abs(charactor.c - clickCol) == 1 ||
           charactor.c == clickCol && Math.abs(charactor.r - clickRow) == 1;
};

bg.Board.prototype.moveCharactor = function(charactor, clickCol, clickRow) {
    this.isMoving_ = 1;
    var move = new lime.animation.MoveTo((clickCol - .5) * this.GAP, (clickRow - .5) * this.GAP);
    charactor.runAction(move);
    charactor.c = clickCol;
    charactor.r = clickRow;
    this.isMoving_ = 0; 
};
