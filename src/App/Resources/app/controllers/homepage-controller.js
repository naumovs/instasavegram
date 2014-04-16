define([ 'app/controllers/dynamic-controller', 'app/views/homepage-view' ], function(DynamicController, HomepageView) {

	return DynamicController.extend({
		applyContent: function(html) {

			this.view = new (HomepageView.extend({
				template: html
			}));
		}
	});
});