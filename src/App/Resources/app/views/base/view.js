define([ 'underscore', 'chaplin', 'app/globals', 'app/lib/utils', 'app/lib/view-helper' ], function (_, Chaplin, Globals, utils, ViewHelper) {
	'use strict';

	var View = Chaplin.View.extend({
		templateData: {},
		getTemplateData: function () {
			var model = Chaplin.View.prototype.getTemplateData.apply(this, arguments);

			var globalFunc = {
				app: Globals,
				asset: function() { return '/' + arguments[0] },
				path: utils.redirectTo
			};
			return _.extend(
				globalFunc,
				this.templateData,
				{ model: model, collection: model }
			);
		},
		getTemplateFunction: function () {
			var me = this;
//		return function(){
//			return me.template;
//		};

			// Template compilation
			// --------------------

			// This demo uses Handlebars templates to render views.
			// The template is loaded with Require.JS and stored as string on
			// the view prototype. On rendering, it is compiled on the
			// client-side. The compiled template function replaces the string
			// on the view prototype.
			//
			// In the end you might want to precompile the templates to JavaScript
			// functions on the server-side and just load the JavaScript code.
			// Several precompilers create a global JST hash which stores the
			// template functions. You can get the function by the template name:
			//
			// templateFunc = JST[@templateName];

			var template = this.template,
				templateFunc = null;

			if (typeof template === 'string') {

				templateFunc = ViewHelper.getTemplateFunction(this.template);
				// Compile the template string to a function and save it
				// on the prototype. This is a workaround since an instance
				// shouldn’t change its prototype normally.
//        templateFunc = nunjucks.render(template);
//        this.constructor.prototype.template = templateFunc;
			}
			else {
				templateFunc = template;
			}

			return templateFunc;
		}
	});

	return View;
});
