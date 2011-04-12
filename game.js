goog.provide('bg.Game');

/** 
 * Game scene for test board game.
 * @constructor
 * @extends lime.Scene
 */
bg.Game = function() {
    lime.Scene.call(this);

    this.life = 0;
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

    var hits_lbl = new lime.Label().setFontFamily('Trebuchet MS').
      setFontColor('#4F96ED').setFontSize(24).setPosition(30, 22).
      setText('Hits:').setAnchorPoint(0, 0).setFontWeight(700);
    layer.appendChild(hits_lbl);

    this.hits = new lime.Label().setFontColor('#000').setFontSize(92).
      setPosition(30, 40).setText(0).setAnchorPoint(0, 0).setFontWeight(700);
    layer.appendChild(this.hits);

    this.btn_menu = new lime.GlossyButton('Menu').setSize(140, 70).setPosition(100, 945);
    goog.events.listen(this.btn_menu, 'click', function() {
        bg.loadMenu();
    });
    this.appendChild(this.btn_menu);

    // update hits when hits have changed
    lime.scheduleManager.scheduleWithDelay(this.updateHits, this, 100);

};
goog.inherits(bg.Game, lime.Scene);

// Increase value of hits when hit count has changed
bg.Game.prototype.updateHits = function() {
    var curhits = parseInt(this.hits.getText(), 10);
    if (curhits < this.life) {
        this.hits.setText(curhits + 1);
    };
};
