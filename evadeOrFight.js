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

    var layer = new lime.Layer();
    this.appendChild(layer);

    this.choice = new lime.Sprite().setSize(800, 600).setFill('#CCC').setPosition(200, 200).setAnchorPoint(0, 0);

    var char_image = new lime.Sprite().setFill(charactor.circle.fill_.url_).setPosition(200, 200);
    var foe_image = new lime.Sprite().setFill(foe.circle.fill_.url_).setPosition(600, 200);
    this.choice.appendChild(char_image);
    this.choice.appendChild(foe_image);

    var btn_evade = new lime.GlossyButton('Evade!').setPosition(300, 500).setSize(100, 100);
    var btn_fight = new lime.GlossyButton('Fight!').setPosition(500, 500).setSize(100, 100);
    this.choice.appendChild(btn_evade);
    this.choice.appendChild(btn_fight);

    goog.events.listen(btn_evade, 'click', function() {
            // TODO: run away!
    });
    goog.events.listen(btn_fight, 'click', function() {
           // TODO: combat! 
    });

    if (bg.isBrokenChrome()) this.choice.setRenderer(lime.renderer.CANVAS);
    layer.appendChild(this.choice);

}
goog.inherits(bg.EvadeOrFight, lime.Scene);
