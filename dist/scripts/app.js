require.register("ajax-config", function(exports, require, module){
  /*
  If the url is to Parse, add the Parse headers
  Else, If the url is to Simplyrets, add the Simplyrets headers
*/
'use strict';

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  if (options.url.match(/api.parse.com/)) {
    options.headers = options.headers || {};
    options.headers['X-Parse-Application-Id'] = 'VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw';
    options.headers['X-Parse-REST-API-Key'] = 'KGq62htoH5zj0Hv6WZsWG0IQoaA04ufqKD0f73JZ';
  } else if (options.url.match(/api.simplyrets.com/)) {
    options.headers = options.headers || {};
    options.headers['username'] = 'simplyrets';
    options.headers['password'] = 'simplyrets';
  } else if (options.url.match(/azure.geodataservice.net/)) {
    options.headers = options.headers || {};
    options.headers['username'] = '6f310754-d613-4d9d-a14b-52ab156ee7c0';
    options.headers['password'] = 'sw0IrV5wzv6ooZtTVj6g38+N2aI1JihNPRYUaGqqUEM';
  }
});
  
});

require.register("main", function(exports, require, module){
  'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

(function () {
  'use strict';

  $(document).ready(function () {

    Backbone.history.start();
  });
})();
  
});

require.register("router", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _viewsLanding = require('./views/landing');

var _viewsLanding2 = _interopRequireDefault(_viewsLanding);

var _viewsListing = require('./views/listing');

var _viewsListing2 = _interopRequireDefault(_viewsListing);

var _viewsUser = require('./views/user');

var _viewsUser2 = _interopRequireDefault(_viewsUser);

var _viewsLoading = require('./views/loading');

var _viewsLoading2 = _interopRequireDefault(_viewsLoading);

var _modelsHomes = require('./models/homes');

var _modelsLocation = require('./models/location');

var _modelsUsers = require('./models/users');

var _ajaxConfig = require('./ajax-config');

var _ajaxConfig2 = _interopRequireDefault(_ajaxConfig);

var Router = Backbone.Router.extend({

	routes: {
		'': 'index',
		'filtered': 'filtered',
		'users': 'users',
		'listing/:id': 'listing'
	},

	initialize: function initialize() {
		Parse.initialize('VdIzGCJLC4lY90r79Yvj6n9rn0pChj7OemI2Ibdw', 'KGq62htoH5zj0Hv6WZsWG0IQoaA04ufqKD0f73JZ');
		this.homes = new _modelsHomes.HomeCollection();
		this.homes.fetch();
	},

	index: function index() {
		$('#app').removeClass('listing');
		$('#app').removeClass('users');
		$('#app').addClass('landing');
		var loadingView = new _viewsLoading2['default']();
		$('#app').html(loadingView.el);
		this.myLocation = new Promise(function (resolve, reject) {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
		Promise.resolve(this.myLocation).then((function (value) {
			this.homes.fetch().then((function (data) {
				var searchLocation = new _modelsLocation.SearchLocation(value);
				if (Parse.User.current()) {
					var user = new _modelsUsers.User();
					this.landingView = new _viewsLanding2['default']({ collection: this.homes,
						search: searchLocation,
						user: user }, { isUser: true });
				} else {
					var users = new _modelsUsers.UserCollection();
					this.landingView = new _viewsLanding2['default']({ collection: this.homes,
						search: searchLocation,
						users: users }, { isUser: false });
				}
				$('.sk-circle').remove();
				$('#app').append(this.landingView.el);
				if (localStorage.getItem('visited') == 'true') {
					if (window.innerWidth < 980) {
						$('.site-nav-item:nth-child(2)').addClass('hide-me-mobile');
						$('.site-nav-item-branding').addClass('hide-description-mobile');
						$('.site-nav-item:nth-child(2)').children().addClass('hide-description-mobile');
					} else {
						$('.site-nav-item:nth-child(2)').addClass('hide-me-comp');
						$('.site-nav-item:nth-child(2)').children().addClass('hide-description-comp');
					}
				} else {
					localStorage.setItem('visited', true);
				}
			}).bind(this));
		}).bind(this));
	},

	users: function users() {
		var loadingView = new _viewsLoading2['default']();
		$('#app').html(loadingView.el);
		$('#app').removeClass('listing');
		$('#app').addClass('users');
		if (Parse.User.current()) {
			this.homes.fetch().then(function (data) {
				var homesColl = new _modelsHomes.HomeCollection(data);
				var user = Parse.User.current();
				var userView = new _viewsUser2['default']({ model: user, collection: homesColl });
				$('#app').html(userView.el);
				$('#app').removeClass('landing');
				$('#app').removeClass('users');
				$('#app').addClass('listing');
			});
		} else {
			router.navigate('', true);
		}
	},

	listing: function listing(id) {
		var loadingView = new _viewsLoading2['default']();
		$('#app').html(loadingView.el);
		var homes = new _modelsHomes.HomeCollection();
		homes.fetch().then((function (data) {
			var homesColl = new _modelsHomes.HomeCollection(data);
			var home = homesColl.filter(function (listing) {
				return listing.get('mlsId') == id;
			})[0];
			if (Parse.User.current()) {
				var user = Parse.User.current();
			}
			this.listingView = new _viewsListing2['default']({ model: home, collection: homesColl, user: user });
			$('#app').html(this.listingView.el);
			$('#app').removeClass('landing');
			$('#app').removeClass('users');
			$('#app').addClass('listing');
		}).bind(this));
	}

});

var router = new Router();
exports['default'] = router;
module.exports = exports['default'];
  
});

require.register("models/censusCollection", function(exports, require, module){
  "use strict";
  
});

require.register("models/demographicsCollection", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var DemographicsCollection = Backbone.Collection.extend({

	url: function url() {
		return 'http://afternoon-ocean-5057.herokuapp.com/demo/' + this.zipcode;
	},

	initialize: function initialize(options) {
		this.zipcode = options.zipcode;
	}

});

exports['default'] = { DemographicsCollection: DemographicsCollection };
module.exports = exports['default'];
  
});

