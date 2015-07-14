import router from '../router';
export default Backbone.View.extend({

	template: JST['user'],
	tagName: 'div',
	className: 'user-container',

	events: {
		'click .user-header-logout': 'logOut',
	},

	initialize: function() { 
		this.render();
		console.log(this.model.get('homes'));
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	logOut: function() {
		Parse.User.logOut();
		router.navigate('', true);
	}

});