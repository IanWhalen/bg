goog.provide('bg.Board');

goog.require('goog.events');
goog.require('lime.Sprite');
goog.require('lime.animation.MoveTo');
goog.require('bg.Charactor');
goog.require('bg.Foe');
goog.require('bg.Location');

/**
 * Board object. Manages the playing field.
 * @param {lime.Game} game
 * @param {text} charactor Name of charactor
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
        var loc = new bg.Location(locMap[key]);
        loc.qualityRenderer = true;
        this.back.appendChild(loc);
    };

    // create layer to contain Charactor
    this.charLayer = new lime.Layer();
    this.appendChild(this.charLayer);
    this.addCharactor(this.game.charactor);

    // create layer to contain Foes
    this.foeLayer = new lime.Layer();
    this.appendChild(this.foeLayer);
    var foeStartLoc = locMap['loc6'];
    this.addFoe(foeStartLoc);

    // register listener
    goog.events.listen(this, ['mousedown', 'touchstart'], this.pressHandler_);

};
goog.inherits(bg.Board, lime.Sprite);

/**
 * Add a new foe sprite to the board
 * @param {}
 */ 
bg.Board.prototype.addFoe = function(loc) {
    this.foe = new bg.Foe();
    this.foe.loc = loc;
    this.foe.moveShape = 'cross';
    this.foe.setPosition(loc.positionX + (loc.sizeX / 2), loc.positionY + (loc.sizeY / 2));
    this.foe.setSize(this.GAP, this.GAP);
    this.foeLayer.appendChild(this.foe);
};

/**
 * Add a new charactor sprite to the board
 * @param {text} charName Name of charactor.
 */
bg.Board.prototype.addCharactor = function(charName) {
    this.charactor = new bg.Charactor(charName);
    this.charactor.setPosition(this.charactor.loc.positionX + (this.charactor.loc.sizeX / 2),
        this.charactor.loc.positionY + (this.charactor.loc.sizeY / 2));
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

bg.Board.prototype.checkCombat = function(charactor, foeLayer) {
    for (var each in foeLayer.children_) {
        var foe = foeLayer.children_[each];
        if (charactor.loc.name == foe.loc.name) {
            charactor.health -= 1;
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
    this.isMoving_ = 1;
    var move = new lime.animation.MoveTo(clickLoc.positionX + (clickLoc.sizeX / 2), clickLoc.positionY + (clickLoc.sizeY / 2));
    charactor.loc = clickLoc;
    charactor.runAction(move);
    goog.events.listen(move, lime.animation.Event.STOP, function() {
        this.isMoving_ = 0;
        this.checkCombat(this.charactor, this.foeLayer);
        charactor.moveCount -= 1;
        if (charactor.moveCount == 0) {
            this.game.turnPhase = 'FOE_MOVE';
        };
        },
        false, this);
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
              'blackMove': 'loc1',
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
                            'loc5':1,
                          },
              'blackMove': 'loc2',
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
                            'loc6':1,
                          },
              'blackMove': 'loc3',
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
                            'loc7':1,
                          },
              'blackMove': 'loc7',
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
                            'loc5':1,
                            'loc8':1,
                          },
              'blackMove': 'loc0',
            },
    'loc5': {
              'name': 'loc5',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc1':1,
                            'loc4':1,
                            'loc6':1,
                            'loc9':1,
                          },
              'blackMove': 'loc4',
            },
    'loc6': {
              'name': 'loc6',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc2':1,
                            'loc5':1,
                            'loc7':1,
                            'loc10':1,
                          },
              'blackMove': 'loc5',
            },
    'loc7': {
              'name': 'loc7',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc3':1,
                            'loc6':1,
                            'loc11':1,
                          },
              'blackMove': 'loc6',
            },
    'loc8': {
              'name': 'loc8',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc4':1,
                            'loc9':1,
                            'loc12':1,
                          },
              'blackMove': 'loc4',
            },
    'loc9': {
              'name': 'loc9',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc5':1,
                            'loc8':1,
                            'loc10':1,
                            'loc13':1,
                          },
              'blackMove': 'loc8',
            },
    'loc10': {
              'name': 'loc10',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc6':1,
                            'loc9':1,
                            'loc11':1,
                            'loc14':1,
                          },
              'blackMove': 'loc11',
            },
    'loc11': {
              'name': 'loc11',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc7':1,
                            'loc10':1,
                            'loc15':1,
                          },
              'blackMove': 'loc7',
            },
    'loc12': {
              'name': 'loc12',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc8':1,
                            'loc13':1,
                          },
              'blackMove': 'loc13',
            },
    'loc13': {
              'name': 'loc13',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc9':1,
                            'loc12':1,
                            'loc14':1,
                          },
              'blackMove': 'loc14',
            },
    'loc14': {
              'name': 'loc14',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc10':1,
                            'loc13':1,
                            'loc15':1,
                          },
              'blackMove': 'loc13',
            },
    'loc15': {
              'name': 'loc15',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc11':1,
                            'loc14':1,
                          },
              'blackMove': 'loc11',
            },
};
