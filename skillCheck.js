goog.provide('bg.HorrorCheck');
goog.provide('bg.EvadeCheck');


bg.SkillCheck = function(scene) {
}


bg.SkillCheck.prototype.setInfoLabel = function(text) {
    var instruct = new lime.Label(text).setPosition(400, 100);
    this.scene.lowerPane.appendChild(instruct);
}


bg.SkillCheck.prototype.setDice = function(d) {
    for (var i=0; i < d; i++) {
        var btn_die = new lime.GlossyButton('?').setPosition(200 + i * 100, 200).setSize(50, 50).setColor('#FFF');
        this.scene.lowerPane.appendChild(btn_die);
        goog.events.listenOnce(btn_die, 'click', (function(btn) {
            return function() { this.rollDie(btn); }
        })(btn_die), false, this);
    }
    
}


bg.SkillCheck.prototype.rollDie = function(btn_die) {
    var rollResult = Math.floor(Math.random() * 6 + 1);

    // Change die based on result
    btn_die.setText(rollResult);
    this.d -= 1;
    if (rollResult > 4) {
        btn_die.setColor('#008000');
        this.successes += 1;
    } else {
        btn_die.setColor('#FF0000');
    }

    if (!this.d) this.afterLastDie();
}


bg.EvadeCheck = function(scene) {
    // Clear section of buttons
    this.scene = scene;
    scene.lowerPane.removeAllChildren();

    // Determine # of die to display
    this.d = scene.charactor.sneak + scene.foe.awareness;
    this.successes = 0;

    // Create label
    this.setInfoLabel('Click squares to roll die for Evade Check:');
    
    // Setup dice to roll
    this.setDice(this.d);
}
goog.inherits(bg.EvadeCheck, bg.SkillCheck);


bg.EvadeCheck.prototype.afterLastDie = function() {
    // If all dice are rolled, move to board or fight scene
    if (this.successes) {
        var transition = bg.director.replaceScene(bg.gameScene, lime.transitions.SlideInDown);
        goog.events.listen(transition, 'end', function() {
            bg.gameScene.board.dispatchEvent('char_move_safe');
        });

    } else {
        this.scene.charactor.health -= this.scene.foe.combatDamage;
        var check = new bg.HorrorCheck(this.scene); 
    }

}


bg.HorrorCheck = function(scene) {
    // Clear section of buttons
    this.scene = scene;
    scene.lowerPane.removeAllChildren();

    // Determine # of die to display
    this.d = scene.charactor.will + scene.foe.horrorRating;
    this.successes = 0;

    // Create label
    this.setInfoLabel('Click squares to roll die for Horror Check:');

    // Setup dice to roll
    this.setDice(this.d);

};
goog.inherits(bg.HorrorCheck, bg.SkillCheck);


bg.HorrorCheck.prototype.afterLastDie = function() {
    // If all dice are rolled, move to board or fight scene
    if (this.successes) {
        var check = new bg.FightCheck(this.scene);
    } else {
        this.scene.charactor.sanity -= this.scene.foe.horrorDamage;
        var check = new bg.FightCheck(this.scene);
    }
}


bg.FightCheck = function(scene) {
    // Clear section of buttons
    this.scene = scene;
    scene.lowerPane.removeAllChildren();

    // Determine # of die to display
    this.d = scene.charactor.fight + scene.foe.combatRating;
    this.successes = 0;

    // Create label
    this.setInfoLabel('Click squares to roll die for Fight Check:');

    // Setup dice to roll
    this.setDice(this.d);
}
goog.inherits(bg.FightCheck, bg.SkillCheck);


bg.FightCheck.prototype.afterLastDie = function() {
    if (this.successes) {
        this.scene.foe.setHidden(true);
        this.scene.charactor.trophyStack.push(this.scene.foe); 

        var transition = bg.director.replaceScene(bg.gameScene, lime.transitions.SlideInDown);
        goog.events.listen(transition, 'end', function() {
            bg.gameScene.board.dispatchEvent('char_move_safe');
        });
    
    } else {
        this.scene.charactor.health -= this.scene.foe.combatDamage;
        var check = new bg.FightCheck(this.scene);
    }
}
