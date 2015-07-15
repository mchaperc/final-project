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
		$('#app').html('');
		$('#app').removeClass('listing');
		$('#app').removeClass('users');
		$('#app').addClass('landing');
		this.myLocation = new Promise(function(resolve, reject) { 
  			navigator.geolocation.getCurrentPosition(resolve, reject);
		}).then(function(position) {
			return position;
		});
		Promise.resolve(this.myLocation).then(function(value) {
			this.homes.fetch().then(function(data) {
				var searchLocation = new SearchLocation();
				this.homesColl = new HomeCollection(data);
				if (Parse.User.current()) {
					var user = new User();
					this.LandingView = new LandingView({collection: this.homesColl, 
													myLocation: value, 
													search: searchLocation,
													user: user});
				} else {
					var users = new UserCollection();
					this.LandingView = new LandingView({collection: this.homesColl, 
													myLocation: value, 
													search: searchLocation,
													users: users});
				}
				$('#app').html(this.LandingView.el);
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