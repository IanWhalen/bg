goog.provide('bg.Sideboard');

goog.require('lime.Node');
goog.require('lime.Layer');

/**
 * Sideboard object.  Contains card decks and discards
 * @param {lime.Game} game
 * @constructor
 * @extends lime.Layer
 */
bg.Sideboard = function(game) {
    lime.Layer.call(this);

    this.game = game;
    
    // Create initial Mythos Deck
    this.mythosDiscard = new lime.Layer();
    this.appendChild(this.mythosDiscard);
    for (var key in mythosDeckData) {
        var cardData = mythosDeckData[key];
        this.addMythosCard(cardData);
    };
    this.mythosDeck = new lime.Layer();
    this.appendChild(this.mythosDeck);

    // Create Hell Gate collection
    this.gateStack = new lime.Layer();
    this.appendChild(this.gateStack);
    for (var key in gateStackData) {
        var gateData = gateStackData[key];
        this.addGate(gateData);
    };
    this.gateStack.children_ = this.shuffle(this.gateStack.children_);

    // Shuffle discard pile back into deck if any deck is empty
    lime.scheduleManager.schedule(this.deckShuffler, this);

};
goog.inherits(bg.Sideboard, lime.Layer);

bg.Sideboard.prototype.deckShuffler = function() {
    if (this.mythosDeck.children_.length < 1) {
        this.mythosDeck.children_ = this.mythosDeck.children_.concat(this.shuffle(this.mythosDiscard.children_));
        this.mythosDiscard.children_.length = 0;
    }
};

bg.Sideboard.prototype.shuffle = function(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
};

bg.Sideboard.prototype.addGate = function(gateData) {
    this.gate = new lime.Node();
    this.gate.name = gateData['name'];
    this.gateStack.appendChild(this.gate);
};

bg.Sideboard.prototype.addMythosCard = function(cardData) {
    this.card = new lime.Node();
    this.card.clueLoc = cardData['clueLoc'];
    this.card.spawnLoc = cardData['spawnLoc'];
    this.card.blackMove = cardData['blackMove'];
    this.card.whiteMove = cardData['whiteMove'];
    this.mythosDiscard.appendChild(this.card);
};

var gateStackData = {
    '01': {
            'name': '1st Level',
          },
    '02': {
            'name': '2nd Level',
          },
}

var mythosDeckData = {
    '001': {
          'clueLoc': 'loc0',
          'spawnLoc': 'loc3',
          'whiteMove': {
                        'crescent':1,
                       },
          'blackMove': {
                        'cross':1,
                       },
          },
    '002': {
          'clueLoc': 'loc1',
          'spawnLoc': 'loc8',
          'whiteMove': {
                        'circle':1,
                        'diamond':1,
                       },
          'blackMove': {
                        'crescent':1,
                       },
          },
}
