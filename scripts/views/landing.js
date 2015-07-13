import PopUpView from './popup';
import {SearchLocation} from '../models/location';
import {HomeCollection} from '../models/homes';

export default Backbone.View.extend({

	template: JST['landing'],
	tagName: 'ul',
	className: 'site-nav',

	events: {
		'submit .site-nav-item-search-form': 'submitSearch',
		'submit .site-nav-item-filter': 'submitFilter',
		'click .login-submit': 'logIn',
		'click .register-submit': 'createUser'
	},

	initialize: function(options) {
		Parse.initialize('VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw', 'KGq62htoH5zj0Hv6WZsWG0IQoaA04ufqKD0f73JZ');
		this.originalCollection = this.collection.clone();
		this.searchLocation = this.searchLocation || options.search;
		this.render(options);
	},

	render: function(options) {
		this.$el.html(this.template(this.collection.toJSON()));

		// Once more MLS data is available, this will be based on geolocation 
		// and NOT hardcoded coordinates

		var lat = this.searchLocation.get('lat') || '29.7604';
		var lng = this.searchLocation.get('lng') || '-95.3698';

		if(this.areaMap) {
			this.areaMap.setCenter(lat, lng);
		} else {
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
		this.areaMap.removeMarkers();
		var self = this;
		this.children = this.collection.map(function(child) {
			if (child.attributes.geo.lat && child.attributes.geo.lng) {
				var lat = child.attributes.geo.lat;
				var lng = child.attributes.geo.lng;
				// this.areaMap.drawOverlay({
				//   lat: lat,
				//   lng: lng,
				//   model: child,
			 //  	 click: function(e) {
				// 	self.renderPopUp(this.model);
				//   }
				//   content: '<div class="overlay">' + child.attributes.listPrice + '</div>'
				// });
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
		this.collection = this.originalCollection.clone();
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
			this.render();
		}.bind(this));
	},

	submitFilter: function(e) {
		e.preventDefault();
		this.collection.minPrice = $('.filter-price-min-input').val() || 0;
		this.collection.maxPrice = $('.filter-price-max-input').val() || 100000000;
		this.collection.bedrooms = $('.filter-bedrooms-input').val() || 0;
		this.collection.baths = $('.filter-bathrooms-input').val() || 0;
		this.collection.minSq = $('.filter-sqft-min-input').val() || 0;
		this.collection.maxSq = $('.filter-sqft-max-input').val() || 1000000000;
		this.filteredCollection = new HomeCollection(this.collection.filteredCollection(this.collection));
		this.collection = this.filteredCollection.clone();
		this.render();
	},

	renderPopUp: function(model) {
		this.PopUp = new PopUpView({model: model});
		this.$el.append(this.PopUp.el);
	},

	logIn: function() {

	},

	createUser: function() {
		var name = this.$('.register-name').val();
		var username = this.$('.register-email').val();
		var password = this.$('.register-password').val();
		var user = new Parse.User();
		user.set('username', username);
		user.set('password', password);
		user.signUp(null, {
			success: function(user) {
				console.log(user);
				router.navigate('');
			},
			error: function(user, error) {
				alert('Error: registration unsuccessful due to ' + error);
				console.log(error);
			}
		});
	}

})