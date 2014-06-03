define([ 'chaplin' ], function(Chaplin) {

	return Chaplin.View.extend({
		container: '#content',
		containerMethod: 'html',
		autoRender: true,
		getTemplateFunction: function(){
			var me = this;
			return function() {
				return me.template;
			}
		}
//		initialize: function() {
//			Chaplin.View.prototype.initialize.apply(this, arguments);
//			$('#payload').remove();
//		}
	});
});