/* global window */
define([
	'backbone',
	'jquery',
	'app/globals',
	'app/lib/utils',
	'./base/controller',
], function (Backbone, $, Globals, utils, BaseController) {
	return BaseController.extend({
		initialize: function () {
			BaseController.prototype.initialize.apply(this, arguments);
			this.subscribeEvent('router:match', this.trackPageView);
		},
		trackEventLocal: function(category, action, value) {
			$.ajax(utils.reverse('trackEvent'), {
				type: 'post',
				data: {
					'form[category]': category,
					'form[action]': action,
					'form[value]': value
				}
			});
		},
		trackPageView: function(route, actionParams, options) {
			if (options && options.changeURL && window.ga) {
				ga('send', {
					'hitType': 'pageview',
					'page': '/' + route.path
				});
			}
		}
	});

});