var SchoolCollection = Backbone.Collection.extend({

	url: function() {
		return 'http://localhost:5000/great/' + this.zipcode;
	},
	
	initialize: function(options) {
		this.zipcode = options.zipcode;
	}

});

export default {SchoolCollection};