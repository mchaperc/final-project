import LandingView from './views/landing';
import ListingView from './views/listing';
import {HomeCollection} from './models/homes';
import {SearchLocation} from './models/location';
import config from './ajax-config';

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'filtered': 'filtered',
		'users/:id': 'users',
		'listing': 'listing'
	},

	initialize: function() {
		
	},

	index: function() {
		$('#app').addClass('landing');
		this.homes = new HomeCollection();
		this.myLocation = new Promise(function(resolve, reject) { 
  			navigator.geolocation.getCurrentPosition(resolve, reject);
		}).then(function(position) {
			return position;
		});
		Promise.resolve(this.myLocation).then(function(value) {
			this.homes.fetch().then(function(data) {
				var searchLocation = new SearchLocation();
				this.homesColl = new HomeCollection(data);
				this.LandingView = new LandingView({collection: this.homesColl, 
													myLocation: value, 
													search: searchLocation});
				$('#app').html(this.LandingView.el);
			}.bind(this))
		}.bind(this));
	},

	users: function() {

	},

	listing: function() {
		$('#app').removeClass('landing');
		$('#app').addClass('listing');
		var homes = new HomeCollection();
		homes.fetch().then(function(data) {
			var homesColl = new HomeCollection(data);
			this.listingView = new ListingView({collection: homesColl});
			$('#app').html(this.listingView.el);
		}.bind(this));
	}

});

var router = new Router();
export default router;