export default Backbone.View.extend({

	template: JST['popup'],
	className: 'screen',

	events: {
		'click .popup .fa-close': 'closePopUp'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	closePopUp: function() {
		this.$el.remove();
	},

});