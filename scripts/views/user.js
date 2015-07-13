export default Backbone.View.extend({

	template: JST['user'],
	tagName: 'div',
	className: 'user-container',

	events: {

	},

	initialize: function() {
		this.render();
		console.log(this.collection);
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});