goog.provide('bg.Charactor');

goog.require('goog.base');
goog.require('lime.Circle');


/**
 * Single charactor object
 * @constructor
 * @extends lime.Sprite
 */
bg.Charactor = function(board, charName) {
    goog.base(this);
    this.board = board;

    charactorData = charactors[charName];

    // Graphical body object
    this.circle = new lime.Sprite();
    this.appendChild(this.circle);
    this.circle.setFill(charactorData.imageAsset);

    // Board data
    this.loc = this.board.getLocFromName(charactorData.startLoc);
    this.setPosition(this.loc.position_.x + (this.loc.size_.width / 2),
        this.loc.position_.y + (this.loc.size_.height / 2));
    this.setSize(this.board.GAP, this.board.GAP);

    // Gameplay data
    this.speed = charactorData.speed;
    this.health = charactorData.health;
    this.clueCount = undefined;

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

var charactors = {
    'char1': {
              'startLoc': 'Graveyard',
              'imageAsset': 'assets/ball_0.png',
              'speed': 5,
              'health': 5,
             },
}
