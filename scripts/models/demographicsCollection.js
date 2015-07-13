var DemographicsCollection = Backbone.Collection.extend({

	url: 'https://azure.geodataservice.net/GeoDataService.svc/GetUSDemographics?includecrimedata=true&zipcode=29307&$format=json',
	accountKey: 'sw0IrV5wzv6ooZtTVj6g38+N2aI1JihNPRYUaGqqUEM='

});

export default {DemographicsCollection};