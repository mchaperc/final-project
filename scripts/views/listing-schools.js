export default Backbone.View.extend({

	template: JST['listing-schools'],
	tagName: 'div',
	className: 'listing-data-schools-data data-view',

	events: {

	},

	initialize: function() {
		this.render();
		this.loadElementaryScores();
		// console.log(this.collection.models[0].attributes.elementaryScores);
		this.loadElementaryTeachers();
	},

	render: function() {
		this.$el.html(this.template(this.collection.toJSON()));
	},

	loadElementaryScores: function() {
		var elementaryScores = this.collection.models[0].attributes.elementaryScores;
		console.log(elementaryScores);
		var categories = _.map(elementaryScores.school, function(item) {
			return item.grade + ': ' + item.subject;
		})
		var results = _.map(elementaryScores.school, function(item) {
			return item.score.percentage;
		});
		console.log(results);
		console.log(categories);
		$('#age').highcharts({
			colors: ['#0d233a'],
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: elementaryScores.school[0].testname
	        },
	        subtitle: {
	            text: 'Source: Education.com'
	        },
	        xAxis: {
	            categories: categories,
	            crosshair: true
	        },
	        yAxis: {
	            min: 0,
	            max: 100,
	            title: {
	                text: 'Passing Rate (%)'
	            }
	        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        series: [{
	            name: 'Percentage',
	            data: results

	        }]
	    });
	},

	loadElementaryTeachers: function() {
		var elementaryTeachers = this.collection.models[0].attributes.elementaryTeachers;
		var categories = _.map(elementaryTeachers.school, function(item) {
			return item.stat_name + ': ' + item.stat_type;
		});
		console.log(categories);
		var results = _.map(elementaryTeachers.school, function(item) {
			if(item.percentage != null) {
				return item.percentage;
			} else {
				return item.total;
			}
		});
		console.log(results);
		$('#income').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Teacher Statistics'
	        },
	        subtitle: {
	            text: 'Source: Education.com'
	        },
	        xAxis: {
	            categories: categories,
	            crosshair: true
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Number/Percentage'
	            }
	        },
	        tooltip: {
	            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
	            footerFormat: '</table>',
	            shared: true,
	            useHTML: true
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0
	            }
	        },
	        series: [{
	            name: 'Stats',
	            data: results

	        }]
	    });
	}

});