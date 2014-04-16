define([
	'chaplin',
	'app/views/base/view',
	'bootstrap/dropdown'
], function (Chaplin, BaseView, $) {

	return BaseView.extend({
		events: {
			'click .dropdown-menu a': 'logout'
//			'click a[rel=next]': 'loadMore'
		},
		container: '#navbar',
		containerMethod: 'append',
		noWrap: true,
		model: null,
		template: 'nav-profile-view.html',
		autoRender: true,
		dispose: function () {
			this.model = null;
			BaseView.prototype.dispose.apply(this, arguments);
		},
		render: function() {
			BaseView.prototype.render.apply(this, arguments);
			this.$el.find('.dropdown-toggle').dropdown();
		},
		logout: function() {
			Chaplin.mediator.execute('session.logout');
		}
	});
});