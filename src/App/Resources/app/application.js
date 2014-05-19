define([
	'chaplin',
	'app/controllers/session-controller',
	'app/controllers/menu-controller',
	'app/controllers/tracker-controller',
], function(Chaplin, SessionController, MenuController, TrackerController) {
  'use strict';

  // The application object
  // Choose a meaningful name for your application
  var Application = Chaplin.Application.extend({
    // Set your application name here so the document title is set to
    // “Controller title – Site title” (see Layout#adjustTitle)
    title: 'TheID',
	  initMediator: function() {
		  Chaplin.mediator.accessToken = null;
		  Chaplin.mediator.user = null;
		  Chaplin.mediator.sessionController = null;
		  Chaplin.mediator.trackerController = null;
		  // seal mediator after
		  Chaplin.Application.prototype.initMediator.apply(this, arguments);
	  },
	  initControllers: function() {
		  Chaplin.mediator.sessionController = new SessionController();
		  Chaplin.mediator.trackerController = new TrackerController();
			new MenuController();
		  // init parent controllers
//			Chaplin.Application.prototype.initControllers.apply(this, arguments);
	  },
	  initialize: function() {
		  Chaplin.Application.prototype.initialize.apply(this, arguments);
		  this.initControllers();
	  }
  });

  return Application;
});
// TODO: do it right way
curl(['jquery'], function($) {
	$('.contact')[0].href += 'naumov.serge@gmail.com';
});