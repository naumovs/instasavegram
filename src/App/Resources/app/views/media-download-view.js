define([ 'app/views/base/view' ], function(BaseView) {

	return BaseView.extend({
		container: 'body',
		autoRender: true,
		noWrap: true,
		template: 'media-download-view.html',
		progressValue: null,
		setProgress: function(value) {
			if (!this.progressValue) {
				this.progressValue = this.$el.find('[role=progressbar]')[0];
			}

			this.progressValue.style.width = value + '%';
			this.progressValue.innerHTML = Math.round(value) + '% completed';
		}
	});
});