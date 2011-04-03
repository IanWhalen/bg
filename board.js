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
    this.addCharactor(1, 1);

    // start moving but give time to load
    // lime.scheduleManager.callAfter(this.moveCharactor, this, 700);

    // register listener
    // goog.events.listen(this, ['mousedown', 'touchstart'], this.pressHandler_);

};
goog.inherits(bg.Board, lime.Sprite);

bg.Board.prototype.addCharactor = function(row, col) {
    var charactor = bg.Charactor();
    charactor.r = row;
    charactor.c = col;
    charactor.setPosition(row, col);
    charactor.setSize(this.GAP, this.GAP);
    this.charLayer.appendChild(charactor);
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
    var c = Math.floor(pos.x / this.GAP);
    var r = this.rows - Math.ceil(pos.y / this.GAP);

};
