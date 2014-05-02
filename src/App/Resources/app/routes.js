define( [ 'app/symfony-router' ], function (SymfonyRouter) {
	'use strict';

	var route = function (param) {
		return SymfonyRouter.generateMatch(param);
	};

	return function (match) {
		var routes, i;
		// TODO: specify controller and action via params on server side

		routes = SymfonyRouter.ServerRoutes.routes;

		for (i = 0; i < routes.length; i++) {

			match(route(routes[i].name), (routes[i].defaults.controller ? routes[i].defaults.controller : 'dynamic#show'), {
				name: routes[i].name,
				routeParams: routes[i]
			});
		}

	};

});
