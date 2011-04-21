goog.provide('bg.Game');

goog.require('bg.Sideboard');

/** 
 * Game scene for test board game.
 * @constructor
 * @extends lime.Scene
 */
bg.Game = function(charName) {
    lime.Scene.call(this);

    // empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    // make board
    this.board = new bg.Board(this, charName).setPosition(0, 0);

    // make sideboard
    this.sideboard = new bg.Sideboard(this);

    if(bg.isBrokenChrome()) this.board.SetRenderer(lime.Renderer.CANVAS);
    layer.appendChild(this.board);

    lime.scheduleManager.callAfter(this.drawMythosCard, this, 100);

};
goog.inherits(bg.Game, lime.Scene);


// Draw mythos card and execute steps
bg.Game.prototype.drawMythosCard = function() {
    this.turnPhase == 'MYTHOS_PHASE';
    var mythosCard = this.sideboard.mythosDeck.children_.pop();
    this.spawnGate(mythosCard);
    this.moveFoes(mythosCard);
    this.charactorMovePhase();
};


bg.Game.prototype.spawnGate = function(mythosCard) {
    var targetLoc = this.board.getLocFromName(mythosCard.spawnLoc);
    if (targetLoc.gate) {
        this.foeSurge();
    } else {
        targetLoc.gate = this.sideboard.gateStack.children_.pop();
        targetLoc.setFill('#CCC');
        this.sideboard.spawnFoe(targetLoc);
    };
}


// Foe Surge occurs if spawnGate happens on an existing gate
bg.Game.prototype.foeSurge = function() {
    var locArray = this.board.map.children_;
    for (var each in locArray) {
        if (locArray[each].gate) {
            this.sideboard.spawnFoe(locArray[each]);
        }
    }
};


// Execute Move Foes step of Mythos phase
bg.Game.prototype.moveFoes = function(mythosCard) {
    var foes_in_play = this.board.foeLayer.children_;

    for (var each in foes_in_play) {
        var foe = foes_in_play[each];
        if (foe.loc.name == this.board.charactor.loc.name) continue;
        this.board.isMoving_ = 1;

        // Determine if foe should move along black or white path, if at all
        if (foe.moveShape in mythosCard.blackMove) {
            var moveDir = 'blackMove';
        } else if (foe.moveShape in mythosCard.whiteMove) {
            var moveDir = 'whiteMove';
        } else {
            this.board.isMoving_ = 0;
            continue;
        }

        var currentLoc = this.board.getLocFromName(foe.loc.name);
        var targetLoc = this.board.getLocFromName(currentLoc[moveDir]);

        var move = new lime.animation.MoveTo(targetLoc.position_.x + (targetLoc.size_.width / 2),
            targetLoc.position_.y + (targetLoc.size_.height / 2));
        foe.loc = targetLoc;
        foe.runAction(move);
        goog.events.listen(move, lime.animation.Event.STOP, function() {
        this.board.checkCombat(this.board.charactor, this.board.foeLayer);
        this.board.isMoving_ = 0;
        },
            false, this);
    }
    this.sideboard.mythosDiscard.children_.push(mythosCard);
}


bg.Game.prototype.charactorMovePhase = function() {
    this.turnPhase = 'PLAYER_MOVE';
    this.board.charactor.moveCount = this.board.charactor.speed;

    goog.events.listen(this.board, ['mousedown', 'touchstart'], this.charMovePressHandler_);
}


/**
 * Handle key presses during player movement phase
 * @param {lime.Event} e
 */
bg.Game.prototype.charMovePressHandler_ = function(e) {
    if (this.isMoving_) return;

    var clickPos = e.position;
    var clickLoc = this.getLoc(clickPos);
    if (!clickLoc) return;
    var charLoc = this.charactor.loc;

    if (clickLoc.name in charLoc.adjacent) {
        this.checkCombat(this.charactor, this.foeLayer);
        this.moveCharactor(this.charactor, clickLoc);
    }
}


bg.Game.prototype.takeClues = function(charactor, loc) {
    if (charactor.loc.clueCount) {
        charactor.clueCount += charactor.loc.clueCount;
        charactor.loc.clueCount = 0;
    };
}


bg.Game.prototype.evadeOrFight = function(charactor, foe) {
    var scene = new bg.EvadeOrFight(charactor, foe);
    bg.director.replaceScene(scene, lime.transitions.SlideInUp);
}
