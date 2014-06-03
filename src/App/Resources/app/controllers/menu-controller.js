/* global window */
define([
	'jquery',
	'app/controllers/base/controller',
	'app/views/nav-profile-view'
], function ($, BaseController, NavProfileView) {
	return BaseController.extend({
		initialize: function () {
			var me = this;

			BaseController.prototype.initialize.apply(this, arguments);

			this.subscribeEvent('session.changed', function (authenticated, user) {

				if (authenticated) {
					me.view = new NavProfileView();
				} else {
					if (me.view) {
						me.view.dispose();
						me.view = null;
					}

					this.redirectTo('homepage');
				}
			});

		}
	});

});