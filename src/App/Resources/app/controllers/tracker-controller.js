/* global window */
define([
	'backbone',
	'jquery',
	'app/globals',
	'app/lib/utils',
	'app/controllers/base/controller',
], function (Backbone, $, Globals, utils, BaseController) {
	return BaseController.extend({
		initialize: function () {
			BaseController.prototype.initialize.apply(this, arguments);
			this.subscribeEvent('router:match', this.trackPageView);
		},
		trackEvent: function (category, action, value, label) {
			if (window.ga) {
				var event = {
					'hitType': 'event',
					'eventCategory': category,
					'eventAction': action
				};

				if (value) {
					event.eventValue = value;
				}

				if (label) {
					event.eventLabel = label;
				}

				ga('send', event);
			}
		},
		trackEventLocal: function (category, action, value) {
			$.ajax(utils.reverse('trackEvent'), {
				type: 'post',
				data: {
					'form[category]': category,
					'form[action]': action,
					'form[value]': value
				}
			});

			this.trackEvent(category, action, value);
		},
		trackPageView: function (route, actionParams, options) {
			if (options && options.changeURL && window.ga) {
				ga('send', {
					'hitType': 'pageview',
					'page': '/' + route.path
				});
			}
		}
	});

});