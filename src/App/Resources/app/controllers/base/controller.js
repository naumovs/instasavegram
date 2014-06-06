define(['chaplin'], function(Chaplin) {
  'use strict';

  var Controller = Chaplin.Controller.extend({
    // Place your application-specific controller features here.
    beforeAction: function() {
     	this.adjustTitle('');
		Chaplin.Controller.prototype.beforeAction.apply(this,arguments);
    }
  });

  return Controller;
});
