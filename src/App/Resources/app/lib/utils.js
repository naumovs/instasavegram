define( [ 'chaplin' ], function(Chaplin) {
  'use strict';

  // Application-specific utilities
  // ------------------------------

  // Delegate to Chaplin’s utils module
	// Add additional application-specific properties and methods

  // _(utils).extend({
  //   someProperty: 'foo',
  //   someMethod: function() {}
  // });

  return Chaplin.utils.beget(Chaplin.utils);
});
