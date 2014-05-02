/* global window */
define([
	'jquery',
	'./base/controller',
	'app/views/nav-profile-view'
], function ($, BaseController, NavProfileView) {
	return BaseController.extend({
		initialize: function () {
			var me = this;

			BaseController.prototype.initialize.apply(this, arguments);

			this.subscribeEvent('session.changed', function (authenticated, user) {

				if (authenticated) {
					me.view = new NavProfileView({
						model: user
					});
				} else {
					if (me.view) {
						me.view.dispose();
						me.view = null;
					}

					this.redirectTo('homepage');
				}
			});

			this.subscribeEvent('dispatcher:dispatch', this.trackActiveItem);
		},
		trackActiveItem: function(controller, params, route, options) {
			if (!this.menuItems) {
				this.menuItems = $('#navbar :first-child');
			}

			this.menuItems.find('li').removeClass('active');
			this.menuItems.find('a').each(function() {
				if (route.path && this.href.indexOf('/' + route.path) !== -1) {
					$(this.parentNode).addClass('active');
				}
			});
		}
	});

});