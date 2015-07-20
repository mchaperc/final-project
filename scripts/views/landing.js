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
		'click .register-submit': 'createUser',
		'mouseenter .site-nav-item:last-child': 'stayPut',
		'click .fa-close': 'closeBanner',
		'mouseenter .site-nav-item:nth-child(2)': 'noOpen',
		'mouseenter .site-nav-item:nth-child(5)': 'loginFunc',
		'mouseleave .site-nav-item:nth-child(5)': 'loginFunc2'
	},

	initialize: function(options) {

		Parse.initialize('VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw', 'KGq62htoH5zj0Hv6WZsWG0IQoaA04ufqKD0f73JZ');

		this.originalCollection = this.collection.clone();

		this.search = options.search;
		this.render();
	},

	render: function() {

		if (Parse.User.current()) {
			this.user = Parse.User.current();
			this.user.set('isUser', true);
		} else {
			this.user = new Backbone.Model();
			this.user.set('isUser', false);
		}

		this.$el.html(this.template(this.user.toJSON()));

		this.areaMap = new GMaps({
		  el: '#app',
		  lat: '0',
		  lng: '0',
		  zoom: 10
		});

		this.rerender();

	},

    rerender: function() {

    	// Once more MLS data is available, this will be based on geolocation 
		// and NOT hardcoded coordinates

		this.lat = this.search.get('lat') || '29.7604';
		this.lng = this.search.get('lng') || '-95.3698';

		this.areaMap.setCenter(this.lat, this.lng);

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
		this.renderChildren();
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
			router.navigate('#users', true);
		  },
		  error: function(user, error) {
		    alert('Error: Invalid username or password.');
		    console.log(error);
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
				alert('Error: registration unsuccessful due to: ' + error.message);
				console.log(error.message);
			}
		});
	},

	stayPut: function() {
		if(Parse.User.current()) {
			if(window.innerWidth < 980) {
				$('.site-nav-item:last-child').css({'width': '5%'});
				$('.register').hide();
			} else {
				$('.site-nav-item:last-child').css({'width': '2.5%'});
				$('.register').hide();
			}
		}
	},

	closeBanner: function(e) {
    	$(e.target).hide();
    	$(e.target).parent().find('div').fadeOut(100);
    	if(window.innerWidth < 980) {
    		$(e.target).parent().css({'width': '5%'});	
    	} else {
    		$(e.target).parent().css({'width': '2.5%'});
    	}
    },

    noOpen: function() {
    	if (window.innerWidth < 980) {
    		if ($('.site-nav-item:nth-child(2)').width() < 100) {
	    		$('.site-nav-item:nth-child(2)').css({'width': '2.5%'});
	    	}
    	} else {
    		if ($('.site-nav-item:nth-child(2)').width() < 100) {
	    		$('.site-nav-item:nth-child(2)').css({'width': '2.5%'});
	    	}
    	}
    },

    loginFunc: function() {
    	if (Parse.User.current()) {
    		$('.profile-link').css({'opacity': '1'});
    	} else {
    		$('.login').css({'opacity': '1'});
    	}
    },

    loginFunc2: function() {
    	if (Parse.User.current()) {
    		$('.profile-link').css({'opacity': '0'});
    	} else {
    		$('.login').css({'opacity': '0'});
    	}
    }

})