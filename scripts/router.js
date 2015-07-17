import LandingView from './views/landing';
import ListingView from './views/listing';
import UserView from './views/user';
import {HomeCollection} from './models/homes';
import {SearchLocation} from './models/location';
import {User, UserCollection} from './models/users';
import config from './ajax-config';

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'filtered': 'filtered',
		'users': 'users',
		'listing/:id': 'listing'
	},

	initialize: function() {
		Parse.initialize('VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw', 'emZaIAgysn8nKGxKO8lYRchGqGko99VlAwbOSHRe');
		this.homes = new HomeCollection();
		this.homes.fetch();
	},

	index: function() {
		$('#app').html('<div class="sk-circle">' + '<div class="sk-circle1 sk-child"></div>' + '<div class="sk-circle2 sk-child"></div>' + '<div class="sk-circle3 sk-child"></div>' + '<div class="sk-circle4 sk-child"></div>' + '<div class="sk-circle5 sk-child"></div>' + '<div class="sk-circle6 sk-child"></div>' + '<div class="sk-circle7 sk-child"></div>' + '<div class="sk-circle8 sk-child"></div>' + '<div class="sk-circle9 sk-child"></div>' + '<div class="sk-circle10 sk-child"></div>' + '<div class="sk-circle11 sk-child"></div>' + '<div class="sk-circle12 sk-child"></div>' + '</div>');
		$('#app').removeClass('listing');
		$('#app').removeClass('users');
		$('#app').addClass('landing');
		this.myLocation = new Promise(function(resolve, reject) { 
  			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		Promise.resolve(this.myLocation).then(function(value) {
			this.homes.fetch().then(function(data) {
				var searchLocation = new SearchLocation(value);
				if (Parse.User.current()) {
					var user = new User();
					if (this.landingView) {
						this.landingView.render();
					} else {
						this.landingView = new LandingView({collection: this.homes,
															search: searchLocation,
															user: user});
					}
				} else {
					var users = new UserCollection();
					if (this.landingView) {
						this.landingView.render();
					} else {
						this.landingView = new LandingView({collection: this.homes, 
															search: searchLocation,
															users: users});
					}
				}
				$('.sk-circle').remove();
				$('#app').append(this.landingView.el);
			}.bind(this))
		}.bind(this));
	},

	users: function() {
		$('#app').html('');
		$('#app').removeClass('listing');
		$('#app').addClass('users');
		if (Parse.User.current()) {
			this.homes.fetch().then(function(data) {
				var homesColl = new HomeCollection(data);
				var user = Parse.User.current();
				var userView = new UserView({model: user, collection: homesColl});
				$('#app').html(userView.el);
			})
		} else {
			router.navigate('', true);
		}
	},

	listing: function(id) {
		$('#app').html('');
		$('#app').removeClass('landing');
		$('#app').removeClass('users');
		$('#app').addClass('listing');
		var homes = new HomeCollection();
		homes.fetch().then(function(data) {
			var homesColl = new HomeCollection(data);
			var home = homesColl.filter(function(listing) {
				return listing.get('mlsId') == id;
			})[0];
			if(Parse.User.current()) {
				var user = Parse.User.current();
			}
			this.listingView = new ListingView({model: home, collection: homesColl, user: user});
			$('#app').html(this.listingView.el);
		}.bind(this));
	}

});

var router = new Router();
export default router;