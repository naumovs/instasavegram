define(['js/server-routes'], function(ServerRoutes) {

	var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	function SymfonyRouter() {
		this.generate = __bind(this.generate, this);
		this.ServerRoutes = ServerRoutes;
	}

	SymfonyRouter.prototype.generateMatch = function(routename) {
		var param, params, route, token, url, _i, _j, _len, _len1, _ref;

		route = ServerRoutes.routes[routename];
		url = '';
		params = [];
		_ref = route.tokens;
		for (_i = 0, _len = _ref.length; _i < _len; _i++) {
			token = _ref[_i];
			if (token[0] === 'text') {
				url = token[1].slice(1);
				continue;
			}
			if (token[0] === 'variable' && token[1] !== '.') {
				params.push(token[3]);
			}
		}
		for (_j = 0, _len1 = params.length; _j < _len1; _j++) {
			param = params[_j];
			url += '/:' + param;
		}

//		url = ServerRoutes.base_url + '/' + url;
		if (/\/+$/.test(url)) {
			url = url.substr(0, url.length - 1);
		}
		if (url.indexOf('/') === 0) {
			url = url.replace('/', '');
		}

		delete ServerRoutes.routes[routename];

		return url;
	};

	SymfonyRouter.prototype.generate = function(name, params) {
		var url;
		url = Routing.generate(name, params);
		if (url.endsWith('/')) {
			url = url.substr(0, url.length - 1);
		}
		return url;
	};

	return new SymfonyRouter;



});