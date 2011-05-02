goog.provide('bg.Foe');

goog.require('goog.base');
goog.require('lime.Circle');

/**
 * Single foe object
 * @constructor
 */
bg.Foe = function(foeData) {
    goog.base(this);

    this.circle = new lime.Sprite();
    this.appendChild(this.circle);
    this.circle.setFill(foeData['imageAsset']);

    this.name = foeData['name'];
    // Gameplay data
    for (var each in foeData.stats) {
        this[each] = foeData.stats[each];
    }

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


var foeCupData = {
    '001': {
            'name': 'Vampire',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': 0,
                      'horrorDamage': 2,
                      'toughness': 2,
                      'combatRating': -3,
                      'combatDamage': 3,
                      'undead': 1,
                      'physicalResistance': 1,
                     },
           },
    '002': {
            'name': 'Zombie',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': 1,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': -1,
                      'horrorDamage': 1,
                      'toughness': 1,
                      'combatRating': -1,
                      'combatDamage': 2,
                      'undead': 1,
                     },
           },
    '003': {
            'name': 'Zombie',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': 1,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': -1,
                      'horrorDamage': 1,
                      'toughness': 1,
                      'combatRating': -1,
                      'combatDamage': 2,
                      'undead': 1,
                     },
           },
    '004': {
            'name': 'Zombie',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': 1,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': -1,
                      'horrorDamage': 1,
                      'toughness': 1,
                      'combatRating': -1,
                      'combatDamage': 2,
                      'undead': 1,
                     },
           },
    '005': {
            'name': 'Cultist',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': 1,
                      'combatDamage': 1,
                     },
           },
    '006': {
            'name': 'Cultist',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': 1,
                      'combatDamage': 1,
                     },
           },
    '007': {
            'name': 'Cultist',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': 1,
                      'combatDamage': 1,
                     },
           },
    '008': {
            'name': 'Cultist',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': 1,
                      'combatDamage': 1,
                     },
           },
    '009': {
            'name': 'Cultist',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': 1,
                      'combatDamage': 1,
                     },
           },
    '010': {
            'name': 'Cultist',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'crescent',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': 1,
                      'combatDamage': 1,
                     },
           },
    '011': {
            'name': 'Ghoul',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'hexagon',
                      'horrorRating': 0,
                      'horrorDamage': 1,
                      'toughness': 1,
                      'combatRating': -1,
                      'combatDamage': 1,
                      'ambush': 1,
                     },
           },
    '012': {
            'name': 'Ghoul',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'hexagon',
                      'horrorRating': 0,
                      'horrorDamage': 1,
                      'toughness': 1,
                      'combatRating': -1,
                      'combatDamage': 1,
                      'ambush': 1,
                     },
           },
    '013': {
            'name': 'Ghoul',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -3,
                      'moveColor': 'black',
                      'moveShape': 'hexagon',
                      'horrorRating': 0,
                      'horrorDamage': 1,
                      'toughness': 1,
                      'combatRating': -1,
                      'combatDamage': 1,
                      'ambush': 1,
                     },
           },
    '014': {
            'name': 'Gug',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -2,
                      'moveColor': 'black',
                      'moveShape': 'diagonal',
                      'horrorRating': -1,
                      'horrorDamage': 2,
                      'toughness': 3,
                      'combatRating': -2,
                      'combatDamage': 4,
                      'overwhelming': 1,
                     },
           },
    '015': {
            'name': 'Gug',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -2,
                      'moveColor': 'black',
                      'moveShape': 'diagonal',
                      'horrorRating': -1,
                      'horrorDamage': 2,
                      'toughness': 3,
                      'combatRating': -2,
                      'combatDamage': 4,
                      'overwhelming': 1,
                     },
           },
    '016': {
            'name': 'Witch',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -1,
                      'moveColor': 'black',
                      'moveShape': 'circle',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': -3,
                      'combatDamage': 2,
                      'magicalResistance': 1,
                     },
           },
    '017': {
            'name': 'Witch',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -1,
                      'moveColor': 'black',
                      'moveShape': 'circle',
                      'horrorRating': 0,
                      'horrorDamage': 0,
                      'toughness': 1,
                      'combatRating': -3,
                      'combatDamage': 2,
                      'magicalResistance': 1,
                     },
           },
    '018': {
            'name': 'Formless Spawn',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': 0,
                      'moveColor': 'black',
                      'moveShape': 'hexagon',
                      'horrorRating': -1,
                      'horrorDamage': 2,
                      'toughness': 2,
                      'combatRating': -2,
                      'combatDamage': 2,
                      'physicalImmunity': 1,
                     },
           },
    '019': {
            'name': 'Formless Spawn',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': 0,
                      'moveColor': 'black',
                      'moveShape': 'hexagon',
                      'horrorRating': -1,
                      'horrorDamage': 2,
                      'toughness': 2,
                      'combatRating': -2,
                      'combatDamage': 2,
                      'physicalImmunity': 1,
                     },
           },
    '020': {
            'name': 'Dhole',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -1,
                      'moveColor': 'black',
                      'moveShape': 'circle',
                      'horrorRating': -1,
                      'horrorDamage': 4,
                      'toughness': 3,
                      'combatRating': -3,
                      'combatDamage': 4,
                      'physicalResistance': 1,
                      'magicalResistance': 1,
                      'nightmarish': 1,
                      'overwhelming': 1,
                     },
           },
    '021': {
            'name': 'Star Spawn',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -1,
                      'moveColor': 'black',
                      'moveShape': 'cross',
                      'horrorRating': -3,
                      'horrorDamage': 2,
                      'toughness': 3,
                      'combatRating': -3,
                      'combatDamage': 3,
                     },
           },
    '022': {
            'name': 'Star Spawn',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -1,
                      'moveColor': 'black',
                      'moveShape': 'cross',
                      'horrorRating': -3,
                      'horrorDamage': 2,
                      'toughness': 3,
                      'combatRating': -3,
                      'combatDamage': 3,
                     },
           },
    '023': {
            'name': 'High Priest',
            'imageAsset': 'assets/ball_1.png',
            'stats': {
                      'awareness': -2,
                      'moveColor': 'black',
                      'moveShape': 'cross',
                      'horrorRating': 1,
                      'horrorDamage': 1,
                      'toughness': 2,
                      'combatRating': -2,
                      'combatDamage': 2,
                      'magicalImmunity': 1,
                     }, 
          },
}
