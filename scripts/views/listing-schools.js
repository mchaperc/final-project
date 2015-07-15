export default Backbone.View.extend({

	// template: JST['listing-schools'],
	// tagName: 'div',
	// className: 'school-data',

	events: {

	},

	initialize: function() {
		// this.render();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});