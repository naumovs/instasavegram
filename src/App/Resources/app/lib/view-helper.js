define([ 'app/globals', 'nunjucks', 'app/lib/utils' ], function (Globals, nunjucks, utils) {
	'use strict'

	var env = nunjucks.configure('/app/views', {
		dev: Globals.debug,
		watch: Globals.debug,
		autoescape: true
	});

//	env.addFilter('path', function(url, params) {
//		debugger;
//		return utils.reverse(url, params || {});
//	});

	function getTemplateFunction(template) {
		var template;

		template = env.getTemplate(template);

		return template.render.bind(template);
	}

	return {
		getTemplateFunction: getTemplateFunction
	};
});