require.register("models/homes", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var HomeCollection = Backbone.Collection.extend({

	url: 'https://jsonp.afeld.me/?callback=?&url=https://simplyrets:simplyrets@api.simplyrets.com/properties',

	filteredCollection: function filteredCollection(collection) {
		return collection.filter((function (home) {
			return home.attributes.listPrice >= this.minPrice && home.attributes.listPrice <= this.maxPrice && home.attributes.property.bedrooms >= this.bedrooms && home.attributes.property.bathsFull >= this.baths && home.attributes.property.area >= this.minSq && home.attributes.property.area <= this.maxSq;
		}).bind(this));
	},

	toJSON: function toJSON() {
		return _.extend({}, this.attributes, this.isUser);
	}

});

exports['default'] = { HomeCollection: HomeCollection };
module.exports = exports['default'];
  
});

require.register("models/location", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var SearchLocation = Backbone.Model.extend({

	defaults: {
		address: '77002'
	},

	urlRoot: 'https://maps.googleapis.com/maps/api/geocode/json',
	url: function url() {
		return this.urlRoot + '?address=' + this.get('address') + '&components=locality&components=postal_code&key=AIzaSyAa8ybQRvx0M-3HYRgivQXBauKFFLVr6HI';
		// console.log(this.urlRoot + params.params.locale);
		// return this.urlRoot + params.params.locale;
	}

});

exports['default'] = { SearchLocation: SearchLocation };
module.exports = exports['default'];
  
});

require.register("models/schools", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var SchoolCollection = Backbone.Collection.extend({

	url: function url() {
		return 'http://afternoon-ocean-5057.herokuapp.com/great/' + this.zipcode;
	},

	initialize: function initialize(options) {
		this.zipcode = options.zipcode;
	}

});

exports['default'] = { SchoolCollection: SchoolCollection };
module.exports = exports['default'];
  
});

require.register("models/users", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
var User = Backbone.Model.extend({

	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/user',
	defaults: {
		name: '',
		username: '',
		password: '',
		homes: [],
		filters: { minPrice: 0, maxPrice: 1000000000, bedrooms: 0, baths: 0, minSq: 0, maxSq: 1000000 }
	}

});

var UserCollection = Backbone.Collection.extend({

	model: User,
	url: 'https://api.parse.com/1/user'

});

exports['default'] = { User: User, UserCollection: UserCollection };
module.exports = exports['default'];
  
});

require.register("views/census", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	tagName: 'div'

});
module.exports = exports['default'];
  
});

