require(['app/globals', 'app/lib/utils', 'app/application', 'app/routes'], function (Globals, Utils, Application, routes) {
	Globals['app'] = new Application({
		title: 'instasavegram',
		routes: routes,
		controllerPath: 'app/controllers/',
		controllerSuffix: '-controller',
		root: Globals['base-url']
	});

	if (Globals['app-ym-tracking']) {
		(function (d, w, c) {
			(w[c] = w[c] || []).push(function() {
				try {
					w['yaCounter' + Globals['app-ym-tracking'] ] = new Ya.Metrika({id: Globals['app-ym-tracking'],
						clickmap:true,
						trackLinks:true,
						trackHash:true,
						accurateTrackBounce:true});
				} catch(e) { }
			});

			var n = d.getElementsByTagName("script")[0],
				s = d.createElement("script"),
				f = function () { n.parentNode.insertBefore(s, n); };
			s.type = "text/javascript";
			s.async = true;
			s.src = (d.location.protocol == "https:" ? "https:" : "http:") + "//mc.yandex.ru/metrika/watch.js";
			f();
		})(document, window, "yandex_metrika_callbacks")
	}
});