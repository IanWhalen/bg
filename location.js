goog.provide('bg.Location');

goog.require('lime.Sprite');

bg.Location = function(locData) {
    lime.Sprite.call(this);

    this.setSize(locData['sizeX'], locData['sizeY']);
    this.setAnchorPoint(locData['anchorX'], locData['anchorY']);
    this.setPosition(locData['positionX'], locData['positionY']);
    this.setFill(locData['fillColor']);
};
goog.inherits(bg.Location, lime.Sprite);
