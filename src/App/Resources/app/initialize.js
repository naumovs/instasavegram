require(['app/globals', 'app/lib/utils', 'app/application', 'app/routes'], function (Globals, Utils, Application, routes) {
	Globals['app'] = new Application({
		title: 'instasavegram',
		routes: routes,
		controllerPath: 'app/controllers/',
		controllerSuffix: '-controller',
		root: Globals['base-url']
	});
});