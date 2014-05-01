define([ 'app/globals', 'chaplin', 'app/lib/utils', 'jquery', './dynamic-view', './homepage-random-view' ], function(Globals, Chaplin, utils, $, DynamicView, HomepageRandomView) {

	return DynamicView.extend({
		events: {
			'click .splash-get-started-text a': 'eventGetStartedClick',
			'click .social-icons .twitter': 'shareTwitter',
			'click .social-icons .facebook': 'shareFacebook',
			'click .social-icons .plus': 'sharePlus'
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

		},
		shareTwitter: function(e) {
			console.log(this.arguments);

			e.currentTarget.href = [
				'https://twitter.com/share?text=',
				encodeURIComponent('I\'ve downloaded all my instagram photos thanks to this site!'), ' ',
				encodeURIComponent(utils.reverse('homepage')),
			].join('');

		},
		shareFacebook: function(e) {

			e.currentTarget.href = [
				'https://www.facebook.com/sharer/sharer.php?u=',
				encodeURIComponent(utils.reverse('homepage')),
			].join('');
		},
		sharePlus: function(e) {
			e.currentTarget.href = [
				'https://plus.google.com/share?url=',
				encodeURIComponent(utils.reverse('homepage')),
			].join('');
		}
	});
});