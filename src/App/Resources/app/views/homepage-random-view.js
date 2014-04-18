define([ 'app/models/media-random-collection', 'app/views/base/view', 'app/views/base/collection-view' ], function(MediaRandomCollection, BaseView, BaseCollectionView) {

	var itemView = BaseView.extend({
		template: 'homepage-random-view.html',
		noWrap: true
	});

	return BaseCollectionView.extend({
		className: 'row',
		container: '#content .home-random-block',
		autoRender: true,
		itemView:   itemView,
		initialize: function() {
			this.collection = new MediaRandomCollection;
			BaseCollectionView.prototype.initialize.apply(this, arguments);
			this.collection.fetch({ dataType: 'jsonp' });
		}
	});

});