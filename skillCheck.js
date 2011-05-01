goog.provide('bg.HorrorCheck');


bg.SkillCheck = function(scene) {
}


bg.SkillCheck.prototype.setInfoLabel = function(text) {
    var instruct = new lime.Label(text).setPosition(400, 100);
    this.scene.lowerPane.appendChild(instruct);
}


bg.SkillCheck.prototype.setDice = function(d) {
    for (i=0; i < d; i++) {
        var btn_die = new lime.GlossyButton('?').setPosition(200 + i * 100, 200).setSize(50, 50).setColor('#FFF');
        this.scene.lowerPane.appendChild(btn_die);
        goog.events.listenOnce(btn_die, 'click', function() {
            this.rollDie(btn_die);
        }, false, this);
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

    this.testForLastDie();
}


bg.HorrorCheck = function(scene) {
    // Clear section of buttons
    this.scene = scene;
    scene.lowerPane.removeAllChildren();

    // Determine # of die to display
    this.d = scene.charactor.will + scene.foe.horrorRating;
    this.successes = 0;

    // Create label
    this.setInfoLabel('Click squares to roll die for Horror Check:', scene);

    // Setup dice to roll
    this.setDice(this.d);

};
goog.inherits(bg.HorrorCheck, bg.SkillCheck);


bg.HorrorCheck.prototype.testForLastDie = function() {
    // If all dice are rolled, move to board or fight scene
    if (!this.d) {
        if (this.successes) {
            // bg.FightCheck();
        } else {
            this.scene.charactor.sanity -= this.scene.foe.horrorDamage;
            // bg.FightCheck();
        }
    }

}
