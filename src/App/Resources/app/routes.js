define( [ 'app/symfony-router' ], function (SymfonyRouter) {
	'use strict';

	var route = function (param) {
		return SymfonyRouter.generateMatch(param);
	};

	return function (match) {
		var routes, i;

		routes = SymfonyRouter.ServerRoutes.routes;

		for (i = 0; i < routes.length; i++) {

			match(route(routes[i].name), (routes[i].defaults.controller ? routes[i].defaults.controller : 'dynamic#' + routes[i].name), {
				name: routes[i].name,
				routeParams: routes[i]
			});
		}

	};

});
