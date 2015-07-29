var DemographicsCollection = Backbone.Collection.extend({

	url: function() {
		return 'http://afternoon-ocean-5057.heroku-app.com/demo/' + this.zipcode;
	},
	
	initialize: function(options) {
		this.zipcode = options.zipcode;
	}

});

export default {DemographicsCollection};