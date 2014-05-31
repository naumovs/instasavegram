define([
	'chaplin',
	'app/views/base/view',
	'app/views/base/collection-view'
], function(Chaplin, BaseView, BaseCollectionView) {

	var itemView = BaseView.extend({
		template: 'profile-media-view.html',
		events: {
			'click a': 'trackDownload'
		},
		noWrap: true,
		trackDownload: function() {
			Chaplin.mediator.trackerController.trackEventLocal('photo', 'download', '1');
		}
	});

	return BaseCollectionView.extend({
		noWrap: true,
		animationDuration: 0,
		container: '#content content-wrap',
		autoRender: true,
		itemView:   itemView,
		listen: {
			'listLoaded collection': 'onAllLoaded'
		},
		onAllLoaded: function() {
			$('.load-more').fadeOut();
		}
	});
});