goog.provide('bg.Game');

goog.require('bg.Sideboard');

/** 
 * Game scene for test board game.
 * @constructor
 * @extends lime.Scene
 */
bg.Game = function(charactor) {
    lime.Scene.call(this);

    this.charactor = charactor;
    this.turnPhase = 'PLAYER_MOVE';

    // empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    // make board
    this.board = new bg.Board(this).setPosition(0, 174);

    // make sideboard
    this.sideboard = new bg.Sideboard(this);

    if(bg.isBrokenChrome()) this.board.SetRenderer(lime.Renderer.CANVAS);
    layer.appendChild(this.board);

    // graphical lines for visual effect
    var line = new lime.Sprite().setSize(670, 2).setFill('#295081').setPosition(720 * .5, 148);
    layer.appendChild(line);
    var line = new lime.Sprite().setSize(670, 2).setFill('#295081').setPosition(720 * .5, 885);
    layer.appendChild(line);

    var health_lbl = new lime.Label().setFontFamily('Trebuchet MS').
      setFontColor('#4F96ED').setFontSize(24).setPosition(30, 22).
      setText('Hits:').setAnchorPoint(0, 0).setFontWeight(700);
    layer.appendChild(health_lbl);

    this.healthDisplay = new lime.Label().setFontColor('#000').setFontSize(92).
      setPosition(30, 40).setText(0).setAnchorPoint(0, 0).setFontWeight(700);
    layer.appendChild(this.healthDisplay);

    this.btn_menu = new lime.GlossyButton('Menu').setSize(140, 70).setPosition(100, 945);
    goog.events.listen(this.btn_menu, 'click', function() {
        bg.loadMenu();
    });
    this.appendChild(this.btn_menu);

    // update health when changed
    lime.scheduleManager.scheduleWithDelay(this.updateHealth, this, 100);

    lime.scheduleManager.scheduleWithDelay(this.moveFoes, this, 100);

};
goog.inherits(bg.Game, lime.Scene);

// Change to foe move stage if player moves are done
bg.Game.prototype.moveFoes = function() {
    if (this.turnPhase == 'FOE_MOVE') {
        var mythosCard = this.sideboard.mythosDeck.children_.pop();
        for (var each in this.board.foeLayer.children_) {
            this.board.isMoving_ = 1;
            var foe = this.board.foeLayer.children_[each];
            currentLoc = foe.loc.name;
            if (foe.moveShape in mythosCard.blackMove) {
                var targetLoc = locMap[locMap[currentLoc].blackMove];
            } else if (foe.moveShape in mythosCard.whiteMove) {
                var targetLoc = locMap[locMap[currentLoc].whiteMove];
            } else {
                this.board.isMoving_ = 0;
                continue;
            }
            var move = new lime.animation.MoveTo(targetLoc.positionX + (targetLoc.sizeX / 2), targetLoc.positionY + (targetLoc.sizeY / 2));
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
}

// Increase value of hits when hit count has changed
bg.Game.prototype.updateHealth = function() {
    var curHealth = parseInt(this.healthDisplay.getText(), 10);
    if (curHealth != this.board.charactor.health) {
        this.healthDisplay.setText(this.board.charactor.health);
    }
};
