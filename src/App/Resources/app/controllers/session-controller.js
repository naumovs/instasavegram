/* global window */
define([
	'jquery',
	'underscore',
	'chaplin',
	'app/lib/utils',
	'app/controllers/base/controller',
	'app/models/user-model',
	'app/controllers/session/hash-token-provider',
	'app/controllers/session/cookie-token-provider'
], function ($, _, Chaplin, utils, BaseController, UserModel, HashTokenProvider, CookieTokenProvider) {
	return BaseController.extend({
		providers: [],
		providerIndex: null,

		initialize: function () {
			BaseController.prototype.initialize.apply(this, arguments);

			console.log('Starting session...');

			this.subscribeEvent('session.changed', function (authenticated, user, accessToken, provider) {
				console.log('session.changed event', arguments);

				if (authenticated && provider && provider.getName() == 'Hash') {
					utils.redirectTo('profile');

				}
			});

			Chaplin.mediator.setHandler('session.logout', this.logout.bind(this));

			this.on('foundToken', this.validateToken);
			this.on('failed', this.hopProvider);

			this.providers.push(new HashTokenProvider({ controller: this }));
			this.providers.push(new CookieTokenProvider({ controller: this }));

			this.initSession();
		},
		initSession: function () {
			this.providerIndex = -1;
			this.hopProvider();
		},
		hopProvider: function () {
			this.providerIndex = this.providerIndex + 1;
			if (this.providers[this.providerIndex]) {
				this.providers[this.providerIndex].tryHandle()
			} else {
				this.publishEvent('session.changed', false, undefined);
			}
		},
		writeCookie: function (name, value, days) {
			var expires;
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
				expires = "; expires=" + date.toGMTString();
			}
			else {
				expires = "";
			}
			window.document.cookie = name + "=" + value + expires + "; path=/";
		},
		validateToken: function (accessToken, provider) {

			var me = this;

			$.ajax({
				url: "https://api.instagram.com/v1/users/self/",
				dataType: "jsonp",
				data: {
					access_token: accessToken
				},
				success: function (response) {
					if (response && response.meta && response.meta.code == '200') {
						me.loginUser(response.data, accessToken, provider);
					}
				}
			});

		},
		loginUser: function (userData, accessToken, provider) {

			var user = new UserModel(userData);
			user.set('authenticated', true);

			Chaplin.mediator.user = user;
			Chaplin.mediator.accessToken = accessToken;
			this.writeCookie('instaAT', accessToken, 1);

			this.publishEvent('session.changed', true, user, accessToken, provider);
		},
		logout: function() {
			this.writeCookie('instaAT', '', -1);
			Chaplin.mediator.user = null;
			Chaplin.mediator.accessToken = null;
			this.publishEvent('session.changed', false);
		}
	});

});