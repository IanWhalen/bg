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
bg.Board = function(game, charName) {
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
    this.map = new lime.Layer().setSize(690, 690).setAnchorPoint(0, 0).setPosition(0, 0);
    this.appendChild(this.map);
    for (var key in locMap) {
        var loc = new bg.Location(locMap[key]);
        this.map.appendChild(loc);
    };

    // create layer to contain Charactor
    this.charLayer = new lime.Layer();
    this.appendChild(this.charLayer);
    this.charactor = new bg.Charactor(this, charName);
    this.charLayer.appendChild(this.charactor);

    // create layer to contain Foes
    this.foeLayer = new lime.Layer();
    this.appendChild(this.foeLayer);
    var foeStartLoc = this.getLocFromName('loc6');
    this.addFoe(foeStartLoc);

    // register listener
    goog.events.listen(this, ['mousedown', 'touchstart'], this.pressHandler_);

};
goog.inherits(bg.Board, lime.Sprite);

bg.Board.prototype.getLocFromName = function(name) {
    locArray = this.map.children_;
    for (var each in locArray) {
        if (locArray[each].name == name) return locArray[each];
    };
};

/**
 * Add a new foe sprite to the board
 * @param {}
 */ 
bg.Board.prototype.addFoe = function(loc) {
    this.foe = new bg.Foe();
    this.foe.loc = loc;
    this.foe.moveShape = 'cross';
    this.foe.setPosition(loc.position_.x + (loc.size_.width / 2), loc.position_.y + (loc.size_.height / 2));
    this.foe.setSize(this.GAP, this.GAP);
    this.foeLayer.appendChild(this.foe);
};

/**
 * Add a new charactor sprite to the board
 * @param {text} charName Name of charactor.
 */
bg.Board.prototype.addCharactor = function(charName) {
    this.charactor = new bg.Charactor(charName);
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
    for (var each in this.map.children_) {
        var loc = this.map.children_[each]
        if (loc.position_.x < pos.x && pos.x < (loc.position_.x + loc.size_.width) &&
            loc.position_.y < pos.y && pos.y < (loc.position_.y + loc.size_.height)) {
            return loc;
        };
    };
};

bg.Board.prototype.moveCharactor = function(charactor, clickLoc) {
    this.isMoving_ = 1;
    var move = new lime.animation.MoveTo(clickLoc.position_.x + (clickLoc.size_.width / 2),
        clickLoc.position_.y + (clickLoc.size_.height / 2));
    charactor.loc = clickLoc;
    charactor.runAction(move);
    goog.events.listen(move, lime.animation.Event.STOP, function() {
        this.isMoving_ = 0;
        this.checkCombat(this.charactor, this.foeLayer);
        charactor.moveCount -= 1;
        if (charactor.moveCount == 0) {
            this.game.turnPhase = 'MYTHOS_PHASE';
        };
        },
        false, this);
};
