goog.provide('bg.Charactor');

goog.require('goog.base');
goog.require('lime.Circle');


/**
 * Single bubble object
 * @constructor
 * @extends lime.Sprite
 */
bg.Charactor = function() {
    goog.base(this);

    // graphical body object
    this.circle = new lime.Sprite();
    this.appendChild(this.circle);
    this.circle.setFill('assets/ball_0.png');

    this.qualityRenderer = true;
};
goog.inherits(bg.Charactor, lime.Sprite);

/**
 * @inheritDoc
 */
bg.Charactor.prototype.update = function() {
    // make circle size relative from bubble size
    var size = this.getSize();
    this.circle.setSize(size.width * .75, size.height * .75);

    lime.Node.prototype.update.call(this);
};
