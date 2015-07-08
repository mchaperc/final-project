var HomeCollection = Backbone.Collection.extend({

	url: 'https://jsonp.afeld.me/?callback=?&url=https://simplyrets:simplyrets@api.simplyrets.com/properties'

});

export default {HomeCollection};