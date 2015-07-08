export default Backbone.View.extend({

	template: JST['landing'],
	tagName: 'ul',
	className: 'site-nav',

	events: {
		'submit .site-nav-item-search-form': 'submitSearch',
	},

	initialize: function(options) {
		this.render(options);
	},

	render: function(options) {
		this.$el.html(this.template(this.collection.toJSON()));
		//Once more MLS data is available, 
		var lat = '29.7604';
		var lng = '-95.3698';
		this.areaMap = new GMaps({
		  div: '#app',
		  lat: lat,
		  lng: lng,
		  zoom: 10
		});

		this.renderChildren();
	},

	renderChildren: function() {
		
		this.children = this.collection.map(function(child) {
			if (child.attributes.geo.lat && child.attributes.geo.lng) {
				var lat = child.attributes.geo.lat;
				var lng = child.attributes.geo.lng;
				console.log(child);
				console.log(lat, lng);
				this.areaMap.addMarker({
					lat: lat,
					lng: lng,
					info: child,
					click: function(e) {
						alert('Clicked a marker');
					}
				});
			}
		}.bind(this));

		// console.log(this.collection);

		// this.areaMap.addMarker({
		// 	lat: this.collection.models[0].attributes.geo.lat,
		// 	lng: this.collection.models[0].attributes.geo.lng,
		// 	info: this.collection.models[0].attributes,
		// 	click: function(e) {
		// 		console.log(this.info);
		// 	}
		// })
		// this.areaMap.addMarker({
		// 	lat: this.collection.models[1].attributes.geo.lat,
		// 	lng: this.collection.models[1].attributes.geo.lng,
		// 	info: this.collection.models[1].attributes,
		// 	click: function(e) {
		// 		console.log(this.info);
		// 	}
		// })
		// this.areaMap.addMarker({
		// 	lat: this.collection.models[2].attributes.geo.lat,
		// 	lng: this.collection.models[2].attributes.geo.lng,
		// 	info: this.collection.models[2].attributes,
		// 	click: function(e) {
		// 		console.log(this.info);
		// 	}
		// })
		// this.areaMap.addMarker({
		// 	lat: this.collection.models[3].attributes.geo.lat,
		// 	lng: this.collection.models[3].attributes.geo.lng,
		// 	info: this.collection.models[3].attributes,
		// 	click: function(e) {
		// 		console.log(this.info);
		// 	}
		// })
		// this.areaMap.addMarker({
		// 	lat: this.collection.models[4].attributes.geo.lat,
		// 	lng: this.collection.models[4].attributes.geo.lng,
		// 	info: this.collection.models[4].attributes,
		// 	click: function(e) {
		// 		console.log(this.info);
		// 	}
		// })
		// for (var i = 0; i < this.collection.models.length; i++) {
		// 	this.areaMap.addMarker({
		// 		lat: this.collection.models[i].attributes.geo.lat,
		// 		lng: this.collection.models[i].attributes.geo.lng		
		// 	})
		// }

	},

	remove: function(){
		_.invoke(this.children || [], 'remove');
		Backbone.View.prototype.remove.apply(this, arguments);
	},

	submitSearch: function(e) {
		e.preventDefault();
		var searchArea = $('.site-nav-item-search-area').val();
		$('.site-nav-item-search-area').val('');
		console.log(searchArea);	
	}

})