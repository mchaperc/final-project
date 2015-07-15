export default Backbone.View.extend({

	template: JST['listing-data'],
	tagName: 'div',
	className: 'census-data',

	initialize: function(options) {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});