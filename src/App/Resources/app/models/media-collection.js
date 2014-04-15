define([ 'app/models/media-cache',  'app/models/base/collection', 'app/models/media-model', 'chaplin' ], function (mediaCache, BaseCollection, MediaModel, Chaplin) {
    'use strict';

    var MediaCollection = BaseCollection.extend({
	    model: MediaModel,
	    nextPageUrl: 'https://api.instagram.com/v1/users/self/media/recent?count=100',
	    url: function() {
		    if (this.nextPageUrl) {
			    return this.nextPageUrl + '&access_token=' + Chaplin.mediator.accessToken;
		    }

		    return null;
	    },
	    loadNextPage: function(success) {

			if (this.nextPageUrl) {
				this.fetch({
					merge: true,
					remove: false,
					dataType: "jsonp",
					success: success
				});
				return true;
			}

			this.trigger('listLoaded');
			return false;

	    },
		loadAllPages: function() {
			var me = this;

			var success = function(){
				me.loadNextPage(success);
			}
			success();
		},
	    parse: function(response) {

		    if (response.pagination && response.pagination.next_url) {
			    this.nextPageUrl = response.pagination.next_url;
		    } else {
				this.nextPageUrl = false;
			}

		    if (response.meta && response.meta.code === 200) {
				console.log('loaded', response.data);
			    return response.data;
		    }

		    return [];
	    }

//        defaults: {
//            authenticated: false,
//            username: 'Anonymous',
//            userId: null
//        }
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

	return MediaCollection;
});