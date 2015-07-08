export default Backbone.View.extend({

	template: JST['landing'],
	tagName: 'ul',
	className: 'site-nav',

	events: {
		'submit .site-nav-item-search-form': 'submitSearch',
	},

	initialize: function(options) {
		this.render(options);
		this.collection.fetch().then(function(data) {
			console.log(data);
		});
	},

	render: function(options) {
		this.$el.html(this.template(this.collection.toJSON()));
		//Once more MLS data is available, 
		var lat = '30.098905';
		var lng = '-95.618899';
		var map = new GMaps({
		  div: '#app',
		  lat: lat,
		  lng: lng
		});
		this.renderChildren();
	},

	renderChildren: function() {
		
	},

	submitSearch: function(e) {
		e.preventDefault();
		var searchArea = $('.site-nav-item-search-area').val();
		$('.site-nav-item-search-area').val('');
		console.log(searchArea);	
	}

})