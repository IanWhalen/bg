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

    this.SIZE = 1170;
    this.setSize(this.SIZE, this.SIZE).setAnchorPoint(0, 0);

    // space that one bubble takes up
    this.GAP = 90;

    // create layer to contain Locations
    this.map = new lime.Layer().setSize(360, 1080).setAnchorPoint(0, 0).setPosition(0, 0);
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

};
goog.inherits(bg.Board, lime.Sprite);

bg.Board.prototype.getLocFromName = function(name) {
    locArray = this.map.children_;
    for (var each in locArray) {
        if (locArray[each].name == name) return locArray[each];
    };
};

bg.Board.prototype.checkCombat = function(charactor, foeLayer) {
    for (var each in foeLayer.children_) {
        var foe = foeLayer.children_[each];
        if (charactor.loc.name == foe.loc.name) {
            this.game.evadeOrFight(charactor, foe);
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
        charactor.moveCount -= 1;
        if (charactor.moveCount <= 0) {
            goog.events.unlisten(this, ['mousedown', 'touchstart'], this.game.charMovePressHandler_);
            this.game.takeClues(charactor, charactor.loc);
            this.game.drawMythosCard();
        };
    },
    false, this);
};
