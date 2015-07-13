export default Backbone.View.extend({

	template: JST['user'],
	tagName: 'div',
	className: 'user-container',

	events: {
		'click .user-header-logout': 'logOut',
	},

	initialize: function() {
		this.render();
		console.log(this.collection);
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	logOut: function() {
		Parse.User.logOut();
	}

});