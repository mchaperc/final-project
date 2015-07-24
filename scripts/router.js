import LandingView from './views/landing';
import ListingView from './views/listing';
import UserView from './views/user';
import LoadingView from './views/loading';
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
		Parse.initialize('VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw', 'KGq62htoH5zj0Hv6WZsWG0IQoaA04ufqKD0f73JZ');
		this.homes = new HomeCollection();
		this.homes.fetch();
	},

	index: function() {
		$('#app').removeClass('listing');
		$('#app').removeClass('users');
		$('#app').addClass('landing');
		var loadingView = new LoadingView();
		$('#app').html(loadingView.el);
		this.myLocation = new Promise(function(resolve, reject) { 
  			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		Promise.resolve(this.myLocation).then(function(value) {
			this.homes.fetch().then(function(data) {
				var searchLocation = new SearchLocation(value);
				if (Parse.User.current()) {
					var user = new User();
					this.landingView = new LandingView({collection: this.homes,
														search: searchLocation,
														user: user}, {isUser: true});
				} else {
					var users = new UserCollection();
					this.landingView = new LandingView({collection: this.homes, 
														search: searchLocation,
														users: users},
														{isUser: false});
				}
				$('.sk-circle').remove();
				$('#app').append(this.landingView.el);
				if(localStorage.getItem('visited') == 'true') {
		    		console.log('visited');
					if(window.innerWidth < 980) {
						console.log('mobile');
						$('.site-nav-item:nth-child(2)').addClass('hide-me-mobile');
			 			$('.site-nav-item-branding').addClass('hide-description-mobile');
			 			$('.site-nav-item:nth-child(2)').children().addClass('hide-description-mobile');
			    	} else {
			    		console.log('comp');
			    		$('.site-nav-item:nth-child(2)').addClass('hide-me-comp');
			    		$('.site-nav-item:nth-child(2)').children().addClass('hide-description-comp');
			    	}
				} else {
					localStorage.setItem('visited', true);
				}
			}.bind(this))
		}.bind(this));
	},

	users: function() {
		var loadingView = new LoadingView();
		$('#app').html(loadingView.el);
		$('#app').removeClass('listing');
		$('#app').addClass('users');
		if (Parse.User.current()) {
			this.homes.fetch().then(function(data) {
				var homesColl = new HomeCollection(data);
				var user = Parse.User.current();
				var userView = new UserView({model: user, collection: homesColl});
				$('#app').html(userView.el);
				$('#app').removeClass('landing');
				$('#app').removeClass('users');
				$('#app').addClass('listing');
			})
		} else {
			router.navigate('', true);
		}
	},

	listing: function(id) {
		var loadingView = new LoadingView();
		$('#app').html(loadingView.el);
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
			$('#app').removeClass('landing');
			$('#app').removeClass('users');
			$('#app').addClass('listing');
		}.bind(this));
	}

});

var router = new Router();
export default router;