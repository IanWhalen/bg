goog.provide('bg.Game');

/** 
 * Game scene for test board game.
 * @constructor
 * @extends lime.Scene
 */
bg.Game = function() {
    lime.Scene.call(this);

    this.life = 0;
    
    // empty layer for contents
    var layer = new lime.Layer();
    this.appendChild(layer);

    // make board
    this.board = new bg.Board(6, 6, this).setPosition(25, 174);

    if(bg.isBrokenChrome()) this.board.SetRenderer(lime.Renderer.CANVAS);

    // static background bubbles for board
    var back = new lime.RoundedRect().setSize(690, 690).setAnchorPoint(0, 0).setPosition(17, 166).setRadius(30);
    for (var c = 0; c < this.board.cols; c++) {
        for (var r = 0; r < this.board.rows; r++) {
            var b = new lime.Sprite().setFill('assets/shadow.png').setAnchorPoint(0, 0).
                setSize(this.board.GAP * .94, this.board.GAP * .94).
                setPosition(11 + c * this.board.GAP, 11 + r * this.board.GAP);
            b.qualityRenderer = true; // no jagged edges in Moz
            back.appendChild(b);
        }
    }
    layer.appendChild(back);
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

// Show game over dialog
bg.Game.prototype.endGame = function() {
    
    // unregister the event listeners and schedulers
    goog.events.unlisten(this.board, ['mousedown', 'touchstart'], this.board.pressHandler_);
    lime.scheduleManager.unschedule(this.updateHits, this);

    var dialog = new lime.RoundedRect().setFill(0, 0, 0, .7).setSize(500, 480).
      setPosition(360, 260).setAnchorPoint(.5, 0).setRadius(20);
    this.appendChild(dialog);

    var title = new lime.Label().setText('Game Over!').setFontColor('#DDD').
      setFontSize(40).setPosition(0, 70);
    this.appendChild(title);

    var hits_lbl = new lime.Label().setText('Your Hits:').setFontSize(24).
      setFontColor('#CCC').setPosition(0, 145);
    dialog.appendChild(hits_lbl);

    var hits = new lime.Label().setText(this.hits).setFontSize(150).
      setFontColor('#FFF').setPosition(0, 240).setFontWeight(700);

    var btn = new lime.GlossyButton().setText('MAIN MENU').setSize(200, 90).
      setPosition(110, 400);
    dialog.append(btn);
    goog.events.listen(btn, lime.GlossyButton.event.CLICK, function() {
        bg.loadMenu();    
    });
};
