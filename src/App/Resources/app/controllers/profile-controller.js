define([
	'app/controllers/base/controller',
    'app/views/profile-view',
	'chaplin'
], function(BaseController, ProfileView, Chaplin) {

    return BaseController.extend({
		show: function() {

			this.adjustTitle('Profile');

			if (!Chaplin.mediator.user || !Chaplin.mediator.user.get('authenticated')) {
				return this.redirectTo('homepage');
			}

            this.view = new ProfileView({
	            model: Chaplin.mediator.user
            });
	    }
    });

});