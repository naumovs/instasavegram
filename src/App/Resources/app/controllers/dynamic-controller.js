define([ 'jquery', 'app/globals', 'app/controllers/base/controller', 'app/views/dynamic-view' ], function($, Globals, BaseController, DynamicView) {

	return BaseController.extend({
		show: function(params, options) {
			var template, payload = $('#payload');

			if (payload.length) {
				template = payload.html();
				this.applyContent(template);
			} else {
				$.ajax(Globals['base-url'] + '/' + options.path).done(this.applyContent);
			}
		},
		applyContent: function(html) {

			this.view = new (DynamicView.extend({
				template: html
			}));
		}
	});
});