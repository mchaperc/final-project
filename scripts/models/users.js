var User = Backbone.Model.extend({

	idAttribute: 'objectId',
	urlRoot: 'https://api.parse.com/1/user',
	defaults: {
		name: '',
		username: '',
		password: '',
		homes: [],
		filters: {}
	}

});

var UserCollection = Backbone.Collection.extend({

	model: User,
	url: 'https://api.parse.com/1/user'

});

export default {User, UserCollection};