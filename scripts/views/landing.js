import PopUpView from './popup';
import {SearchLocation} from '../models/location';
import {HomeCollection} from '../models/homes';
export default Backbone.View.extend({

	template: JST['landing'],
	tagName: 'ul',
	className: 'site-nav',

	events: {
		'submit .site-nav-item-search-form': 'submitSearch',
		'submit .site-nav-item-filter': 'submitFilter'
	},

	initialize: function(options) {
		this.searchLocation = this.searchLocation || options.search;
		this.render(options);
	},

	render: function(options) {
		this.$el.html(this.template(this.collection.toJSON()));
		// Once more MLS data is available, this will be based on geolocation 
		// and NOT hardcoded coordinates
		if (this.searchLocation.get('lat') && this.searchLocation.get('lng')) {
			var lat = this.searchLocation.lat;
			var lng = this.searchLocation.lng;
			this.areaMap = new GMaps({
			  div: '#app',
			  lat: lat,
			  lng: lng,
			  zoom: 10
			});
		} else {
			var lat = '29.7604';
			var lng = '-95.3698';
			this.areaMap = new GMaps({
			  div: '#app',
			  lat: lat,
			  lng: lng,
			  zoom: 10
			});
		}

		this.renderChildren();
	},

	renderChildren: function() {
		var self = this;
		this.children = this.collection.map(function(child) {
			if (child.attributes.geo.lat && child.attributes.geo.lng) {
				var lat = child.attributes.geo.lat;
				var lng = child.attributes.geo.lng;
				this.areaMap.addMarker({
					lat: lat,
					lng: lng,
					model: child,
					click: function(e) {
						self.renderPopUp(this.model);
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
		this.searchLocation.set('address', searchArea);
		this.searchLocation.fetch().then(function(data) {
			this.searchLocation.set('lat', data.results[0].geometry.location.lat);
			this.searchLocation.set('lng', data.results[0].geometry.location.lng);
			console.log(this.searchLocation);
		}.bind(this));
	},

	submitFilter: function(e) {
		e.preventDefault();
		var minPrice = $('.filter-price-min-input').val();
		var maxPrice = $('.filter-price-max-input').val();
		var beds = $('.filter-bedrooms-input').val();
		var baths = $('.filter-bathrooms-input').val();
		var minSq = $('.filter-sqft-min-input').val();
		var maxSq = $('.filter-sqft-max-input').val();
		this.filteredCollection = new HomeCollection(this.collection.filteredCollection(minPrice, maxPrice, beds, baths, minSq, maxSq));
		this.filteredRender();
	},

	renderPopUp: function(model) {
		this.PopUp = new PopUpView({model: model});
		this.$el.append(this.PopUp.el);
	}

})