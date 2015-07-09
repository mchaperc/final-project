export default Backbone.View.extend({

	template: JST['popup'],
	className: 'screen',

	events: {
		'click .popup .fa-close': 'closePopUp'
	},

	initialize: function() {
		this.render();
		console.log(this.model);
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
	},

	closePopUp: function() {
		this.$el.remove();
	},

});