require.register("views/data", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	initialize: function initialize(options) {
		this.demographics = this.collection.models[0].attributes;
		this.loadAge();
		this.loadIncome();
		this.loadCrime();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	loadAge: function loadAge() {
		var underFive = Number(this.demographics.PopulationUnder5);
		var fiveToNine = Number(this.demographics.Population5to9);
		var tenToFourteen = Number(this.demographics.Population10to14);
		var fifteenToNineteen = Number(this.demographics.Population15to19);
		var twentyToTwentyFour = Number(this.demographics.Population20to24);
		var twentyFiveToTwentyNine = Number(this.demographics.Population25to29);
		var thirtyToThirtyFour = Number(this.demographics.Population30to34);
		var thirtyFiveToThirtyNine = Number(this.demographics.Population35to39);
		var fortyToFortyFour = Number(this.demographics.Population40to44);
		var fortyFiveToFortyNine = Number(this.demographics.Population45to49);
		var fiftyToFiftyFour = Number(this.demographics.Population50to54);
		var fiftyFiveToFiftyNine = Number(this.demographics.Population55to59);
		var sixtyToSixtyFour = Number(this.demographics.Population60to64);
		var sixtyFiveToSixtyNine = Number(this.demographics.Population65to69);
		var seventyToSeventyFour = Number(this.demographics.Population70to74);
		var seventyFiveToSeventyNine = Number(this.demographics.Population75to79);
		var eightyToEightyFour = Number(this.demographics.Population80to84);
		var eightyFivePlus = Number(this.demographics.Population85Plus);
		$('#age').highcharts({
			chart: {
				type: 'pie',
				options3d: {
					enabled: true,
					alpha: 45
				}
			},
			title: {
				text: 'Population by Age: '
			},
			subtitle: {
				text: '(total population: ' + this.demographics.Population + ')'
			},
			plotOptions: {
				pie: {
					innerSize: 100,
					depth: 45
				}
			},
			series: [{
				name: 'Age Groups',
				data: [['Under 5', underFive], ['5 to 9', fiveToNine], ['10 to 14', tenToFourteen], ['15 to 19', fifteenToNineteen], ['20 to 24', twentyToTwentyFour], ['25 to 29', twentyFiveToTwentyNine], ['30 to 34', thirtyToThirtyFour], ['35 to 39', thirtyFiveToThirtyNine], ['40 to 44', fortyToFortyFour], ['45 to 49', fortyFiveToFortyNine], ['50 to 54', fiftyToFiftyFour], ['55 to 59', fiftyFiveToFiftyNine], ['60 to 64', sixtyToSixtyFour], ['65 to 69', sixtyFiveToSixtyNine], ['70 to 74', seventyToSeventyFour], ['75 to 79', seventyFiveToSeventyNine], ['80 to 84', eightyToEightyFour], ['85+', eightyFivePlus]]
			}]
		});
	},

	loadIncome: function loadIncome() {
		var lessThan25 = Number(this.demographics.IncomeLessThan25) * 100;
		var between25to50 = Number(this.demographics.IncomeBetween25to50) * 100;
		var between50to100 = Number(this.demographics.IncomeBetween50to100) * 100;
		var between100to200 = Number(this.demographics.IncomeBetween100to200) * 100;
		var greaterThan200 = Number(this.demographics.IncomeGreater200) * 100;
		$('#income').highcharts({
			chart: {
				type: 'bar'
			},
			title: {
				text: 'Income by Population:'
			},
			xAxis: {
				categories: ['Less than 25k', '25-50k', '50k-100k', '100k-200k', 'More than 200k'],
				title: {
					text: null
				}
			},
			yAxis: {
				min: 0,
				tickInterval: 10,
				title: {
					text: 'Population (%)',
					align: 'high'
				},
				labels: {
					overflow: 'justify'
				}
			},
			plotOptions: {
				bar: {
					dataLabels: {
						enabled: true
					}
				}
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'top',
				x: -40,
				y: 80,
				floating: true,
				borderWidth: 1,
				backgroundColor: Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF',
				shadow: true
			},
			credits: {
				enabled: false
			},
			series: [{
				name: 'Income ($US)',
				data: [Number(lessThan25.toFixed(2)), Number(between25to50.toFixed(2)), Number(between50to100.toFixed(2)), Number(between100to200.toFixed(2)), Number(greaterThan200.toFixed(2))]

			}]
		});
	},

	loadCrime: function loadCrime() {
		var violentCrime = Number(this.demographics.ViolentCrime);
		var murderAndManslaughter = Number(this.demographics.MurderAndManslaughter);
		var forcibleRape = Number(this.demographics.ForcibleRape);
		var robbery = Number(this.demographics.Robbery);
		var aggravatedAssault = Number(this.demographics.AggravatedAssault);
		var propertyCrime = Number(this.demographics.PropertyCrime);
		var burglary = Number(this.demographics.Burglary);
		var larcenyTheft = Number(this.demographics.LarcenyTheft);
		var motorVehicleTheft = Number(this.demographics.MotorVehicleTheft);
		var arson = Number(this.demographics.Arson);
		$('#crime').highcharts({
			title: {
				text: 'Reported Crimes',
				x: -20 //center
			},
			xAxis: {
				categories: ['Violent Crime', 'Murder and Manslaughter', 'Rape', 'Robbery', 'Aggravated Assault', 'Property Crime', 'Burglary', 'Larceny/Theft', 'Motor Vehicle Theft', 'Arson']
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Committed Crimes'
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}]
			},
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle',
				borderWidth: 0
			},
			series: [{
				name: 'Crime Rates',
				data: [violentCrime, murderAndManslaughter, forcibleRape, robbery, aggravatedAssault, propertyCrime, burglary, larcenyTheft, motorVehicleTheft, arson]
			}]
		});
	}

});
module.exports = exports['default'];
  
});

require.register("views/elementary", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['elementary'],

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});
module.exports = exports['default'];
  
});

require.register("views/elementaryTwo", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['elementaryTwo'],

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});
module.exports = exports['default'];
  
});

require.register("views/high", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['high'],

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});
module.exports = exports['default'];
  
});

require.register("views/highTwo", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['highTwo'],

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});
module.exports = exports['default'];
  
});

