var DemographicsCollection = Backbone.Collection.extend({

	url: 'https://azure.geodataservice.net/GeoDataService.svc/GetUSDemographics?includecrimedata=true&zipcode=29307&$format=json'

});

export default {DemographicsCollection};