goog.provide('bg.EvadeOrFight');

goog.require('lime.GlossyButton');


/**
 * Game scene for choice been evasion and fighting foes
 * @param {bg.Charactor} charactor
 * @param {bg.Foe} foe
 * @constructor
 */
bg.EvadeOrFight = function(charactor, foe) {
    lime.Scene.call(this);

    this.charactor = charactor;
    this.foe = foe;
    this.successes = 0;

    this.upperPane = new lime.Sprite().setSize(800, 300).setFill('#CCC').setPosition(200, 200).setAnchorPoint(0, 0);
    this.lowerPane = new lime.Sprite().setSize(800, 300).setFill('#CCC').setPosition(200, 500).setAnchorPoint(0, 0);

    var char_image = new lime.Sprite().setFill(charactor.circle.fill_.url_).setPosition(200, 200);
    var foe_image = new lime.Sprite().setFill(foe.circle.fill_.url_).setPosition(600, 200);
    this.upperPane.appendChild(char_image);
    this.upperPane.appendChild(foe_image);

    this.btn_evade = new lime.GlossyButton('Evade!').setPosition(300, 200).setSize(100, 100);
    this.btn_fight = new lime.GlossyButton('Fight!').setPosition(500, 200).setSize(100, 100);
    this.lowerPane.appendChild(this.btn_evade);
    this.lowerPane.appendChild(this.btn_fight);

    if (bg.isBrokenChrome()) this.choice.setRenderer(lime.renderer.CANVAS);
    this.appendChild(this.upperPane);
    this.appendChild(this.lowerPane);
    
    goog.events.listen(this.btn_evade, 'click', function() {
        this.scene_.evade();
    });
    goog.events.listen(this.btn_fight, 'click', function() {
        // TODO: combat! 
    });

}
goog.inherits(bg.EvadeOrFight, lime.Scene);


bg.EvadeOrFight.prototype.evade = function() {
    // Clear section of buttons
    this.lowerPane.removeAllChildren();

    // Determine # of die to display
    this.lowerPane.d = this.charactor.sneak + this.foe.awareness;

    // Create die objects and label
    var instruct = new lime.Label('Click squares to roll die:').setPosition(400, 100);
    this.lowerPane.appendChild(instruct);
    for (i=0; i < this.lowerPane.d; i++) {
        var btn_die = new lime.GlossyButton('?').setPosition(200 + i * 100, 200).setSize(50, 50).setColor('#FFF');
        this.lowerPane.appendChild(btn_die);
        goog.events.listenOnce(btn_die, 'click', function() {
          this.scene_.rollDie(this)
    });
    }

};


// Roll die and change display accordingly
bg.EvadeOrFight.prototype.rollDie = function(btn_die) {
    var rollResult = Math.floor(Math.random() * 6 + 1);

    // Change die based on result
    btn_die.setText(rollResult);
    this.lowerPane.d -= 1;
    if (rollResult > 4) {
        btn_die.setColor('#008000');
        btn_die.scene_.successes += 1;
    } else {
        btn_die.setColor('#FF0000');
    }

    // If all dice are rolled, move to board or fight scene
    if (!this.lowerPane.d) {
        if (this.successes) {
            var transition = bg.director.replaceScene(bg.gameScene, lime.transitions.SlideInDown);

            goog.events.listen(transition, 'end', function() {
                bg.gameScene.board.dispatchEvent('char_move_safe');
            });
        } else {
            this.fight();
        }
    }

}


bg.EvadeOrFight.prototype.fight = function() {
}
