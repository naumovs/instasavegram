define([ 'jquery', 'app/lib/utils', 'app/globals', 'app/controllers/base/controller', 'app/views/dynamic-view' ], function($, utils, Globals, BaseController, DynamicView) {

	return BaseController.extend({
		show: function(params, route) {
			var template, payload = $('#payload');

			if (payload.length) {
				template = payload.html();
				this.applyContent(template);
				payload.remove();
			} else {
				$.ajax(utils.reverse(route.name)).done(this.applyContent);
			}
		},
		applyContent: function(html) {

			this.view = new (DynamicView.extend({
				template: html
			}));
		}
	});
});