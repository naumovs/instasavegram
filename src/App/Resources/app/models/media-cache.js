define(function() {

	var value = [];

	return {
		getValue: function() {
			return value;
		},
		setValue: function(v) {
			return value = v;
		}
	};

});