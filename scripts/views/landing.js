export default Backbone.View.extend({

	template: JST['landing'],
	tagName: 'ul',
	className: 'site-nav',

	events: {
		'submit .site-nav-item-search-form': 'submitSearch',
		'submit .site-nav-item-filter': 'submitFilter'
	},

	initialize: function(options) {
		this.render(options);
	},

	render: function(options) {
		this.$el.html(this.template(this.collection.toJSON()));
		//Once more MLS data is available, 
		var lat = '29.7604';
		var lng = '-95.3698';
		this.areaMap = new GMaps({
		  div: '#app',
		  lat: lat,
		  lng: lng,
		  zoom: 10
		});

		this.renderChildren();
	},

	renderChildren: function() {
		
		this.children = this.collection.map(function(child) {
			if (child.attributes.geo.lat && child.attributes.geo.lng) {
				var lat = child.attributes.geo.lat;
				var lng = child.attributes.geo.lng;
				this.areaMap.addMarker({
					lat: lat,
					lng: lng,
					info: child,
					click: function(e) {
						console.log(this.info.attributes);
					}
				});
			}
		}.bind(this));

	},

	remove: function(){
		_.invoke(this.children || [], 'remove');
		Backbone.View.prototype.remove.apply(this, arguments);
	},

	submitSearch: function(e) {
		e.preventDefault();
		var searchArea = $('.site-nav-item-search-area').val();
		$('.site-nav-item-search-area').val('');
		console.log(searchArea);	
	},

	submitFilter: function(e) {
		e.preventDefault();
		var minPrice = $('.filter-price-min-input').val();
		var maxPrice = $('.filter-price-max-input').val();
		var beds = $('.filter-bedrooms-input').val();
		var baths = $('.filter-bathrooms-input').val();
		var minSq = $('.filter-sqft-min-input').val();
		var maxSq = $('.filter-sqft-max-input').val();
		console.log(minPrice, maxPrice, beds, baths, minSq, maxSq);
	}

})