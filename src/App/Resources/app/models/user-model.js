define(['jquery', 'app/models/base/model', 'app/models/media-collection' ], function ($, BaseModel, MediaCollection) {
    'use strict';

    return BaseModel.extend({
        defaults: {
//            userId: null
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