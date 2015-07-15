import router from '../router';
export default Backbone.View.extend({

	template: JST['user'],
	tagName: 'div',
	className: 'user-container',

	events: {
		'click .user-header-logout': 'logOut',
		'click .user-saved-filters-update': 'updateFilters'
	},

	initialize: function() { 
		this.render();
		this.listenTo(this.model, 'update add remove', this.render);
		console.log(this.model.get('homes'));
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	logOut: function() {
		Parse.User.logOut();
		router.navigate('', true);
	},

	updateFilters: function() {
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
		}
		console.log(updatedFilters);
		Parse.User.current().set('filters', updatedFilters);
		Parse.User.current().save();
		console.log(Parse.User.current());
	}

});