goog.provide('bg.EvadeOrFight');

goog.require('bg.HorrorCheck');
goog.require('bg.EvadeCheck');
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
        var check = new bg.EvadeCheck(this.scene_);
    });
    goog.events.listen(this.btn_fight, 'click', function() {
        var check = new bg.HorrorCheck(this.scene_); 
    });

}
goog.inherits(bg.EvadeOrFight, lime.Scene);
