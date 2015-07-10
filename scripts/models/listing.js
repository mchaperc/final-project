export default Backbone.View.extend({

	template: JST['listing'],
	tagName: 'div',
	className: 'listing-container',

	events: {
		'click': 'showData',
	}

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	showData: function() {
		console.log($(this));
	}

})