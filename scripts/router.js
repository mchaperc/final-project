import LandingView from './views/landing';
import {HomeCollection} from './models/homes';
import config from './ajax-config';

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'users/:id': 'users',
		'listing/:id': 'listing'
	},

	initialize: function() {
		
	},

	index: function() {
		this.homes = new HomeCollection();
		this.myLocation = new Promise(function(resolve, reject) { 
  			navigator.geolocation.getCurrentPosition(resolve, reject);
		}).then(function(position) {
			return position;
		});
		Promise.resolve(this.myLocation).then(function(value) {
			this.homes.fetch().then(function(data) {
				this.homesColl = new HomeCollection(data);
				this.LandingView = new LandingView({collection: this.homesColl, myLocation: value});
				$('#app').html(this.LandingView.el);
			})
		}.bind(this));
	},

	users: function() {

	},

	listing: function() {

	}

});

var router = new Router();
export default router;