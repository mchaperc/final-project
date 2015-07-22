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

		// Initialize Parse within View in order to validate users

		Parse.initialize('VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw', 'KGq62htoH5zj0Hv6WZsWG0IQoaA04ufqKD0f73JZ');

		// Part of the process for filtering homes based on user inputs - the "originalCollection" allows
		// for a home base of sorts to which we may return after filtering. Without this, it would require
		// an API call every time a user was interested in filtering results.

		this.originalCollection = this.collection.clone();

		// The following is taking a parameter passed via "options" and assigning it to an accessible
		// variable name.

		this.search = options.search;

		// Triggers the rendering of the page's contents

		this.render();

		// A report to the console of what technologies are being utilized within this project.

		console.log('Thanks for checking out my project! Here\'s a list of the technologies used for this project: ', 
				{
					JavaScript: ['JavaScript', 'jQuery', 'Underscore', 'Backbone', 'Handlebars', 'Node', 'Express', 'ES6', 'Babel', 'Require', 'Parse', 'Modernizr', 'Gulp', 'GMaps', 'HighCharts'], 
					HTML: 'HTML5', 
					CSS: ['SCSS', 'Bourbon', 'Neat'],
					RestfulAPIs: ['Parse.com', 'Education.com', 'GeoDataService.net', 'SimplyRETS.com', 'GreatSchools.org'],
					otherResources: ['GeoLocation Services', 'Google Maps', ]
				});
	},

	render: function() {

		// Check to see if the current user is an authenticated/authorized user. If true, a boolean value is
		// set on the "user" object allowing for the view to render the appropriate information - ie. a login
		// form if not logged in, a link to the profile page if logged in, or not allowing the registration form
		// to be accessed if logged in.

		if (Parse.User.current()) {
			this.user = Parse.User.current();
			this.user.set('isUser', true);
		} else {
			this.user = new Backbone.Model();
			this.user.set('isUser', false);
		}

		// Instantiating a Google Maps object to which our results will be posted.

		this.areaMap = new GMaps({
		  el: '#app',
		  lat: '0',
		  lng: '0',
		  zoom: 10
		});

		// Calling rerender, which is utilized when things like search or filter are called. This does not
		// require rerendering the entire page. Instead, it only rerenders the elements being updated.

		this.rerender();

	},

    rerender: function() {

    	// Setting the HTML of our element to the contents of our template and allowing access to the user
    	// object.

    	this.$el.html(this.template(this.user.toJSON()));

    	// Once more MLS data is available, this will be based on geolocation 
		// and NOT hardcoded coordinates. The following code is setting the latitude and longitude
		// around which the Google Maps will be centered.

		this.lat = this.search.get('lat') || '29.7604';
		this.lng = this.search.get('lng') || '-95.3698';

		this.areaMap.setCenter(this.lat, this.lng);

		// Triggers functionality for rendering pins on the map.

		this.renderChildren();
	},

	renderChildren: function() {

		// First, remove all markers from map to avoid duplication.

		this.areaMap.removeMarkers();
		var self = this;

		// If user is not logged in, render all of the returned housing results as pins, else
		// apply any user saved filters before rendering the returned housing results as pins.

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

		// Reset the collection to the original collection's value so that it can be utilized without
		// filters if requested by the user.

		this.collection = this.originalCollection.clone();
	},

	// remove: function(){

	// 	// 
	// 	_.invoke(this.children || [], 'remove');
	// 	Backbone.View.prototype.remove.apply(this, arguments);
	// },

	submitSearch: function(e) {

		// Take the user's input value from the address search and use it to re-center the
		// Google Map. 

		e.preventDefault();
		var searchArea = $('.site-nav-item-search-area').val();
		$('.site-nav-item-search-area').val('');
		this.search.set('address', searchArea);
		this.search.fetch().then(function(data) {
			this.search.set('lat', data.results[0].geometry.location.lat);
			this.search.set('lng', data.results[0].geometry.location.lng);
			console.log(this.search);
			this.rerender();
		}.bind(this));
	},

	submitFilter: function(e) {

		// Take the filters provided by the user within the filters form and, if the user is logged in
		// update the user's preferences, rerender the pins without reloading the entire page.

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

		// Save filter values input by an authorized user to his/her user object.

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

		// When a user clicks on a pin, a modal will pop up with limited information for the listing.
		// The user can choose to view more or close the modal.

		this.PopUp = new PopUpView({model: model});
		this.$el.append(this.PopUp.el);
	},

	logIn: function() {

		// Functionality for taking user inputs and attempting to log in via Parse. If successful,
		// the user is redirected to his/her profile. If unsuccessful, an error message is alerted.

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

		// Functionality for taking user inputs and creating a new user on Parse. If successful, the
		// the user is redirected to a profile page. If unsuccessful, an error message is alerted.

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

		// If the current user is logged in, the registration tab will not expand, hiding the
		// registration form.

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

		// Functionality for closing the branding banner.

    	$(e.target).hide();
    	$(e.target).parent().find('div').fadeOut(100);
    	if(window.innerWidth < 980) {
    		$(e.target).parent().css({'width': '5%'});	
    	} else {
    		$(e.target).parent().css({'width': '2.5%'});
    	}
    },

    noOpen: function() {

    	// Once closed, this prevents the branding banner from reopening.

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

    	// This determines whether the user is logged in before showing (on hover/mouseenter) the appropriate 
    	// content - either login form or a link to the user's profile.

    	if (Parse.User.current()) {
    		$('.profile-link').css({'opacity': '1'});
    	} else {
    		$('.login').css({'opacity': '1'});
    	}
    },

    loginFunc2: function() {

    	// This determines whether the user is logged in before hiding (on mouseleave) the appropriate
    	// content - either login form or a link to the user's profile.

    	if (Parse.User.current()) {
    		$('.profile-link').css({'opacity': '0'});
    	} else {
    		$('.login').css({'opacity': '0'});
    	}
    }

})