require.register("views/landing", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _modelsLocation = require('../models/location');

var _modelsHomes = require('../models/homes');

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

exports['default'] = Backbone.View.extend({

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

	initialize: function initialize(options) {

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

		console.log('Thanks for checking out my project! Here\'s a list of the technologies used for this project: ', {
			JavaScript: ['JavaScript', 'jQuery', 'Underscore', 'Backbone', 'Handlebars', 'Node', 'Express', 'ES6', 'Babel', 'Require', 'Parse', 'Modernizr', 'Gulp', 'GMaps', 'HighCharts'],
			HTML: 'HTML5',
			CSS: ['SCSS', 'Bourbon', 'Neat'],
			RestfulAPIs: ['Parse.com', 'Education.com', 'GeoDataService.net', 'SimplyRETS.com', 'GreatSchools.org'],
			otherResources: ['GeoLocation Services', 'Google Maps', 'Google GeoCoding API']
		});
	},

	render: function render() {

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

	rerender: function rerender() {

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

	renderChildren: function renderChildren() {

		// First, remove all markers from map to avoid duplication.

		this.areaMap.removeMarkers();
		var self = this;

		// If user is not logged in, render all of the returned housing results as pins, else
		// apply any user saved filters before rendering the returned housing results as pins.

		if (!Parse.User.current()) {
			this.children = this.collection.map((function (child) {
				if (child.attributes.geo.lat && child.attributes.geo.lng) {
					var lat = child.attributes.geo.lat;
					var lng = child.attributes.geo.lng;
					this.areaMap.addMarker({
						lat: lat,
						lng: lng,
						model: child,
						click: function click(e) {
							self.renderPopUp(this.model);
						}
					});
				}
			}).bind(this));
		} else {
			var userFilters = Parse.User.current().get('filters');
			this.collection.minPrice = userFilters.minPrice;
			this.collection.maxPrice = userFilters.maxPrice;
			this.collection.bedrooms = userFilters.bedrooms;
			this.collection.baths = userFilters.baths;
			this.collection.minSq = userFilters.minSq;
			this.collection.maxSq = userFilters.maxSq;
			this.filteredCollection = new _modelsHomes.HomeCollection(this.collection.filteredCollection(this.collection));
			this.collection = this.filteredCollection.clone();
			this.children = this.collection.map((function (child) {
				if (child.attributes.geo.lat && child.attributes.geo.lng) {
					var lat = child.attributes.geo.lat;
					var lng = child.attributes.geo.lng;
					this.areaMap.addMarker({
						lat: lat,
						lng: lng,
						model: child,
						click: function click(e) {
							self.renderPopUp(this.model);
						}
					});
				}
			}).bind(this));
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

	submitSearch: function submitSearch(e) {

		// Take the user's input value from the address search and use it to re-center the
		// Google Map.

		e.preventDefault();
		var searchArea = $('.site-nav-item-search-area').val();
		$('.site-nav-item-search-area').val('');
		this.search.set('address', searchArea);
		this.search.fetch().then((function (data) {
			this.search.set('lat', data.results[0].geometry.location.lat);
			this.search.set('lng', data.results[0].geometry.location.lng);
			// console.log(this.search);
			this.rerender();
		}).bind(this));
	},

	submitFilter: function submitFilter(e) {

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
		this.filteredCollection = new _modelsHomes.HomeCollection(this.collection.filteredCollection(this.collection));
		this.collection = this.filteredCollection.clone();
		this.renderChildren();
	},

	updateFilters: function updateFilters() {

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
		};
		// console.log(updatedFilters);
		Parse.User.current().set('filters', updatedFilters);
		Parse.User.current().save();
	},

	renderPopUp: function renderPopUp(model) {

		// When a user clicks on a pin, a modal will pop up with limited information for the listing.
		// The user can choose to view more or close the modal.

		this.PopUp = new _popup2['default']({ model: model });
		this.$el.append(this.PopUp.el);
	},

	logIn: function logIn(e) {

		// Functionality for taking user inputs and attempting to log in via Parse. If successful,
		// the user is redirected to his/her profile. If unsuccessful, an error message is alerted.
		e.preventDefault();
		var username = this.$('.login-email').val();
		var password = this.$('.login-password').val();
		console.log('username: ', username, 'password: ', password);
		Parse.User.logIn(username, password, {
			success: function success(user) {
				_router2['default'].navigate('#users', true);
			},
			error: function error(user, _error) {
				alert('Error: Invalid username or password.');
				console.log(user, _error);
			}
		});
	},

	createUser: function createUser(e) {

		// Functionality for taking user inputs and creating a new user on Parse. If successful, the
		// the user is redirected to a profile page. If unsuccessful, an error message is alerted.
		e.preventDefault();
		var name = this.$('.register-name').val();
		var username = this.$('.register-email').val();
		var password = this.$('.register-password').val();
		var user = new Parse.User();
		user.set('name', name);
		user.set('username', username);
		user.set('password', password);
		user.set('homes', []);
		user.set('filters', { minPrice: 0, maxPrice: 1000000000, bedrooms: 0, baths: 0, minSq: 0, maxSq: 1000000 });
		user.signUp(null, {
			success: function success(user) {
				// console.log(user);
				Parse.User.become(user.sessionToken).then(function (user) {
					_router2['default'].navigate('#users', true);
				});
			},
			error: function error(user, _error2) {
				alert('Error: registration unsuccessful due to: ' + _error2.message);
				// console.log(error.message);
			}
		});
	},

	stayPut: function stayPut() {

		// If the current user is logged in, the registration tab will not expand, hiding the
		// registration form.

		if (Parse.User.current()) {
			if (window.innerWidth < 980) {
				$('.site-nav-item:last-child').css({ 'width': '5%' });
				$('.register').hide();
			} else {
				$('.site-nav-item:last-child').css({ 'width': '2.5%' });
				$('.register').hide();
			}
		}
	},

	closeBanner: function closeBanner(e) {

		// Functionality for closing the branding banner.

		$(e.target).hide();
		$(e.target).parent().find('div').fadeOut(100);
		if (window.innerWidth < 980) {
			$(e.target).parent().css({ 'width': '5%' });
		} else {
			$(e.target).parent().css({ 'width': '2.5%' });
		}
	},

	noOpen: function noOpen() {

		// Once closed, this prevents the branding banner from reopening.

		if (window.innerWidth < 980) {
			if ($('.site-nav-item:nth-child(2)').width() < 100) {
				$('.site-nav-item:nth-child(2)').css({ 'width': '2.5%' });
			}
		} else {
			if ($('.site-nav-item:nth-child(2)').width() < 100) {
				$('.site-nav-item:nth-child(2)').css({ 'width': '2.5%' });
			}
		}
	},

	loginFunc: function loginFunc() {

		// This determines whether the user is logged in before showing (on hover/mouseenter) the appropriate
		// content - either login form or a link to the user's profile.

		if (Parse.User.current()) {
			$('.profile-link').css({ 'opacity': '1' });
		} else {
			$('.login').css({ 'opacity': '1' });
		}
	},

	loginFunc2: function loginFunc2() {

		// This determines whether the user is logged in before hiding (on mouseleave) the appropriate
		// content - either login form or a link to the user's profile.

		if (Parse.User.current()) {
			$('.profile-link').css({ 'opacity': '0' });
		} else {
			$('.login').css({ 'opacity': '0' });
		}
	}

});
module.exports = exports['default'];
  
});

require.register("views/listing-schools", function(exports, require, module){
  // import ElementaryView from './elementary';
// import MiddleView from './middle';
// import HighView from './high';

'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _elementaryTwo = require('./elementaryTwo');

var _elementaryTwo2 = _interopRequireDefault(_elementaryTwo);

var _middleTwo = require('./middleTwo');

var _middleTwo2 = _interopRequireDefault(_middleTwo);

var _highTwo = require('./highTwo');

var _highTwo2 = _interopRequireDefault(_highTwo);

exports['default'] = Backbone.View.extend({

	initialize: function initialize() {
		// this.loadElementaryRating();
		// this.loadElementaryScores();
		// this.loadElementaryTeachers();
		// this.loadMiddleRating();
		// this.loadMiddleScores();
		// this.loadMiddleTeachers();
		// this.loadHighRating();
		// this.loadHighScores();
		// this.loadHighTeachers();
		this.loadElementaryProfile();
		this.loadMiddleProfile();
		this.loadHighProfile();
		this.loadElementaryTests();
		this.loadMiddleTests();
		this.loadHighTests();
		// this.loadElementaryReviews();
		// this.loadMiddleReviews();
		// this.loadHighReviews();
	},

	// loadElementaryRating: function() {
	// 	var elementaryView = new ElementaryView({collection: this.collection});
	// 	$('.elementary-data').prepend(elementaryView.el);
	// },

	loadElementaryProfile: function loadElementaryProfile() {
		var elementaryView = new _elementaryTwo2['default']({ collection: this.collection });
		$('.elementary-data').prepend(elementaryView.el);
		if (this.collection.models[0].attributes.elementary.gsRating >= 9) {
			$('.elementary-data-basic-ratings .gs').addClass('excellent');
		} else if (this.collection.models[0].attributes.elementary.gsRating >= 7) {
			$('.elementary-data-basic-ratings .gs').addClass('good');
		} else if (this.collection.models[0].attributes.elementary.gsRating >= 5) {
			$('.elementary-data-basic-ratings .gs').addClass('average');
		} else if (this.collection.models[0].attributes.elementary.gsRating >= 3) {
			$('.elementary-data-basic-ratings .gs').addClass('poor');
		} else {
			$('.elementary-data-basic-ratings .gs').addClass('awful');
		}
		if (this.collection.models[0].attributes.elementary.parentRating >= 9) {
			$('.elementary-data-basic-ratings .parent').addClass('excellent');
		} else if (this.collection.models[0].attributes.elementary.parentRating >= 7) {
			$('.elementary-data-basic-ratings .parent').addClass('good');
		} else if (this.collection.models[0].attributes.elementary.parentRating >= 5) {
			$('.elementary-data-basic-ratings .parent').addClass('average');
		} else if (this.collection.models[0].attributes.elementary.parentRating >= 3) {
			$('.elementary-data-basic-ratings .parent').addClass('poor');
		} else {
			$('.elementary-data-basic-ratings .parent').addClass('awful');
		}
	},

	// loadElementaryScores: function() {
	// 	var elementaryScores = this.collection.models[0].attributes.elementaryScores;
	// 	var categories = _.map(elementaryScores.school, function(item) {
	// 		return item.grade + ': ' + item.subject;
	// 	})
	// 	var results = _.map(elementaryScores.school, function(item) {
	// 		return item.score.percentage;
	// 	});
	// 	$('#elementary-data-tests').highcharts({
	// 		colors: ['#0d233a'],
	//         chart: {
	//             type: 'column'
	//         },
	//         title: {
	//             text: elementaryScores.school[0].testname
	//         },
	//         subtitle: {
	//             text: 'Source: Education.com'
	//         },
	//         xAxis: {
	//             categories: categories,
	//             crosshair: true
	//         },
	//         yAxis: {
	//             min: 0,
	//             max: 100,
	//             title: {
	//                 text: 'Passing Rate (%)'
	//             }
	//         },
	//         tooltip: {
	//             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	//             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	//                 '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	//             footerFormat: '</table>',
	//             shared: true,
	//             useHTML: true
	//         },
	//         plotOptions: {
	//             column: {
	//                 pointPadding: 0.2,
	//                 borderWidth: 0
	//             }
	//         },
	//         series: [{
	//             name: 'Percentage',
	//             data: results

	//         }]
	//     });
	// },

	loadElementaryTests: function loadElementaryTests() {
		var elementaryTests = this.collection.models[0].attributes.elementaryTests.test[1];
		// var categories = _.map(elementaryTests.test, function(item) {
		// 	return 'Grade: ' item.gradeName + ': ' + item.subjectName;
		// });
		var categories = _.map(elementaryTests.testResult, function (item) {
			return 'Grade ' + item.gradeName + ': ' + item.subjectName;
		});
		var results = _.map(elementaryTests.testResult, function (item) {
			return Number(item.score);
		});
		$('#elementary-data-tests').highcharts({
			colors: ['#0d233a'],
			chart: {
				type: 'column'
			},
			title: {
				text: elementaryTests.abbreviation
			},
			subtitle: {
				text: 'Source: GreatSchools'
			},
			xAxis: {
				categories: categories,
				crosshair: true
			},
			yAxis: {
				min: 0,
				max: 100,
				title: {
					text: 'Passing Rate (%)'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'Percentage',
				data: results

			}]
		});
	},

	loadElementaryTeachers: function loadElementaryTeachers() {
		var elementaryTeachers = this.collection.models[0].attributes.elementaryTeachers;
		var categories = _.map(elementaryTeachers.school, function (item) {
			return item.stat_name + ': ' + item.stat_type;
		});
		var results = _.map(elementaryTeachers.school, function (item) {
			if (item.percentage != null) {
				return item.percentage;
			} else {
				return item.total;
			}
		});
		$('#elementary-data-teachers').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Teacher Statistics'
			},
			subtitle: {
				text: 'Source: Education.com'
			},
			xAxis: {
				categories: categories,
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Number/Percentage'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'Stats',
				data: results

			}]
		});
	},

	// loadMiddleRating: function() {
	// 	var middleView = new MiddleView({collection: this.collection});
	// 	$('.middle-data').prepend(middleView.el);
	// },

	loadMiddleProfile: function loadMiddleProfile() {
		var middleView = new _middleTwo2['default']({ collection: this.collection });
		$('.middle-data').prepend(middleView.el);
		if (this.collection.models[0].attributes.middle.gsRating >= 9) {
			$('.middle-data-basic-ratings .gs').addClass('excellent');
		} else if (this.collection.models[0].attributes.middle.gsRating >= 7) {
			$('.middle-data-basic-ratings .gs').addClass('good');
		} else if (this.collection.models[0].attributes.middle.gsRating >= 5) {
			$('.middle-data-basic-ratings .gs').addClass('average');
		} else if (this.collection.models[0].attributes.middle.gsRating >= 3) {
			$('.middle-data-basic-ratings .gs').addClass('poor');
		} else {
			$('.middle-data-basic-ratings .gs').addClass('awful');
		}
		if (this.collection.models[0].attributes.middle.parentRating >= 9) {
			$('.middle-data-basic-ratings .parent').addClass('excellent');
		} else if (this.collection.models[0].attributes.middle.parentRating >= 7) {
			$('.middle-data-basic-ratings .parent').addClass('good');
		} else if (this.collection.models[0].attributes.middle.parentRating >= 5) {
			$('.middle-data-basic-ratings .parent').addClass('average');
		} else if (this.collection.models[0].attributes.middle.parentRating >= 3) {
			$('.middle-data-basic-ratings .parent').addClass('poor');
		} else {
			$('.middle-data-basic-ratings .parent').addClass('awful');
		}
	},

	// loadMiddleScores: function() {
	// 	var middleScores = this.collection.models[0].attributes.middleScores;
	// 	var categories = _.map(middleScores.school, function(item) {
	// 		return item.grade + ': ' + item.subject;
	// 	})
	// 	var results = _.map(middleScores.school, function(item) {
	// 		return item.score.percentage;
	// 	});
	// 	$('#middle-data-tests').highcharts({
	// 		colors: ['#0d233a'],
	//         chart: {
	//             type: 'column'
	//         },
	//         title: {
	//             text: middleScores.school[0].testname
	//         },
	//         subtitle: {
	//             text: 'Source: Education.com'
	//         },
	//         xAxis: {
	//             categories: categories,
	//             crosshair: true
	//         },
	//         yAxis: {
	//             min: 0,
	//             max: 100,
	//             title: {
	//                 text: 'Passing Rate (%)'
	//             }
	//         },
	//         tooltip: {
	//             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	//             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	//                 '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	//             footerFormat: '</table>',
	//             shared: true,
	//             useHTML: true
	//         },
	//         plotOptions: {
	//             column: {
	//                 pointPadding: 0.2,
	//                 borderWidth: 0
	//             }
	//         },
	//         series: [{
	//             name: 'Percentage',
	//             data: results

	//         }]
	//     });
	// },

	loadMiddleTests: function loadMiddleTests() {
		var middleTests = this.collection.models[0].attributes.middleTests.test[1];
		var categories = _.map(middleTests.testResult, function (item) {
			return 'Grade ' + item.gradeName + ': ' + item.subjectName;
		});
		var results = _.map(middleTests.testResult, function (item) {
			return Number(item.score);
		});
		$('#middle-data-tests').highcharts({
			colors: ['#77a1e5'],
			chart: {
				type: 'column'
			},
			title: {
				text: middleTests.abbreviation
			},
			subtitle: {
				text: 'Source: GreatSchools'
			},
			xAxis: {
				categories: categories,
				crosshair: true
			},
			yAxis: {
				min: 0,
				max: 100,
				title: {
					text: 'Passing Rate (%)'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'Percentage',
				data: results

			}]
		});
	},

	loadMiddleTeachers: function loadMiddleTeachers() {
		var middleTeachers = this.collection.models[0].attributes.middleTeachers;
		var categories = _.map(middleTeachers.school, function (item) {
			return item.stat_name + ': ' + item.stat_type;
		});
		var results = _.map(middleTeachers.school, function (item) {
			if (item.percentage != null) {
				return item.percentage;
			} else {
				return item.total;
			}
		});
		$('#middle-data-teachers').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Teacher Statistics'
			},
			subtitle: {
				text: 'Source: Education.com'
			},
			xAxis: {
				categories: categories,
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Number/Percentage'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'Stats',
				data: results

			}]
		});
	},

	// loadHighRating: function() {
	// 	var highView = new HighView({collection: this.collection});
	// 	$('.high-data').prepend(highView.el);
	// },

	loadHighProfile: function loadHighProfile() {
		var highView = new _highTwo2['default']({ collection: this.collection });
		$('.high-data').prepend(highView.el);
		if (this.collection.models[0].attributes.high.gsRating >= 9) {
			$('.high-data-basic-ratings .gs').addClass('excellent');
		} else if (this.collection.models[0].attributes.high.gsRating >= 7) {
			$('.high-data-basic-ratings .gs').addClass('good');
		} else if (this.collection.models[0].attributes.high.gsRating >= 5) {
			$('.high-data-basic-ratings .gs').addClass('average');
		} else if (this.collection.models[0].attributes.high.gsRating >= 3) {
			$('.high-data-basic-ratings .gs').addClass('poor');
		} else {
			$('.high-data-basic-ratings .gs').addClass('awful');
		}
		if (this.collection.models[0].attributes.high.parentRating >= 9) {
			$('.high-data-basic-ratings .parent').addClass('excellent');
		} else if (this.collection.models[0].attributes.high.parentRating >= 7) {
			$('.high-data-basic-ratings .parent').addClass('good');
		} else if (this.collection.models[0].attributes.high.parentRating >= 5) {
			$('.high-data-basic-ratings .parent').addClass('average');
		} else if (this.collection.models[0].attributes.high.parentRating >= 3) {
			$('.high-data-basic-ratings .parent').addClass('poor');
		} else {
			$('.high-data-basic-ratings .parent').addClass('awful');
		}
	},

	// loadHighScores: function() {
	// 	var highScores = this.collection.models[0].attributes.highScores;
	// 	var categories = _.map(highScores.school, function(item) {
	// 		return item.grade + ': ' + item.subject;
	// 	})
	// 	var results = _.map(highScores.school, function(item) {
	// 		return item.score.percentage;
	// 	});
	// 	$('#high-data-tests').highcharts({
	// 		colors: ['#0d233a'],
	//         chart: {
	//             type: 'column'
	//         },
	//         title: {
	//             text: highScores.school[0].testname
	//         },
	//         subtitle: {
	//             text: 'Source: Education.com'
	//         },
	//         xAxis: {
	//             categories: categories,
	//             crosshair: true
	//         },
	//         yAxis: {
	//             min: 0,
	//             max: 100,
	//             title: {
	//                 text: 'Passing Rate (%)'
	//             }
	//         },
	//         tooltip: {
	//             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	//             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	//                 '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	//             footerFormat: '</table>',
	//             shared: true,
	//             useHTML: true
	//         },
	//         plotOptions: {
	//             column: {
	//                 pointPadding: 0.2,
	//                 borderWidth: 0
	//             }
	//         },
	//         series: [{
	//             name: 'Percentage',
	//             data: results

	//         }]
	//     });
	// },

	loadHighTests: function loadHighTests() {
		var highTests = this.collection.models[0].attributes.highTests.test[1];
		var categories = _.map(highTests.testResult, function (item) {
			// console.log(item);
			return 'Grade ' + item.gradeName + ': ' + item.subjectName;
		});
		var results = _.map(highTests.testResult, function (item) {
			return Number(item.score);
		});
		$('#high-data-tests').highcharts({
			colors: ['#910000'],
			chart: {
				type: 'column'
			},
			title: {
				text: highTests.abbreviation
			},
			subtitle: {
				text: 'Source: GreatSchools'
			},
			xAxis: {
				categories: categories,
				crosshair: true
			},
			yAxis: {
				min: 0,
				max: 100,
				title: {
					text: 'Passing Rate (%)'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'Percentage',
				data: results

			}]
		});
	},

	loadHighTeachers: function loadHighTeachers() {
		var highTeachers = this.collection.models[0].attributes.highTeachers;
		var categories = _.map(highTeachers.school, function (item) {
			return item.stat_name + ': ' + item.stat_type;
		});
		var results = _.map(highTeachers.school, function (item) {
			if (item.percentage != null) {
				return item.percentage;
			} else {
				return item.total;
			}
		});
		$('#high-data-teachers').highcharts({
			chart: {
				type: 'column'
			},
			title: {
				text: 'Teacher Statistics'
			},
			subtitle: {
				text: 'Source: Education.com'
			},
			xAxis: {
				categories: categories,
				crosshair: true
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Number/Percentage'
				}
			},
			tooltip: {
				headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
				pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' + '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
				footerFormat: '</table>',
				shared: true,
				useHTML: true
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
			series: [{
				name: 'Stats',
				data: results

			}]
		});
	}

});
module.exports = exports['default'];
  
});

