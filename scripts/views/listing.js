export default Backbone.View.extend({

	template: JST['listing'],
	tagName: 'div',
	className: 'listing-container',

	events: {
		'click .data-item': 'showData'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	showData: function(event) {
		$(event.target).parent().next().slideToggle();
		$(event.target).children('.fa-chevron-down').toggle();
    	$(event.target).children('.fa-chevron-up').toggle();
	}

})