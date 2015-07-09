var SearchLocation = Backbone.Model.extend({

	defaults: {
      address: '77002'
	},

	urlRoot: 'https://maps.googleapis.com/maps/api/geocode/json',
	url: function() {
		return this.urlRoot + '?address='+ this.get('address') +'&components=locality&components=postal_code&key=AIzaSyAa8ybQRvx0M-3HYRgivQXBauKFFLVr6HI';
		// console.log(this.urlRoot + params.params.locale);
		// return this.urlRoot + params.params.locale;
	}

});

export default {SearchLocation};