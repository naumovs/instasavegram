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
		className: 'row',
		container: '#content .media-view',
		autoRender: true,
		itemView:   itemView
	});
});