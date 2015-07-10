import DataView from './data';
import {DemographicsCollection} from '../models/demographicsCollection';
// import {CensusCollection} from '../models/censusCollection';
export default Backbone.View.extend({

	template: JST['listing'],
	tagName: 'div',
	className: 'listing-container',

	events: {
		'click .data-item': 'showData',
		'click .listing-info-images-thumbnails-item': 'changeImage'
	},

	initialize: function() {
		if(this.model.attributes.property.exteriorFeatures) {
			this.model.set('exteriorFeatures', this.model.attributes.property.exteriorFeatures.split(','));
		}
		if(this.model.attributes.property.interiorFeatures) {
			this.model.set('interiorFeatures', this.model.attributes.property.interiorFeatures.split(','));
		}
		$('.bxslider').bxSlider();
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		this.renderData();
	},

	renderData: function() {
		var demographics = new DemographicsCollection();
		demographics.fetch().then(function(data) {
			// var demographicsColl = new DemographicsCollection(data);
			// var dataView = new DataView({demographics: demographicsColl});
			// this.$el.prepend(dataView.el);
			console.log(data.response);
		}.bind(this));
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
	}

})