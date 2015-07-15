import router from '../router';
import DataView from './data';
import SchoolsView from './listing-schools';
import {DemographicsCollection} from '../models/demographicsCollection';
import {SchoolCollection} from '../models/schools';

export default Backbone.View.extend({

	template: JST['listing'],
	tagName: 'div',
	className: 'listing-container',

	events: {
		'click .data-item': 'showData',
		'click .listing-info-images-thumbnails-item': 'changeImage',
		'click .home': 'home',
		'click .save': 'saveHome',
		'click .user': 'toProfile'
	},

	initialize: function(options) {
		if (!Parse.User.current()) {
			this.model.set('isUser', false);
		} else {
			this.model.set('isUser', true);
		}
		if(this.model.attributes.property.exteriorFeatures) {
			this.model.set('exteriorFeatures', this.model.attributes.property.exteriorFeatures.split(','));
		}
		if(this.model.attributes.property.interiorFeatures) {
			this.model.set('interiorFeatures', this.model.attributes.property.interiorFeatures.split(','));
		}
		this.listPrice();
		this.render();
	},

	render: function() {
		var homes = Parse.User.current().get('homes');
		homes = homes.filter(function(home) {
			return home.mlsId == this.model.get('mlsId');
		}.bind(this));
		if (homes.length > 0) {
			this.model.set('isSaved', true);
		}
		this.$el.html(this.template(this.model.toJSON()));
		this.renderData();
	},

	renderData: function() {
		var demographics = new DemographicsCollection();
		demographics.fetch().then(function(data) {
			var demographicsColl = new DemographicsCollection(data);
			var dataView = new DataView({collection: demographicsColl, model: this.model});
			$('.listing-data-containers').prepend(dataView.el);
			// console.log(data);
		}.bind(this));
		var schools = new SchoolCollection();
		schools.fetch().then(function(data) {
			var schoolsColl = new SchoolCollection(data);
			var schoolsView = new SchoolsView({collection: schoolsColl});
			$('.listing-data-containers').append(schoolsView.el);
			// console.log(data);
		}.bind(this));
	},

	listPrice: function() {
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

	showData: function(event) {
		$('.data-view').slideUp();
		$('.fa-chevron-down').show();
    	$('.fa-chevron-up').hide();
		$(event.target).parent().next().slideToggle();
		$(event.target).children('.fa-chevron-down').toggle();
    	$(event.target).children('.fa-chevron-up').toggle();
	},

	changeImage: function(e) {
		var img = $(e.target).attr('src');
		$('.listing-info-images-image').attr('src', img);
	},

	saveHome: function() {
		if (this.model.get('isSaved')) {
			var savedHomes = Parse.User.current().get('homes');
			savedHomes = savedHomes.filter(function(home) {
				return home.mlsId != this.model.get('mlsId');
			}.bind(this));
			Parse.User.current().set('homes', savedHomes);
			Parse.User.current().save();
			this.model.set('isSaved', false);
			this.render();
			console.log(Parse.User.current());
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
			}
			var savedHomes = Parse.User.current().get('homes');
			Parse.User.current().set('homes', savedHomes.concat([newHome]));
			Parse.User.current().save();
			this.render();
			console.log(Parse.User.current());
		}
	},

	toProfile: function() {
		router.navigate('#users', true);
	}

})