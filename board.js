goog.provide('bg.Board');

goog.require('goog.events');
goog.require('lime.Sprite');
goog.require('lime.animation.MoveTo');
goog.require('bg.Charactor');
goog.require('bg.Foe');
goog.require('bg.Location');

/**
 * Board object. Manages the playing field.
 * @param {number} rows, Number of rows on board.
 * @param {number} columns, Number of columns on board.
 * @param {lime.Game} game
 * @constructor
 * @extends lime.Sprite
 */
bg.Board = function(game) {
    lime.Sprite.call(this);

    this.game = game;

    /**
     * @const
     * @type {number}
     */
    this.SIZE = 720;

    this.setSize(this.SIZE, this.SIZE).setAnchorPoint(0, 0);

    // space that one bubble takes up
    this.GAP = 180;

    // create layer to contain Locations
    this.back = new lime.Layer().setSize(690, 690).setAnchorPoint(0, 0).setPosition(0, 0);
    this.appendChild(this.back);
    for (var key in locMap) {
        var obj = locMap[key];
        var loc = new lime.Sprite().setSize(obj['sizeX'], obj['sizeY']).
          setAnchorPoint(obj['anchorX'], obj['anchorY']).
          setPosition(obj['positionX'], obj['positionY']).
          setFill(obj['fillColor']);
        loc.qualityRenderer = true;
        this.back.appendChild(loc);
    };

    // create layer to contain Charactor
    this.charLayer = new lime.Layer();
    this.appendChild(this.charLayer);
    var charactorStartLoc = locMap['loc0'];
    this.addCharactor(charactorStartLoc);

    // create layer to contain Foes
    // this.foeLayer = new lime.Layer();
    // this.appendChild(this.foeLayer);
    // var foeStartLoc = 'loc0';
    // this.addFoe(foeStartLoc);

    // register listener
    goog.events.listen(this, ['mousedown', 'touchstart'], this.pressHandler_);

};
goog.inherits(bg.Board, lime.Sprite);

/**
 * Add locations to make board
 * @param {}
 */

/**
 * Add a new foe sprite to the board
 * @param {}
 */ 
bg.Board.prototype.addFoe = function(loc) {
    this.foe = new bg.Foe();
    this.foe.loc = loc;
    this.foe.setPosition(loc.positionX + (loc.sizeX / 2), loc.positionY + (loc.sizeY / 2));
    this.foe.setSize(this.GAP, this.GAP);
    this.foeLayer.appendChild(this.foe);
};

/**
 * Add a new charactor sprite to the board
 * @param {}
 */
bg.Board.prototype.addCharactor = function(loc) {
    this.charactor = new bg.Charactor();
    this.charactor.loc = loc;
    this.charactor.setPosition(loc.positionX + (loc.sizeX / 2), loc.positionY + (loc.sizeY / 2));
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

    var clickPos = e.position;

    // get location name for the touch event
    var clickLoc = this.getLoc(clickPos);
    var charLoc = this.charactor.loc

    if (bg.Game.turnPhase = 'PLAYER_MOVE') {
      if (clickLoc.name in charLoc.adjacent) {
          // if selected loc are adjacent then move
          this.moveCharactor(this.charactor, clickLoc);
      }
    }
};

/**
 * Return board location matching xy coords
 * @param {}
 * @return {}
 */
bg.Board.prototype.getLoc = function(pos) {
    for (var each in locMap) {
        var loc = locMap[each]
        if (loc.positionX < pos.x && pos.x < (loc.positionX + loc.sizeX) &&
            loc.positionY < pos.y && pos.y < (loc.positionY + loc.sizeY)) {
            return loc;
        };
    };
};

bg.Board.prototype.moveCharactor = function(charactor, clickLoc) {
    var move = new lime.animation.MoveTo(clickLoc.positionX + (clickLoc.sizeX / 2), clickLoc.positionY + (clickLoc.sizeY / 2));
    charactor.runAction(move);
    charactor.loc = clickLoc;
};

/**
 *
 */
var locMap = {
    'loc0': {
              'name': 'loc0',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 0,
              'fillColor': '#295081',
              'adjacent': {
                            'loc1':1,
                            'loc4':1,
                          },
            },
    'loc1': {
              'name': 'loc1',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 0,
              'fillColor': '#FF0000',
              'adjacent': {
                            'loc0':1,
                            'loc2':1,
                          },
            },
    'loc2': {
              'name': 'loc2',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 0,
              'fillColor': '#295081',
              'adjacent': {
                            'loc1':1,
                            'loc3':1,
                          },
            },
    'loc3': {
              'name': 'loc3',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 0,
              'fillColor': '#CCC',
              'adjacent': {
                            'loc2':1,
                          },
            },
    'loc4': {
              'name': 'loc4',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc0':1,
                          },
            }
};
