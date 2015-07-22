export default Backbone.View.extend({

	initialize: function(options) {
		this.demographics = this.collection.models[0].attributes;
		this.loadAge();
		this.loadIncome();
		this.loadCrime();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	loadAge: function() {
		var underFive = Number(this.demographics.PopulationUnder5);
		var fiveToNine = Number(this.demographics.Population5to9);
		var tenToFourteen = Number(this.demographics.Population10to14);
		var fifteenToNineteen = Number(this.demographics.Population15to19);
		var twentyToTwentyFour = Number(this.demographics.Population20to24);
		var twentyFiveToTwentyNine = Number(this.demographics.Population25to29);
		var thirtyToThirtyFour = Number(this.demographics.Population30to34);
		var thirtyFiveToThirtyNine = Number(this.demographics.Population35to39);
		var fortyToFortyFour = Number(this.demographics.Population40to44);
		var fortyFiveToFortyNine = Number(this.demographics.Population45to49);
		var fiftyToFiftyFour = Number(this.demographics.Population50to54);
		var fiftyFiveToFiftyNine = Number(this.demographics.Population55to59);
		var sixtyToSixtyFour = Number(this.demographics.Population60to64);
		var sixtyFiveToSixtyNine = Number(this.demographics.Population65to69);
		var seventyToSeventyFour = Number(this.demographics.Population70to74);
		var seventyFiveToSeventyNine = Number(this.demographics.Population75to79);
		var eightyToEightyFour = Number(this.demographics.Population80to84);
		var eightyFivePlus = Number(this.demographics.Population85Plus);
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
		var lessThan25 = Number(this.demographics.IncomeLessThan25)*100;
		var between25to50 = Number(this.demographics.IncomeBetween25to50)*100;
		var between50to100 = Number(this.demographics.IncomeBetween50to100)*100;
		var between100to200 = Number(this.demographics.IncomeBetween100to200)*100;
		var greaterThan200 = Number(this.demographics.IncomeGreater200)*100;
		$('#income').highcharts({
	        chart: {
	            type: 'bar'
	        },
	        title: {
	            text: 'Income by Population:'
	        },
	        xAxis: {
	            categories: ['Less than 25k', '25-50k', '50k-100k', '100k-200k', 'More than 200k'],
	            title: {
	                text: null
	            }
	        },
	        yAxis: {
	            min: 0,
	            tickInterval: 10,
	            title: {
	                text: 'Population (%)',
	                align: 'high'
	            },
	            labels: {
	                overflow: 'justify'
	            }
	        },
	        plotOptions: {
	            bar: {
	                dataLabels: {
	                    enabled: true
	                }
	            }
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'top',
	            x: -40,
	            y: 80,
	            floating: true,
	            borderWidth: 1,
	            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
	            shadow: true
	        },
	        credits: {
	            enabled: false
	        },
	        series: [{
	            name: 'Income ($US)',
	            data: [Number(lessThan25.toFixed(2)), Number(between25to50.toFixed(2)), Number(between50to100.toFixed(2)), Number(between100to200.toFixed(2)), Number(greaterThan200.toFixed(2))]

	        }]
	    });
	},

	loadCrime: function() {
		var violentCrime = Number(this.demographics.ViolentCrime);
		var murderAndManslaughter = Number(this.demographics.MurderAndManslaughter);
		var forcibleRape = Number(this.demographics.ForcibleRape);
		var robbery = Number(this.demographics.Robbery);
		var aggravatedAssault = Number(this.demographics.AggravatedAssault);
		var propertyCrime = Number(this.demographics.PropertyCrime);
		var burglary = Number(this.demographics.Burglary);
		var larcenyTheft = Number(this.demographics.LarcenyTheft);
		var motorVehicleTheft = Number(this.demographics.MotorVehicleTheft);
		var arson = Number(this.demographics.Arson);
		$('#crime').highcharts({
	        title: {
	            text: 'Reported Crimes',
	            x: -20 //center
	        },
	        xAxis: {
	            categories: ['Violent Crime', 'Murder and Manslaughter', 'Rape', 'Robbery', 'Aggravated Assault', 'Property Crime', 'Burglary', 'Larceny/Theft', 'Motor Vehicle Theft', 'Arson']
	        },
	        yAxis: {
	        	min: 0,
	            title: {
	                text: 'Committed Crimes'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        legend: {
	            layout: 'vertical',
	            align: 'right',
	            verticalAlign: 'middle',
	            borderWidth: 0
	        },
	        series: [{
	            name: 'Crime Rates',
	            data: [violentCrime, murderAndManslaughter, forcibleRape, robbery, aggravatedAssault, propertyCrime, burglary, larcenyTheft, motorVehicleTheft, arson]
	        }]
	    });
	}

});