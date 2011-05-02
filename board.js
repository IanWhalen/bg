goog.provide('bg.Board');

goog.require('goog.events');
goog.require('lime.Sprite');
goog.require('lime.Button');
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

    // Create buttons
    this.endCharMoveBtn = new lime.GlossyButton('End Move Phase Here').setSize(200, 100).setPosition(500, 100).setOpacity(0);
    this.appendChild(this.endCharMoveBtn);
    
};
goog.inherits(bg.Board, lime.Sprite);


bg.Board.prototype.showEndMoveBtn = function() {
    // Get ready to notify board when button is displayed
    var show = new lime.animation.FadeTo(1);
    goog.events.listenOnce(show, lime.animation.Event.STOP, function() {
        this.dispatchEvent('btn_shown');
    }, false, this)
    
    // Start listening for button clicks
    goog.events.listenOnce(this.endCharMoveBtn, 'click', function() {
        this.endCharMove();
    }, false, this);

    // Display the button
    this.endCharMoveBtn.runAction(show);

}


bg.Board.prototype.hideEndMoveBtn = function() {
    var hide = new lime.animation.FadeTo(0);
    goog.events.listenOnce(hide, lime.animation.Event.STOP, function() {
        this.dispatchEvent('btn_hidden');
    }, false, this)

    this.endCharMoveBtn.runAction(hide);

}


bg.Board.prototype.endCharMove = function() {
    goog.events.listenOnce(this, 'btn_hidden', function() {
        this.charactor.moveCount = 0;
        this.game.takeClues(this.charactor, this.charactor.loc);
        this.game.drawMythosCard();
    });
    goog.events.unlisten(this, ['mousedown', 'touchstart'], this.game.charMovePressHandler_);
    
    this.hideEndMoveBtn();

}


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
            var startCombat = true;
            this.game.evadeOrFight(charactor, foe);
        }
    }
    if (!startCombat) this.dispatchEvent('char_move_safe');
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


/**
 * Move given charactor to specified location
 * @param {bg.Charactor} charactor
 * @param {bg.Location} clickLoc
 */
bg.Board.prototype.moveCharactor = function(charactor, clickLoc) {
    this.isMoving_ = 1;
    var move = new lime.animation.MoveTo(clickLoc.position_.x + (clickLoc.size_.width / 2),
        clickLoc.position_.y + (clickLoc.size_.height / 2));
    charactor.loc = clickLoc;
    goog.events.listen(move, lime.animation.Event.STOP, function() {
        this.isMoving_ = 0;
        charactor.moveCount -= 1;
        if (charactor.moveCount <= 0) this.endCharMove();
    }, false, this);
    
    charactor.runAction(move);

}