require.register("views/listing", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _listingSchools = require('./listing-schools');

var _listingSchools2 = _interopRequireDefault(_listingSchools);

var _modelsDemographicsCollection = require('../models/demographicsCollection');

var _modelsSchools = require('../models/schools');

exports['default'] = Backbone.View.extend({

	template: JST['listing'],
	tagName: 'div',
	className: 'listing-container',

	events: {
		'click .data-item': 'showData',
		'click .listing-info-images-thumbnails-item': 'changeImage',
		'click .home': 'home',
		'click .save': 'saveHome',
		'click .user': 'toProfile',
		'click .fa-chevron-left': 'backOne',
		'click .fa-chevron-right': 'forwardOne'
	},

	initialize: function initialize(options) {
		$('.popup').remove();
		if (!Parse.User.current()) {
			this.model.set('isUser', false);
		} else {
			this.model.set('isUser', true);
		}
		if (this.model.attributes.property.exteriorFeatures) {
			this.model.set('exteriorFeatures', this.model.attributes.property.exteriorFeatures.split(','));
		}
		if (this.model.attributes.property.interiorFeatures) {
			this.model.set('interiorFeatures', this.model.attributes.property.interiorFeatures.split(','));
		}
		var currentPhoto = this.model.get('currentPhoto');
		this.model.set('currentPhoto', currentPhoto || this.model.attributes.photos[0]);
		this.listPrice();
		this.render();
	},

	render: function render() {
		if (Parse.User.current()) {
			var homes = Parse.User.current().get('homes');
			homes = homes.filter((function (home) {
				return home.mlsId == this.model.get('mlsId');
			}).bind(this));
			if (homes.length > 0) {
				this.model.set('isSaved', true);
			}
		}
		this.$el.html(this.template(this.model.toJSON()));
		this.renderData();
	},

	renderData: function renderData() {
		var zipcode = this.model.attributes.address.postalCode;
		var demographics = new _modelsDemographicsCollection.DemographicsCollection({ zipcode: zipcode });
		demographics.fetch().then((function (data) {
			var demographicsColl = new _modelsDemographicsCollection.DemographicsCollection(data);
			var dataView = new _data2['default']({ collection: demographicsColl, model: this.model });
			$('.listing-data-containers').prepend(dataView.el);
		}).bind(this));
		var schools = new _modelsSchools.SchoolCollection({ zipcode: zipcode });
		schools.fetch().then((function (data) {
			var schoolsView = new _listingSchools2['default']({ collection: schools });
			$('.listing-data-containers').append(schoolsView.el);
		}).bind(this));
	},

	listPrice: function listPrice() {
		var price = this.model.get('listPrice');
		if (price < 100000) {
			price = price.toString().split('');
			price.splice(2, 0, ',');
			return this.model.set('listPrice', price.join(''));
		} else if (price < 1000000) {
			price = price.toString().split('');
			price.splice(3, 0, ',');
			return this.model.set('listPrice', price.join(''));
		} else if (price >= 1000000) {
			price = price.toString().split('');
			price.splice(4, 0, ',');
			price.splice(1, 0, ',');
			return this.model.set('listPrice', price.join(''));
		}
	},

	showData: function showData(event) {
		$('.data-view').slideUp();
		$('.fa-chevron-down').show();
		$('.fa-chevron-up').hide();
		$(event.target).parent().next().slideToggle();
		$(event.target).children('.fa-chevron-down').toggle();
		$(event.target).children('.fa-chevron-up').toggle();
	},

	changeImage: function changeImage(e) {
		var img = $(e.target).attr('src');
		$('.listing-info-images-image').attr('src', img);
	},

	saveHome: function saveHome() {
		if (this.model.get('isSaved')) {
			var savedHomes = Parse.User.current().get('homes');
			savedHomes = savedHomes.filter((function (home) {
				return home.mlsId != this.model.get('mlsId');
			}).bind(this));
			Parse.User.current().set('homes', savedHomes);
			Parse.User.current().save();
			this.model.set('isSaved', false);
			this.render();
			// console.log(Parse.User.current());
		} else {
			var mlsId = this.model.get('mlsId');
			var address = this.model.get('address');
			address = address.full + ', ' + address.city + ', ' + 'TX';
			var price = this.model.get('listPrice');
			var image = this.model.get('photos');
			image = image[0];
			var newHome = {
				mlsId: mlsId,
				address: address,
				price: price,
				image: image
			};
			var savedHomes = Parse.User.current().get('homes');
			Parse.User.current().set('homes', savedHomes.concat([newHome]));
			Parse.User.current().save();
			this.render();
			// console.log(Parse.User.current());
		}
	},

	toProfile: function toProfile() {
		_router2['default'].navigate('#users', true);
	},

	backOne: function backOne() {
		if (this.model.get('currentPhoto') == this.model.attributes.photos[0]) {
			this.model.set('currentPhoto', this.model.attributes.photos[this.model.attributes.photos.length - 1]);
			this.render();
		} else {
			var picIndex = this.model.get('photos').indexOf(this.model.get('currentPhoto'));
			picIndex -= 1;
			this.model.set('currentPhoto', this.model.attributes.photos[picIndex]);
			this.render();
		}
	},

	forwardOne: function forwardOne() {
		if (this.model.get('currentPhoto') == this.model.attributes.photos[this.model.attributes.photos.length - 1]) {
			this.model.set('currentPhoto', this.model.attributes.photos[0]);
			this.render();
		} else {
			var picIndex = this.model.get('photos').indexOf(this.model.get('currentPhoto'));
			picIndex += 1;
			this.model.set('currentPhoto', this.model.attributes.photos[picIndex]);
			this.render();
		}
	}

});
module.exports = exports['default'];
  
});

