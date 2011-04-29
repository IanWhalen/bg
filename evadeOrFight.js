goog.provide('bg.EvadeOrFight');

goog.require('lime.GlossyButton');
goog.require('bg.evade_skillCheck');


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

    this.choice = new lime.Sprite().setSize(800, 600).setFill('#CCC').setPosition(200, 200).setAnchorPoint(0, 0);

    var char_image = new lime.Sprite().setFill(charactor.circle.fill_.url_).setPosition(200, 200);
    var foe_image = new lime.Sprite().setFill(foe.circle.fill_.url_).setPosition(600, 200);
    this.choice.appendChild(char_image);
    this.choice.appendChild(foe_image);

    this.btn_evade = new lime.GlossyButton('Evade!').setPosition(300, 500).setSize(100, 100);
    this.btn_fight = new lime.GlossyButton('Fight!').setPosition(500, 500).setSize(100, 100);
    this.choice.appendChild(this.btn_evade);
    this.choice.appendChild(this.btn_fight);

    if (bg.isBrokenChrome()) this.choice.setRenderer(lime.renderer.CANVAS);
    this.appendChild(this.choice);
    
    goog.events.listen(this.btn_evade, 'click', function() {
        this.scene_.evade();
    });
    goog.events.listen(this.btn_fight, 'click', function() {
        // TODO: combat! 
    });

}
goog.inherits(bg.EvadeOrFight, lime.Scene);


bg.EvadeOrFight.prototype.evade = function() {
    this.choice.removeChild(this.btn_fight);
    this.choice.removeChild(this.btn_evade);
    var d = this.charactor.sneak + this.foe.awareness;
    var instruct = new lime.Label('Click squares to roll die:').setPosition(400, 400);
    this.choice.appendChild(instruct);
    for (i=0; i < d; i++) {
        var btn_die = new lime.GlossyButton('?').setPosition(200 + i * 100, 500).setSize(50, 50).setColor('#FFF');
        this.choice.appendChild(btn_die);
        goog.events.listenOnce(btn_die, 'click', function() {
            rollResult = Math.floor(Math.random() * 6 + 1);
            this.setText(rollResult);
            (rollResult > 4 ? this.setColor('#008000') : this.setColor('#FF0000'));
        })
    }
};
