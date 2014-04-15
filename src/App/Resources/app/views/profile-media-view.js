define([ 'app/views/base/view', 'app/views/base/collection-view' ], function(BaseView, BaseCollectionView) {

	var itemView = BaseView.extend({
		template: 'profile-media-view.html',
		noWrap: true
	});

	return BaseCollectionView.extend({
		container: '#content .media-view',
		autoRender: true,
		itemView:   itemView
	});
});