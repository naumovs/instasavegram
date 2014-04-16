define([
	'require',
	'jquery',
	'app/lib/utils',
	'app/views/base/view',
	'app/models/media-cache',
	'app/models/media-collection',
	'app/views/profile-media-view'
], function (require, $, utils, BaseView, mediaCache, MediaCollection, ProfileMediaView, JSZip, saveAs, modal) {

	var profileMediaView = null;

	return BaseView.extend({
		events: {
			'click .download-all': 'downloadAll',
			'click a[rel=next]': 'loadMore'
		},
		container: '#content',
		containerMethod: 'html',
		model: null,
		template: 'profile.html',
		className: 'profile',
		autoRender: false,
		initialize: function () {
			BaseView.prototype.initialize.apply(this, arguments);

			if (this.model) {
				return this.render();
			}

			this.subscribeEvent('session.changed', (function (authenticated, user) {
				if (authenticated) {
					this.model = user;
					this.render();
				} else {
					utils.redirectTo('homepage');
				}
			}).bind(this));
		},
		dispose: function () {
			this.model = null;
			mediaCache.setValue(profileMediaView.collection.toJSON());
			profileMediaView = null;
			BaseView.prototype.dispose.apply(this, arguments);
		},
		render: function () {
			BaseView.prototype.render.apply(this, arguments);

			profileMediaView = this.subview('media_view', new ProfileMediaView({
				collection: new MediaCollection(mediaCache.getValue()),
				container: this.$el.find('.media-view')
			}));

			this.loadMore();
		},
		downloadAll: function (e) {

			e.preventDefault();

			mediaCache.setValue(profileMediaView.collection.toJSON());

			require(['app/controllers/media-download-controller'], function(MediaDownloadController) {
				new MediaDownloadController();
			});

		},
		startDownload: function() {
			console.log('time to start download')
		},
		loadMore: function (e) {
			e && e.preventDefault();

			if (profileMediaView) {
				profileMediaView.collection.loadNextPage();
			}
		}
	});
});