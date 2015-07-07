import LandingView from './views/landing';
import {Home} from './models/homes';

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'users/:id': 'users',
		'listing/:id': 'listing'
	},

	initialize: function() {
		
	},

	index: function() {
		this.home = new Home();
		this.myLocation = new Promise(function(resolve, reject) { 
  			navigator.geolocation.getCurrentPosition(resolve, reject);
		}).then(function(position) {
			return position;
		});
		Promise.resolve(this.myLocation).then(function(value) {
			this.LandingView = new LandingView({model: this.home, myLocation: value});
			$('#app').html(this.LandingView.el);
		}.bind(this));
	},

	users: function() {

	},

	listing: function() {

	}

});

var router = new Router();
export default router;