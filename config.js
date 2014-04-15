exports.config = {
	paths: {
		public: 'web/',
		watched: ['web/app']
	},
	files: {
		javascripts: {
			//// Defines what file will be generated with `brunch generate`.
			defaultExtension: 'js',

			// Describes how files will be compiled & joined together.
			// Available formats:
			// * 'outputFilePath'
			// * map of ('outputFilePath': /regExp that matches input path/)
			// * map of ('outputFilePath': function that takes input path)
			joinTo: {
				'js/app.js': /^web\/app/ //,
//				'js/vendor.js': function (path) {
//					var allowed = {
//						'bower_components/console-polyfill/index.js': true,
//						'bower_components/jquery/dist/jquery.js': true,
//						'bower_components/lodash/dist/lodash.underscore.js': true,
//						'bower_components/exoskeleton/exoskeleton.js': true,
//						'bower_components/chaplin/chaplin.js': true
//					};
//
//					return allowed[path];
//				}
			},
			order: {
				before: [
//					'bower_components/console-polyfill/index.js',
//					'bower_components/jquery/dist/jquery.js',
//					'bower_components/lodash/dist/lodash.underscore.js',
//					'bower_components/exoskeleton/exoskeleton.js',
//					'bower_components/chaplin/chaplin.js',
					'web/app/application.js',
					'web/app/symfony-router.js',
					'web/app/lib/utils.js',
					'web/app/controllers/base/controller.js',
					'web/app/models/base/model.js',
					'web/app/views/base/view.js'
				]
			}

		}
		// TODO: precompile nunjucks html templates
//		templates: {
//            defaultExtension: 'html',
//			joinTo: 'js/app.js' //,
//		}
	},
	modules: {
		wrapper: 'amd',
		definition: false,
		nameCleaner: function (path) {
			return path.replace(/^web\//, '');
		}
	},
	conventions: {
		ignored: /bootstrap-sass/
	},
// Change this if you're using something other than backbone (e.g. 'ember').
// Content of files, generated with `brunch generate` depends on the setting.
	framework: 'backbone'
//	plugins: {
//		nunjucks: {
//			filePatterns: /^web\/app\/views.*html$/,
//			templatePath: /(web\/app)/,
//			pathReplace: /^web(\/|\\)app(\/|\\)views(\/|\\).*.html$/
//		}
//
//	}
};

// Settings of web server that will run with `brunch watch [--server]`.
// server:
//    // Path to your server node.js module.
//    // If it's commented-out, brunch will use built-in express.js server.
//    path: 'server.coffee'
//    port: 3333
//
//    // Run even without `--server` option?
//    run: yes
