define([ 'app/globals', 'chaplin', 'app/lib/utils', 'jquery', './dynamic-view', './homepage-random-view' ], function(Globals, Chaplin, utils, $, DynamicView, HomepageRandomView) {

	return DynamicView.extend({
		events: {
			'click .splash-get-started-text a': 'eventGetStartedClick'
		},
		eventGetStartedClick: function(e) {

			if (Chaplin.mediator.user && Chaplin.mediator.user.get('authenticated')) {
				e.preventDefault();
				e.stopPropagation();

				return utils.redirectTo('profile');
			}
		},
		initialize: function() {
			DynamicView.prototype.initialize.apply(this, arguments);

			this.on('addedToDOM', function() {
				this.subview('random-block', new HomepageRandomView());
			});

		}
	});
});