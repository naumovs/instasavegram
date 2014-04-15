define( ['app/models/base/model'], function ( BaseModel ) {

	var cookies;

	return BaseModel.extend( {

		tryHandle: function () {

			var accessToken = this.readCookie('instaAT');

			if (accessToken) {
				return this.get('controller').trigger('foundToken', accessToken, this);
			}

			return this.get('controller' ).trigger('failed', this);
		},
		readCookie: function ( name, c, C, i ) {
			if ( cookies ) {
				return cookies[name];
			}

			c = window.document.cookie.split( '; ' );
			cookies = {};

			for ( i = c.length - 1; i >= 0; i-- ) {
				C = c[i].split( '=' );
				cookies[C[0]] = C[1];
			}

			return cookies[name];
		},
		getName: function () {
			return 'Cookie';
		}
	} );
} );