var User = Backbone.Model.extend({

	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/user',
	defaults: {
		name: '',
		username: '',
		password: '',
		homes: [],
		filters: {minPrice: 0, maxPrice: 1000000000, bedrooms: 0, baths: 0, minSq: 0, maxSq: 1000000}
	}

});

var UserCollection = Backbone.Collection.extend({

	model: User,
	url: 'https://api.parse.com/1/user'

});

export default {User, UserCollection};