define([
	'jquery',
	'app/lib/utils',
	'app/views/base/view',
	'app/models/media-cache',
	'app/models/media-collection',
	'app/views/profile-media-view'
], function ($, utils, BaseView, mediaCache, MediaCollection, ProfileMediaView, JSZip, saveAs, modal) {

	var profileMediaView = null;

	return BaseView.extend({
		events: {
//  TODO: create separate module for social icons
			'click .social-icons .twitter': 'shareTwitter',
			'click .social-icons .facebook': 'shareFacebook',
			'click .social-icons .plus': 'sharePlus',
			'click .download-all': 'downloadAll',
			'click a[rel=next]': 'loadMore'
		},
		container: '#content',
		containerMethod: 'html',
		model: null,
		template: 'profile-view.html',
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
			this.$el.find('.img-count').load(utils.reverse('imagesCountText'))

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