var HomeCollection = Backbone.Collection.extend({

	url: 'https://jsonp.afeld.me/?callback=?&url=https://simplyrets:simplyrets@api.simplyrets.com/properties',
	filteredCollection: function(minPrice, maxPrice, bedrooms, baths, minSq, maxSq) {
		return this.map(function(home) {
			if(minPrice) {
				return home.attributes.listPrice >= minPrice ? home : null;;
			} else {
				return home;
			}
			if(maxPrice) {
				return home.attributes.listPrice <= maxPrice ? home : null;;	
			}  else {
				return home;
			}
			if(bedrooms) {
				return home.attributes.property.bedrooms >= bedrooms ? home : null;
			} else {
				return home;
			}
			if(baths) {
				return home.attributes.property.bathsFull >= baths ? home : null;;
			} else {
				return home;
			}
			if(minSq) {
				return home.attributes.property.area >= minSq ? home : null;;
			} else {
				return home;
			}
			if(maxSq) {
				return home.attributes.property.area <= maxSq ? home : null;;
			} else {
				return home;
			}
		});
	} 

});

export default {HomeCollection};