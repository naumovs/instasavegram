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
				'js/app.js': function (path) {
					var allowed = {
						'bower_components/console-polyfill/index.js': true,
						'bower_components/jquery/dist/jquery.js': true,
						'bower_components/lodash/dist/lodash.js': true,
						'bower_components/exoskeleton/exoskeleton.js': true,
						'bower_components/chaplin/chaplin.js': true,
						'bower_components/nunjucks/browser/nunjucks-slim.js': true,
						'bower_components/jszip/dist/jszip.js': true,
						'bower_components/FileSaver/FileSaver.js': true
					};
//
					return allowed[path] || /^web\/app/.test(path);
				}
			},
			order: {
				before: [
					'bower_components/console-polyfill/index.js',
					'bower_components/jquery/dist/jquery.js',
					'bower_components/lodash/dist/lodash.js',
					'bower_components/exoskeleton/exoskeleton.js',
					'bower_components/chaplin/chaplin.js',
					'bower_components/nunjucks/browser/nunjucks-slim.js',
					'bower_components/FileSaver/FileSaver.js',
					'bower_components/blob/Blob.js',
					'bower_components/blueimp-canvas-to-blob/js/canvas-to-blob.js',
					'bower_components/jszip/dist/jszip.js',
					'web/app/lib/vendor/loader.js',
					'web/app/lib/vendor/jquery.js',
					'web/app/lib/vendor/underscore.js',
					'web/app/lib/vendor/backbone.js',
					'web/app/lib/vendor/chaplin.js',
					'web/app/lib/vendor/nunjucks.js',
					'web/app/lib/vendor/jszip.js',
					'web/app/lib/vendor/saveAs.js',
					'web/app/templates.js',
					'web/app/application.js',
					'web/app/symfony-router.js',
					'web/app/lib/utils.js',
					'web/app/controllers/base/controller.js',
					'web/app/models/base/model.js',
					'web/app/views/base/view.js',
					'web/app/controllers/session-controller.js',
					'web/app/controllers/menu-controller.js',
					'web/app/controllers/dynamic-controller.js'
				],
				after: [
					'web/app/initialize.js'
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
	framework: 'backbone',

	plugins: {
		uglify: {
//			mangle: false,
//			compress: {
//				global_defs: {
//					DEBUG: false
//				}
//			}
		}
//		groundskeeper: {
//			console: true,                          // Keep console logs
//			debugger: true,                         // Keep debugger; statements
//			pragmas: ['validation', 'development'], // Keep pragmas with the following identifiers
//			namespace: 'console.log'                // Besides console also remove functions in the given namespace,
//			replace: '0'
//		}
//		afterBrunch: [
//			'node_modules/nunjucks/bin/precompile web/app/views >> web/app/templates.js'
//		]
	}
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
