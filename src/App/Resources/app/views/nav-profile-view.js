define([
	'chaplin',
	'app/views/base/view'
], function (Chaplin, BaseView) {

	return BaseView.extend({
		container: '#nav ul',
		containerMethod: 'prepend',
		noWrap: true,
		template: 'nav-profile-view.html',
		autoRender: true
	});
});