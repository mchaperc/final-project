var SchoolCollection = Backbone.Collection.extend({

	url: function() {
		return 'http://afternoon-ocean-5057.herokuapp.com/great/' + this.zipcode;
	},
	
	initialize: function(options) {
		this.zipcode = options.zipcode;
	}

});

export default {SchoolCollection};