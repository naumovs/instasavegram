define([
	'jquery',
	'chaplin',
	'app/controllers/base/controller',
	'app/models/media-cache',
	'app/models/media-collection',
	'app/views/media-download-view',
	'jszip',
	'filesaver',
], function ($, Chaplin, BaseController, mediaCache, MediaCollection, MediaDownloadView, JSZip, saveAs) {

	return BaseController.extend({
		initialize: function () {
			BaseController.prototype.initialize.apply(this, arguments);
			this.afterInitialize();
		},
		afterInitialize: function () {
			var me = this;

			this.view = new MediaDownloadView();

			this.view.$el.modal({
				backdrop: 'static',
				keyboard: true,
				show: true
			});

			var coll = new MediaCollection(mediaCache.getValue());

			coll.on('listLoaded', function(){
				count = coll.models.length;
			});

			coll.on('listLoaded', downloadPhotos);

			coll.loadAllPages();

			var zip = new JSZip(),
				que = 0,
				count = coll.models.length,
				downloaded = 0;

			coll.on('remove', function () {
				downloaded = downloaded + 1;
				me.view.setProgress(downloaded / count * 100);

				if (this.models.length == 0) {
					downloadZip();

				}
			});

			if (count == 0) {
//				console.log('media count = 0');
				return;
			}

			function downloadZip() {
//				console.log('downloading zip')
				var blob = zip.generate({type: "blob"});

				saveAs(blob, 'photos.zip');
				me.view.$el.modal('hide');
				Chaplin.mediator.trackerController.trackEventLocal('zip', 'download', '1');
				Chaplin.mediator.trackerController.trackEventLocal('photos', 'download', count);

				setTimeout(function(){
					me.dispose();
				}, 1000);
			}

			function downloadPhotos() {

				coll.forEach(function (photo, index, list) {

					if (que > 3) {
						return false;
					}

					if (photo.get('loading')) {
						return;
					}

					que = que + 1;

					photo.on('loadSuccess', function (image) {

						var ctx, canvas, dataUrl, ext;

						que = que - 1;

						canvas = document.createElement('canvas');
						canvas.width = photo.get('images').standard_resolution.width;
						canvas.height = photo.get('images').standard_resolution.height;
						ctx = canvas.getContext('2d');

						ctx.drawImage(image, 0, 0);

//						console.log(image.src);
						dataUrl = canvas.toDataURL("image/jpeg");

						if (dataUrl.indexOf('image/jpeg') != 5) {
							dataUrl = dataUrl.replace('data:image/png;base64,', '');
							ext = 'png';
						} else {
							dataUrl = dataUrl.replace('data:image/jpeg;base64,', '');
							ext = 'jpg';
						}

						zip.file(photo.get('id') + '.' + ext, dataUrl, {base64: true});

						canvas = ctx = null;

						coll.remove(photo);
						if (coll.models.length) {
							setTimeout(downloadPhotos, 200);
						}
					});

					photo.on('loadError', function (image) {
						que = que - 1;
						coll.remove(photo);

						if (coll.models.length) {
							setTimeout(downloadPhotos, 200);
						}
					});

					photo.load();
				});
			}

		}
	});

});