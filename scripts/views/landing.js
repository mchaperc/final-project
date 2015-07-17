import PopUpView from './popup';
import {SearchLocation} from '../models/location';
import {HomeCollection} from '../models/homes';
import router from '../router';

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
		if(!Parse.User.current()) {
			localStorage.setItem('isUser', false);
		} else {
			localStorage.setItem('isUser', true);
		}
		this.render(options);
		console.log(this.collection.isUser);
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
		if(!Parse.User.current()) {
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
		} else {
			var userFilters = Parse.User.current().get('filters');
			this.collection.minPrice = userFilters.minPrice;
			this.collection.maxPrice = userFilters.maxPrice;
			this.collection.bedrooms = userFilters.bedrooms;
			this.collection.baths = userFilters.baths;
			this.collection.minSq = userFilters.minSq;
			this.collection.maxSq = userFilters.maxSq;
			this.filteredCollection = new HomeCollection(this.collection.filteredCollection(this.collection));
			this.collection = this.filteredCollection.clone();
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
		}
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
		if (Parse.User.current()) {
			this.updateFilters();
		}
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

	updateFilters: function() {
		var minPrice = $('.filter-price-min-input').val() || 0;
		var maxPrice = $('.filter-price-max-input').val() || 100000000;
		var bedrooms = $('.filter-bedrooms-input').val() || 0;
		var baths = $('.filter-bathrooms-input').val() || 0;
		var minSq = $('.filter-sqft-min-input').val() || 0;
		var maxSq = $('.filter-sqft-max-input').val() || 10000000;
		var updatedFilters = {
			minPrice: minPrice, 
			maxPrice: maxPrice, 
			bedrooms: bedrooms, 
			baths: baths, 
			minSq: minSq, 
			maxSq: maxSq
		}
		console.log(updatedFilters);
		Parse.User.current().set('filters', updatedFilters);
		Parse.User.current().save();
		console.log(Parse.User.current());
	},

	renderPopUp: function(model) {
		this.PopUp = new PopUpView({model: model});
		this.$el.append(this.PopUp.el);
	},

	logIn: function() {
		var username = this.$('.login-email').val();
		var password = this.$('.login-password').val();
		Parse.User.logIn(username, password, {
		  success: function(user) {
		    console.log(user);
			Parse.User.become(user.sessionToken).then(function(user) {
			 router.navigate('#users', true);
			});
		  },
		  error: function(user, error) {
		    alert(error);
		  }
		});
	},

	createUser: function() {
		var name = this.$('.register-name').val();
		var username = this.$('.register-email').val();
		var password = this.$('.register-password').val();
		var user = new Parse.User();
		user.set('name', name);
		user.set('username', username);
		user.set('password', password);
		user.set('homes', []);
		user.set('filters', {minPrice: 0, maxPrice: 1000000000, bedrooms: 0, baths: 0, minSq: 0, maxSq: 1000000});
		user.signUp(null, {
			success: function(user) {
				console.log(user);
				Parse.User.become(user.sessionToken).then(function(user) {
				 router.navigate('#users', true);
				});
			},
			error: function(user, error) {
				alert('Error: registration unsuccessful due to ' + error);
				console.log(error);
			}
		});
	}

})