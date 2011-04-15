goog.provide('bg.Foe');

goog.require('goog.base');
goog.require('lime.Circle');

/**
 * Single foe object
 * @constructor
 */
bg.Foe = function() {
    goog.base(this);

    this.circle = new lime.Sprite();
    this.appendChild(this.circle);
    this.circle.setFill('assets/ball_1.png');

    this.qualityRenderer = true;
};
goog.inherits(bg.Foe, lime.Sprite);

/**
 * @inheritDoc
 */
bg.Foe.prototype.update = function() {
    // make circle size relative to bubble size
    var size = this.getSize();
    this.circle.setSize(size.width * .75, size.height * .75);

    lime.Node.prototype.update.call(this);
};
