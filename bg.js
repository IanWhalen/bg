// set main namespace
goog.provide('bg');

// get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.transitions.Dissolve');
goog.require('lime.transitions.SlideInDown');
goog.require('lime.animation.MoveBy');
goog.require('bg.Board');
goog.require('bg.Game');
goog.require('bg.EvadeOrFight');

// set constant size
bg.WIDTH = 1200;
bg.HEIGHT = 1170;

// entrypoint
bg.start = function() {
    bg.director = new lime.Director(document.body, bg.WIDTH, bg.HEIGHT);
	  bg.director.makeMobileWebAppCapable();

    bg.charactorSelect();
};

// load menu scene
bg.charactorSelect = function() {
  var scene = new lime.Scene(),
          layer = new lime.Layer().setPosition(bg.WIDTH / 2, 0);

      if(bg.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);


      var charSelectBtns = new lime.Layer().setPosition(0, 430);
      layer.appendChild(charSelectBtns);
      var move = new lime.animation.MoveBy(-bg.WIDTH, 0).enableOptimizations();

      var lbl = new lime.Label().setText('Choose a Character to Play:').
        setFontColor('#FFFFFF').
        setFontSize(24).
        setPosition(0, 50);
      var charSelect1 = bg.makeCharSelectBtn('Charactor 1').setPosition(0, 200);
      goog.events.listen(charSelect1, 'click', function() {
          bg.newgame('char1')
      });
      charSelectBtns.appendChild(charSelect1);
      charSelectBtns.appendChild(lbl);

      scene.appendChild(layer);

      bg.director.replaceScene(scene, lime.transitions.Dissolve);
};

// helper for char select buttons
bg.makeCharSelectBtn = function(text) {
    var btn = new lime.GlossyButton(text).setSize(180, 180);
    return btn;
};

bg.isBrokenChrome = function() {
    return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
};

// load new game scene
bg.newgame = function(charactor) {
    var scene = new bg.Game(charactor);
    bg.director.replaceScene(scene, lime.transitions.Dissolve);
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('bg.start', bg.start);