require.register("views/loading", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['loading'],
	tagName: 'div',
	className: 'loading-container',

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template);
	}

});
module.exports = exports['default'];
  
});

require.register("views/middle", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['middle'],

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});
module.exports = exports['default'];
  
});

require.register("views/middleTwo", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['middleTwo'],

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});
module.exports = exports['default'];
  
});

require.register("views/popup", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});
exports['default'] = Backbone.View.extend({

	template: JST['popup'],
	className: 'screen',

	events: {
		'click .popup .fa-close': 'closePopUp',
		'click a': 'closePopUp'
	},

	initialize: function initialize() {
		this.render();
	},

	render: function render() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	closePopUp: function closePopUp() {
		this.$el.remove();
	}

});
module.exports = exports['default'];
  
});

require.register("views/user", function(exports, require, module){
  'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

exports['default'] = Backbone.View.extend({

	template: JST['user'],
	tagName: 'div',
	className: 'user-container',

	events: {
		'click .user-header-logout': 'logOut',
		'click .user-saved-filters-update': 'updateFilters'
	},

	initialize: function initialize() {
		this.render();
		this.listenTo(this.model, 'update add remove', this.render);
		// console.log(this.model.get('homes'));
	},

	render: function render() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	logOut: function logOut() {
		Parse.User.logOut();
		_router2['default'].navigate('', true);
	},

	updateFilters: function updateFilters() {
		var minPrice = $('.user-saved-filters-price-min').val() || 0;
		var maxPrice = $('.user-saved-filters-price-max').val() || 100000000;
		var bedrooms = $('.user-saved-filters-bedrooms-beds').val() || 0;
		var baths = $('.user-saved-filters-batrooms-baths').val() || 0;
		var minSq = $('.user-saved-filters-min-sqft').val() || 0;
		var maxSq = $('.user-saved-filters-max-sqft').val() || 10000000;
		var updatedFilters = {
			minPrice: minPrice,
			maxPrice: maxPrice,
			bedrooms: bedrooms,
			baths: baths,
			minSq: minSq,
			maxSq: maxSq
		};
		console.log(updatedFilters);
		Parse.User.current().set('filters', updatedFilters);
		Parse.User.current().save();
		// console.log(Parse.User.current());
	}

});
module.exports = exports['default'];
  
});

//# sourceMappingURL=app.js.map