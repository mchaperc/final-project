export default Backbone.View.extend({

	template: JST['elementary'],

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	}

});