goog.provide('bg.Game');

goog.require('bg.Sideboard');

/** 
 * Game scene for test board game.
 * @constructor
 * @extends lime.Scene
 */
bg.Game = function(charName) {
    lime.Scene.call(this);

    this.turnPhase = 'PLAYER_MOVE';

    // empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    // make board
    this.board = new bg.Board(this, charName).setPosition(0, 174);

    // make sideboard
    this.sideboard = new bg.Sideboard(this);

    if(bg.isBrokenChrome()) this.board.SetRenderer(lime.Renderer.CANVAS);
    layer.appendChild(this.board);

    lime.scheduleManager.scheduleWithDelay(this.drawMythosCard, this, 100);

};
goog.inherits(bg.Game, lime.Scene);

// Draw mythos card and execute steps
bg.Game.prototype.drawMythosCard = function() {
    if (this.turnPhase == 'MYTHOS_PHASE') {
        var mythosCard = this.sideboard.mythosDeck.children_.pop();
        this.spawnGate(mythosCard);
        this.moveFoes(mythosCard);
    };
};

bg.Game.prototype.spawnGate = function(mythosCard) {
    var targetLoc = this.board.getLocFromName(mythosCard.spawnLoc);
    if (targetLoc.gate) {
        this.foeSurge();
    } else {
        targetLoc.gate = this.sideboard.gateStack.children_.pop();
        targetLoc.setFill('#CCC');
        this.board.addFoe(targetLoc);
    };
}

bg.Game.prototype.foeSurge = function() {
    var locArray = this.board.map.children_;
    for (var each in locArray) {
        if (locArray[each].gate) {
            this.board.addFoe(locArray[each]);
        }
    }
};

// Execute Move Foes step of Mythos phase
bg.Game.prototype.moveFoes = function(mythosCard) {
    foes_in_play = this.board.foeLayer.children_;

    for (var each in foes_in_play) {
        this.board.isMoving_ = 1;
        var foe = foes_in_play[each];

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
    this.board.charactor.moveCount = 1;
    this.turnPhase = 'PLAYER_MOVE';
}
