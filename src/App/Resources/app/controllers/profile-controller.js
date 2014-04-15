define([
    './base/controller',
    'app/views/profile-view',
	'chaplin'
], function(BaseController, ProfileView, Chaplin) {

    return BaseController.extend({
		show: function() {
            this.view = new ProfileView({
	            model: Chaplin.mediator.user
            });
	    }
    });

});