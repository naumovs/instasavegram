define([ 'app/lib/utils', 'app/models/base/model' ], function (utils, BaseModel) {
    'use strict';

    return BaseModel.extend({
        defaults: { },
	    load: function() {

		    var image, me = this;

		    if (me.trigger('beforeLoad', this)) {

				this.set('loading', true);
			    image = new Image();

			    image.onload = function() {
				    me.trigger('loadSuccess', image);
				    image = image.onload = image.onerror = null;
			    };

			    image.onerror = function() {

					if (!me.get('ownProxyTried')) {
						me.set('ownProxyTried', true);
						image.src = utils.reverse('imageProxy') + "?url=" + encodeURIComponent(me.get('images').standard_resolution.url);
					} else {
						me.trigger('loadError', image);
					}

			    };
				image.crossOrigin = 'anonymous';

//				image.crossOrigin = '';
//			    try {
				var timestamp = Date.now();;
				image.src = this.get('images').standard_resolution.url.replace('http://', 'http://www.corsproxy.com/') + '?' + timestamp;
//			    } catch (e) {
//				    me.trigger('loadError', image);
//				    image = image.onload = image.onerror = null;
//			    }
		    }

	    }

	// Mixin a synchronization state machine.
        // initialize: function() {
        //   _.extend(this, Chaplin.SyncMachine);
        //   Chaplin.Model.prototype.apply(this, arguments);
        //   this.on('request', this.beginSync);
        //   this.on('sync', this.finishSync);
        //   this.on('error', this.unsync);
        // }

        // Place your application-specific model features here
    });
});