goog.provide('bg.Location');

goog.require('lime.Sprite');

bg.Location = function(locData) {
    lime.Sprite.call(this);

    this.setSize(locData['sizeX'], locData['sizeY']);
    this.setAnchorPoint(locData['anchorX'], locData['anchorY']);
    this.setPosition(locData['positionX'], locData['positionY']);
    this.setFill(locData['fillColor']);

    this.name = locData['name'];
    this.blackMove = locData['blackMove'];
    this.adjacent = locData['adjacent'];
    this.whiteMove = undefined;
    this.gate = undefined;

    this.qualityRenderer = true;

};
goog.inherits(bg.Location, lime.Sprite);

var locMap = {
    'loc0': {
              'name': 'loc0',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 0,
              'fillColor': '#295081',
              'adjacent': {
                            'loc1':1,
                            'loc4':1,
                          },
              'blackMove': 'loc1',
            },
    'loc1': {
              'name': 'loc1',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 0,
              'fillColor': '#FF0000',
              'adjacent': {
                            'loc0':1,
                            'loc2':1,
                            'loc5':1,
                          },
              'blackMove': 'loc2',
            },
    'loc2': {
              'name': 'loc2',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 0,
              'fillColor': '#295081',
              'adjacent': {
                            'loc1':1,
                            'loc3':1,
                            'loc6':1,
                          },
              'blackMove': 'loc3',
            },
    'loc3': {
              'name': 'loc3',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 0,
              'fillColor': '#CCC',
              'adjacent': {
                            'loc2':1,
                            'loc7':1,
                          },
              'blackMove': 'loc7',
            },
    'loc4': {
              'name': 'loc4',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc0':1,
                            'loc5':1,
                            'loc8':1,
                          },
              'blackMove': 'loc0',
            },
    'loc5': {
              'name': 'loc5',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc1':1,
                            'loc4':1,
                            'loc6':1,
                            'loc9':1,
                          },
              'blackMove': 'loc4',
            },
    'loc6': {
              'name': 'loc6',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc2':1,
                            'loc5':1,
                            'loc7':1,
                            'loc10':1,
                          },
              'blackMove': 'loc5',
            },
    'loc7': {
              'name': 'loc7',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 181,
              'fillColor': '#295081',
              'adjacent': {
                            'loc3':1,
                            'loc6':1,
                            'loc11':1,
                          },
              'blackMove': 'loc6',
            },
    'loc8': {
              'name': 'loc8',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc4':1,
                            'loc9':1,
                            'loc12':1,
                          },
              'blackMove': 'loc4',
            },
    'loc9': {
              'name': 'loc9',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc5':1,
                            'loc8':1,
                            'loc10':1,
                            'loc13':1,
                          },
              'blackMove': 'loc8',
            },
    'loc10': {
              'name': 'loc10',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc6':1,
                            'loc9':1,
                            'loc11':1,
                            'loc14':1,
                          },
              'blackMove': 'loc11',
            },
    'loc11': {
              'name': 'loc11',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 361,
              'fillColor': '#295081',
              'adjacent': {
                            'loc7':1,
                            'loc10':1,
                            'loc15':1,
                          },
              'blackMove': 'loc7',
            },
    'loc12': {
              'name': 'loc12',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 0,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc8':1,
                            'loc13':1,
                          },
              'blackMove': 'loc13',
            },
    'loc13': {
              'name': 'loc13',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 181,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc9':1,
                            'loc12':1,
                            'loc14':1,
                          },
              'blackMove': 'loc14',
            },
    'loc14': {
              'name': 'loc14',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 361,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc10':1,
                            'loc13':1,
                            'loc15':1,
                          },
              'blackMove': 'loc13',
            },
    'loc15': {
              'name': 'loc15',
              'anchorX': 0,
              'anchorY': 0,
              'sizeX': 180,
              'sizeY': 180,
              'positionX': 541,
              'positionY': 541,
              'fillColor': '#295081',
              'adjacent': {
                            'loc11':1,
                            'loc14':1,
                          },
              'blackMove': 'loc11',
            },
};
