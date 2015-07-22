export default Backbone.View.extend({
	
	template: JST['loading'],
	tagName: 'div',
	className: 'loading-container',

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template);
	}

});