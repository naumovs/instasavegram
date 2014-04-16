define([ 'chaplin', 'app/lib/utils', './dynamic-view' ], function(Chaplin, utils, DynamicView) {

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
		}
//		initialize: function() {
//			Chaplin.View.prototype.initialize.apply(this, arguments);
//			$('#payload').remove();
//		}
	});
});