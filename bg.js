// set main namespace
goog.provide('bg');

// get requirements
goog.require('lime.Director');
goog.require('lime.GlossyButton');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.transitions.Dissolve');
goog.require('lime.animation.MoveBy');
goog.require('bg.Board');
goog.require('bg.Game');

// set constant size
bg.WIDTH = 720;
bg.HEIGHT = 1004;

// entrypoint
bg.start = function() {
    bg.director = new lime.Director(document.body, bg.WIDTH, bg.HEIGHT);
	  bg.director.makeMobileWebAppCapable();

    bg.loadMenu();
};

// load menu scene
bg.loadMenu = function() {
  var scene = new lime.Scene(),
          layer = new lime.Layer().setPosition(bg.WIDTH / 2, 0);

      if(bg.isBrokenChrome()) layer.setRenderer(lime.Renderer.CANVAS);


      var btns = new lime.Layer().setPosition(0, 430);
      layer.appendChild(btns);
      var move = new lime.animation.MoveBy(-bg.WIDTH, 0).enableOptimizations();

      var btn = bg.makeButton('Play').setPosition(0, 200);
      goog.events.listen(btn, 'click', function() {
          btns.runAction(move);
      });
      btns.appendChild(btn);

      // second area to slide in
      var btns2 = new lime.Layer().setPosition(bg.WIDTH, 0);
      btns.appendChild(btns2);

      var lbl = new lime.Label().setText('Really play?').setFontColor('#FFFFFF').setFontSize(24).setPosition(0, 140);
      btns2.appendChild(lbl);

      btn = bg.makeButton('Really Play').setPosition(0, 200);
      goog.events.listen(btn, 'click', function() {
        bg.newgame(); 
      });
      btns2.appendChild(btn);

      scene.appendChild(layer);

      bg.director.replaceScene(scene, lime.transitions.Dissolve);
};

// helper for same size buttons
bg.makeButton = function(text) {
    var btn = new lime.GlossyButton(text).setSize(300, 90);
    return btn;
};

bg.isBrokenChrome = function() {
    return (/Chrome\/9\.0\.597/).test(goog.userAgent.getUserAgentString());
};

// load new game scene
bg.newgame = function() {
    var scene = new bg.Game();
    bg.director.replaceScene(scene, lime.transitions.Dissolve);
};


//this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('bg.start', bg.start);
