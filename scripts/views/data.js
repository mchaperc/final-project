export default Backbone.View.extend({

	initialize: function(options) {
		this.demographics = this.collection.models[0].attributes.data.d[0];
		console.log(this.demographics)
		this.loadAge();
		this.loadIncome();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	loadAge: function() {
		console.log('in loadData');
		var underFive = this.demographics.PopulationUnder5;
		var fiveToNine = this.demographics.Population5to9;
		var tenToFourteen = this.demographics.Population10to14;
		var fifteenToNineteen = this.demographics.Population15to19;
		var twentyToTwentyFour = this.demographics.Population20to24;
		var twentyFiveToTwentyNine = this.demographics.Population25to29;
		var thirtyToThirtyFour = this.demographics.Population30to34;
		var thirtyFiveToThirtyNine = this.demographics.Population35to39;
		var fortyToFortyFour = this.demographics.Population40to44;
		var fortyFiveToFortyNine = this.demographics.Population45to49;
		var fiftyToFiftyFour = this.demographics.Population50to54;
		var fiftyFiveToFiftyNine = this.demographics.Population55to59;
		var sixtyToSixtyFour = this.demographics.Population60to64;
		var sixtyFiveToSixtyNine = this.demographics.Population65to69;
		var seventyToSeventyFour = this.demographics.Population70to74;
		var seventyFiveToSeventyNine = this.demographics.Population75to79;
		var eightyToEightyFour = this.demographics.Population80to84;
		var eightyFivePlus = this.demographics.Population85Plus;
		$('#age').highcharts({
	        chart: {
	            type: 'pie',
	            options3d: {
	                enabled: true,
	                alpha: 45
	            }
	        },
	        title: {
	            text: 'Population by Age: '
	        },
	        subtitle: {
	            text: '(total population: ' + this.demographics.Population + ')'
	        },
	        plotOptions: {
	            pie: {
	                innerSize: 100,
	                depth: 45
	            }
	        },
	        series: [{
	            name: 'Age Groups',
	            data: [
	                ['Under 5', underFive],
	                ['5 to 9', fiveToNine],
	                ['10 to 14', tenToFourteen],
	                ['15 to 19', fifteenToNineteen],
	                ['20 to 24', twentyToTwentyFour],
	                ['25 to 29', twentyFiveToTwentyNine],
	                ['30 to 34', thirtyToThirtyFour],
	                ['35 to 39', thirtyFiveToThirtyNine],
	                ['40 to 44', fortyToFortyFour],
	                ['45 to 49', fortyFiveToFortyNine],
	                ['50 to 54', fiftyToFiftyFour],
	                ['55 to 59', fiftyFiveToFiftyNine],
	                ['60 to 64', sixtyToSixtyFour],
	                ['65 to 69', sixtyFiveToSixtyNine],
	                ['70 to 74', seventyToSeventyFour],
	                ['75 to 79', seventyFiveToSeventyNine],
	                ['80 to 84', eightyToEightyFour],
	                ['85+', eightyFivePlus]
	            ]
	        }]
	    });
	},

	loadIncome: function() {
		var lessThan25 = this.demographics.IncomeLessThan25;
		var between25to50 = this.demographics.IncomeBetween25to50;
		var between50to100 = this.demographics.IncomeBetween50to100;
		var between100to200 = this.demographics.IncomeBetween100to200;
		var greaterThan200 = this.demographics.IncomeGreater200;
		$('#income').highcharts({
	        title: {
	            text: 'Individual Income Breakdown',
	            x: -20 //center
	        },
	        xAxis: {
	            categories: ['< 25k', '25-50k', '50k-100k', '100k-200k', '> 200k']
	        },
	        yAxis: {
	            title: {
	                text: 'US Dollars ($)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valuePrefix: '$'
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Income',
	            data: [lessThan25, between25to50, between50to100, between100to200, greaterThan200]
	        }]
	    });
	}

});