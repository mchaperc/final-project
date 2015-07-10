var HomeCollection = Backbone.Collection.extend({

	url: 'https://jsonp.afeld.me/?callback=?&url=https://simplyrets:simplyrets@api.simplyrets.com/properties',
	filteredCollection: function(collection) {
		return collection.filter(function(home) {
			console.log(this.minPrice, this.maxPrice, this.bedrooms, this.baths, this.minSq, this.maxSq);
			return home.attributes.listPrice >= this.minPrice
				&& home.attributes.listPrice <= this.maxPrice
				&& home.attributes.property.bedrooms >= this.bedrooms
				&& home.attributes.property.bathsFull >= this.baths
				&& home.attributes.property.area >= this.minSq
				&& home.attributes.property.area <= this.maxSq;
		}.bind(this));
	} 

});

export default {HomeCollection};