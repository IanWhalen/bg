goog.provide('bg.Sideboard');

goog.require('lime.Node');
goog.require('lime.Layer');
goog.require('bg.Foe');

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

    // Create cup to contain foe 
    this.foeCup = new lime.Layer();
    this.appendChild(this.foeCup);
    for (var key in foeCupData) {
        var foeData = foeCupData[key];
        var foe = new bg.Foe(foeData) ;       
        this.foeCup.appendChild(foe);
    }

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


bg.Sideboard.prototype.spawnFoe = function(loc) {
    if (this.foeCup.children_.length == 0) return;

    this.foeCup.children_ = this.shuffle(this.foeCup.children_);
    var foe = this.foeCup.children_.pop();
    foe.loc = loc;
    foe.setPosition(loc.position_.x + (loc.size_.width / 2), loc.position_.y + (loc.size_.height / 2));
    foe.setSize(this.game.board.GAP, this.game.board.GAP);
    this.game.board.foeLayer.appendChild(foe);
}


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
          'name': 'Witch Burning Anniversary!',
          'specialEvent': '0001',
          'specialEventLoc': 'Rivertown',
          'cardType': 'Headline',
          'clueLoc': 'Science Building',
          'spawnLoc': 'Unvisited Isle',
          'whiteMove': {
                        'crescent':1,
                       },
          'blackMove': {
                        'cross':1,
                       },
          },
    '002': {
          'name': 'Merchants March on Crime!',
          'specialEvent': '0002',
          'specialEventLoc': ['Merchant District', 'Unvisited Isle', 'River Docks', 'The Unnamable'],
          'cardType': 'Headline',
          'clueLoc': 'The Unnamable',
          'spawnLoc': 'Independence Square',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
    '003': {
          'name': 'Sheldon Gang Turns To Police For Aid!',
          'specialEvent': '0001',
          'specialEventLoc': 'Uptown',
          'cardType': 'Headline',
          'clueLoc': 'Unvisited Isle',
          'spawnLoc': 'Graveyard',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
    '004': {
          'name': 'Horror at Groundbreaking!',
          'specialEvent': '0001',
          'specialEventLoc': 'Miskatonic University',
          'cardType': 'Headline',
          'clueLoc': 'Silver Twilight Lodge',
          'spawnLoc': 'Historical Society',
          'whiteMove': {
                        'crescent':1,
                       },
          'blackMove': {
                        'cross':1,
                       },
          },
    '005': {
          'name': 'Lodge Members Held for Questioning!',
          'specialEvent': '0001',
          'specialEventLoc': 'French Hill',
          'cardType': 'Headline',
          'clueLoc': 'Hibb\'s Roadhouse',
          'spawnLoc': 'Black Cave',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
    '006': {
          'name': 'Slum Murders Continue!',
          'specialEvent': '0001',
          'specialEventLoc': 'Easttown',
          'cardType': 'Headline',
          'clueLoc': 'Historical Society',
          'spawnLoc': 'Woods',
          'whiteMove': {
                        'crescent':1,
                       },
          'blackMove': {
                        'cross':1,
                       },
          },
    '007': {
          'name': 'Terror at the Train Station!',
          'specialEvent': '0001',
          'specialEventLoc': 'Northside',
          'cardType': 'Headline',
          'clueLoc': 'Black Cave',
          'spawnLoc': 'The Witch House',
          'whiteMove': {
                        'crescent':1,
                       },
          'blackMove': {
                        'cross':1,
                       },
          },
    '008': {
          'name': 'Ghost Ship Docks by Itself!',
          'specialEvent': '0001',
          'specialEventLoc': 'Merchant District',
          'cardType': 'Headline',
          'clueLoc': 'Woods',
          'spawnLoc': 'The Unnamable',
          'whiteMove': {
                        'crescent':1,
                       },
          'blackMove': {
                        'cross':1,
                       },
          },
    '009': {
          'name': 'Picnickers Panic!',
          'specialEvent': '0001',
          'specialEventLoc': 'Downtown',
          'cardType': 'Headline',
          'clueLoc': 'Science Building',
          'spawnLoc': 'Unvisited Isle',
          'whiteMove': {
                        'crescent':1,
                       },
          'blackMove': {
                        'cross':1,
                       },
          },
    '010': {
          'name': 'Southside Strangler Suspected!',
          'specialEvent': '0001',
          'specialEventLoc': 'Southside',
          'cardType': 'Headline',
          'clueLoc': 'Historical Society',
          'spawnLoc': 'Woods',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
    '011': {
          'name': 'Vigilante Guards the Night!',
          'specialEvent': '0002',
          'specialEventLoc': ['Downtown', 'Arkham Asylum', 'Independence Square', 'Bank of Arkham'],
          'cardType': 'Headline',
          'clueLoc': 'Woods',
          'spawnLoc': 'The Unnamable',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
    '012': {
          'name': 'Lodge Members Watch The Night!',
          'specialEvent': '0002',
          'specialEventLoc': ['French Hill', 'Silver Twilight Lodge', 'The Witch House'],
          'cardType': 'Headline',
          'clueLoc': 'Science Building',
          'spawnLoc': 'Unvisited Isle',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
    '013': {
          'name': 'Gangs Clean Up Easttown!',
          'specialEvent': '0002',
          'specialEventLoc': ['Easttown', 'Hibb\'s Roadhouse', 'Velma\'s Diner', 'Police Station'],
          'cardType': 'Headline',
          'clueLoc': 'Black Cave',
          'spawnLoc': 'The Witch House',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
    '014': {
          'name': 'Gangs Clean Up Easttown!',
          'specialEvent': '0002',
          'specialEventLoc': ['Uptown', 'St. Mary\'s Hospital', 'Ye Olde Magick Shoppe', 'Woods'],
          'cardType': 'Headline',
          'clueLoc': 'Historical Society',
          'spawnLoc': 'Woods',
          'whiteMove': {
                        'circle':1,
                       },
          'blackMove': {
                        'square':1,
                        'diamond':1,
                       },
          },
}
