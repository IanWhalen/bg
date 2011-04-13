goog.provide('bg.Game');

/** 
 * Game scene for test board game.
 * @constructor
 * @extends lime.Scene
 */
bg.Game = function() {
    lime.Scene.call(this);

    this.turnPhase = 'PLAYER_MOVE';

    // empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    // make board
    this.board = new bg.Board(3, 3, this).setPosition(0, 174);

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

};
goog.inherits(bg.Game, lime.Scene);

// Change to foe move stage if player moves are done
bg.Game.prototype.moveFoes = function() {
    if (bg.Board.charactor.moveCount == 0) {
        
    }
}

// Increase value of hits when hit count has changed
bg.Game.prototype.updateHealth = function() {
    var curHealth = parseInt(this.healthDisplay.getText(), 10);
    if (curHealth != this.board.charactor.health) {
        this.healthDisplay.setText(this.board.charactor.health);
    }
};
