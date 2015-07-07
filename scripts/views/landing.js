export default Backbone.View.extend({

	template: JST['landing'],
	tagName: 'ul',
	className: 'site-nav',

	events: {
		'submit .site-nav-item-search-form': 'submitSearch',
	},

	initialize: function(options) {
		this.render(options);
	},

	render: function(options) {
		this.$el.html(this.template(this.model.toJSON()));
		new GMaps({
		  div: '#app',
		  lat: options.myLocation.coords.latitude,
		  lng: options.myLocation.coords.longitude
		});
	},

	submitSearch: function(e) {
		e.preventDefault();
		var searchAddress = $('.site-nav-item-search-address').val();
		var searchCityState = $('.site-nav-item-search-city-state').val();
		$('.site-nav-item-search-form input').val('');
		this.model.fetch({data: {address: searchAddress, citystatezip: searchCityState}}).then(function(data) {
			console.log(data);
		});
	}

})