define(['app/models/base/model'], function(BaseModel) {

	return BaseModel.extend({

		tryHandle: function() {

		    var accessToken;
		    if ( /^#access_token=/.test(window.location.hash) ) {
			    accessToken = window.location.hash.replace('#access_token=', '');

			    return this.get('controller').trigger('foundToken', accessToken, this);
		    }

		    if ( /access_token=/.test(window.location.pathname) ) {
			    accessToken = window.location.pathname.replace(/^[^=]+=/, '');

			    return this.get('controller').trigger('foundToken', accessToken, this);
		    }

			return this.get('controller' ).trigger('failed', this);

		},
		getName: function() {
			return 'Hash';
		}
	});
});