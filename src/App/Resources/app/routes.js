define( [ 'app/symfony-router' ], function (SymfonyRouter) {
	'use strict';

	var route = function (param) {
		return SymfonyRouter.generateMatch(param);
	};

	return function (match) {
		var name;
		// TODO: specify controller and action via params on server side

		match(route('profile'), 'profile#show', {
			name: 'profile'
		});

		for (name in SymfonyRouter.ServerRoutes.routes) {
			if (SymfonyRouter.ServerRoutes.routes.hasOwnProperty(name)) {
				match(route(name), 'dynamic#show', {
					name: name,
					routeParams: SymfonyRouter.ServerRoutes.routes[name]
				});
			}
		}
	};

});
