export default Backbone.View.extend({

	template: JST['listing-data'],
	tagName: 'section',
	className: 'listing-data',

	initialize: function(options) {
		// this.demographics = options.demographics.clone();
		console.log(options.demographics);
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.demographics.toJSON()));
	}

});