var DemographicsCollection = Backbone.Collection.extend({

	url: function() {
		return 'http://localhost:5000/demo/' + this.zipcode;
	},
	
	initialize: function(options) {
		this.zipcode = options.zipcode;
	}

});

export default {DemographicsCollection};