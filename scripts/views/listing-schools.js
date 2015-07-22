// import ElementaryView from './elementary';
// import MiddleView from './middle';
// import HighView from './high';

import ElementaryView from './elementaryTwo';
import MiddleView from './middleTwo';
import HighView from './highTwo';

export default Backbone.View.extend({

	initialize: function() {
		// this.loadElementaryRating();
		// this.loadElementaryScores();
		// this.loadElementaryTeachers();
		// this.loadMiddleRating();
		// this.loadMiddleScores();
		// this.loadMiddleTeachers();
		// this.loadHighRating();
		// this.loadHighScores();
		// this.loadHighTeachers();
		this.loadElementaryProfile();
		this.loadMiddleProfile();
		this.loadHighProfile();
		this.loadElementaryTests();
		this.loadMiddleTests();
		this.loadHighTests();
		// this.loadElementaryReviews();
		// this.loadMiddleReviews();
		// this.loadHighReviews();
	},

	// loadElementaryRating: function() {
	// 	var elementaryView = new ElementaryView({collection: this.collection});
	// 	$('.elementary-data').prepend(elementaryView.el);
	// },

	loadElementaryProfile: function() {
		var elementaryView = new ElementaryView({collection: this.collection});
		$('.elementary-data').prepend(elementaryView.el);
	},

	// loadElementaryScores: function() {
	// 	var elementaryScores = this.collection.models[0].attributes.elementaryScores;
	// 	var categories = _.map(elementaryScores.school, function(item) {
	// 		return item.grade + ': ' + item.subject;
	// 	})
	// 	var results = _.map(elementaryScores.school, function(item) {
	// 		return item.score.percentage;
	// 	});
	// 	$('#elementary-data-tests').highcharts({
	// 		colors: ['#0d233a'],
	//         chart: {
	//             type: 'column'
	//         },
	//         title: {
	//             text: elementaryScores.school[0].testname
	//         },
	//         subtitle: {
	//             text: 'Source: Education.com'
	//         },
	//         xAxis: {
	//             categories: categories,
	//             crosshair: true
	//         },
	//         yAxis: {
	//             min: 0,
	//             max: 100,
	//             title: {
	//                 text: 'Passing Rate (%)'
	//             }
	//         },
	//         tooltip: {
	//             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	//             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	//                 '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	//             footerFormat: '</table>',
	//             shared: true,
	//             useHTML: true
	//         },
	//         plotOptions: {
	//             column: {
	//                 pointPadding: 0.2,
	//                 borderWidth: 0
	//             }
	//         },
	//         series: [{
	//             name: 'Percentage',
	//             data: results

	//         }]
	//     });
	// },

	loadElementaryTests: function() {
		var elementaryTests = this.collection.models[0].attributes.elementaryTests.test[1];
		// var categories = _.map(elementaryTests.test, function(item) {
		// 	return 'Grade: ' item.gradeName + ': ' + item.subjectName;
		// });
		var categories = _.map(elementaryTests.testResult, function(item) {
			return 'Grade ' + item.gradeName + ': ' + item.subjectName;
		});
		var results = _.map(elementaryTests.testResult, function(item) {
			return Number(item.score);
		});
		$('#elementary-data-tests').highcharts({
			colors: ['#0d233a'],
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: elementaryTests.abbreviation
	        },
	        subtitle: {
	            text: 'Source: GreatSchools'
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
	                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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
		var results = _.map(elementaryTeachers.school, function(item) {
			if(item.percentage != null) {
				return item.percentage;
			} else {
				return item.total;
			}
		});
		$('#elementary-data-teachers').highcharts({
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
	                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
	},

	// loadMiddleRating: function() {
	// 	var middleView = new MiddleView({collection: this.collection});
	// 	$('.middle-data').prepend(middleView.el);
	// },

	loadMiddleProfile: function() {
		var middleView = new MiddleView({collection: this.collection});
		$('.middle-data').prepend(middleView.el);
	},

	// loadMiddleScores: function() {
	// 	var middleScores = this.collection.models[0].attributes.middleScores;
	// 	var categories = _.map(middleScores.school, function(item) {
	// 		return item.grade + ': ' + item.subject;
	// 	})
	// 	var results = _.map(middleScores.school, function(item) {
	// 		return item.score.percentage;
	// 	});
	// 	$('#middle-data-tests').highcharts({
	// 		colors: ['#0d233a'],
	//         chart: {
	//             type: 'column'
	//         },
	//         title: {
	//             text: middleScores.school[0].testname
	//         },
	//         subtitle: {
	//             text: 'Source: Education.com'
	//         },
	//         xAxis: {
	//             categories: categories,
	//             crosshair: true
	//         },
	//         yAxis: {
	//             min: 0,
	//             max: 100,
	//             title: {
	//                 text: 'Passing Rate (%)'
	//             }
	//         },
	//         tooltip: {
	//             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	//             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	//                 '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	//             footerFormat: '</table>',
	//             shared: true,
	//             useHTML: true
	//         },
	//         plotOptions: {
	//             column: {
	//                 pointPadding: 0.2,
	//                 borderWidth: 0
	//             }
	//         },
	//         series: [{
	//             name: 'Percentage',
	//             data: results

	//         }]
	//     });
	// },

	loadMiddleTests: function() {
		var middleTests = this.collection.models[0].attributes.middleTests.test[1];
		var categories = _.map(middleTests.testResult, function(item) {
			return 'Grade ' + item.gradeName + ': ' + item.subjectName;
		});
		var results = _.map(middleTests.testResult, function(item) {
			return Number(item.score);
		});
		$('#middle-data-tests').highcharts({
			colors: ['#77a1e5'],
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: middleTests.abbreviation
	        },
	        subtitle: {
	            text: 'Source: GreatSchools'
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
	                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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

	loadMiddleTeachers: function() {
		var middleTeachers = this.collection.models[0].attributes.middleTeachers;
		var categories = _.map(middleTeachers.school, function(item) {
			return item.stat_name + ': ' + item.stat_type;
		});
		var results = _.map(middleTeachers.school, function(item) {
			if(item.percentage != null) {
				return item.percentage;
			} else {
				return item.total;
			}
		});
		$('#middle-data-teachers').highcharts({
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
	                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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
	},

	// loadHighRating: function() {
	// 	var highView = new HighView({collection: this.collection});
	// 	$('.high-data').prepend(highView.el);
	// },

	loadHighProfile: function() {
		var highView = new HighView({collection: this.collection});
		$('.high-data').prepend(highView.el);
	},

	// loadHighScores: function() {
	// 	var highScores = this.collection.models[0].attributes.highScores;
	// 	var categories = _.map(highScores.school, function(item) {
	// 		return item.grade + ': ' + item.subject;
	// 	})
	// 	var results = _.map(highScores.school, function(item) {
	// 		return item.score.percentage;
	// 	});
	// 	$('#high-data-tests').highcharts({
	// 		colors: ['#0d233a'],
	//         chart: {
	//             type: 'column'
	//         },
	//         title: {
	//             text: highScores.school[0].testname
	//         },
	//         subtitle: {
	//             text: 'Source: Education.com'
	//         },
	//         xAxis: {
	//             categories: categories,
	//             crosshair: true
	//         },
	//         yAxis: {
	//             min: 0,
	//             max: 100,
	//             title: {
	//                 text: 'Passing Rate (%)'
	//             }
	//         },
	//         tooltip: {
	//             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
	//             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
	//                 '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
	//             footerFormat: '</table>',
	//             shared: true,
	//             useHTML: true
	//         },
	//         plotOptions: {
	//             column: {
	//                 pointPadding: 0.2,
	//                 borderWidth: 0
	//             }
	//         },
	//         series: [{
	//             name: 'Percentage',
	//             data: results

	//         }]
	//     });
	// },

	loadHighTests: function() {
		var highTests = this.collection.models[0].attributes.highTests.test[1];
		var categories = _.map(highTests.testResult, function(item) {
			// console.log(item);
			return 'Grade ' + item.gradeName + ': ' + item.subjectName;
		});
		var results = _.map(highTests.testResult, function(item) {
			return Number(item.score);
		});
		$('#high-data-tests').highcharts({
			colors: ['#910000'],
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: highTests.abbreviation
	        },
	        subtitle: {
	            text: 'Source: GreatSchools'
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
	                '<td style="padding:0"><b>{point.y:.1f} %</b></td></tr>',
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

	loadHighTeachers: function() {
		var highTeachers = this.collection.models[0].attributes.highTeachers;
		var categories = _.map(highTeachers.school, function(item) {
			return item.stat_name + ': ' + item.stat_type;
		});
		var results = _.map(highTeachers.school, function(item) {
			if(item.percentage != null) {
				return item.percentage;
			} else {
				return item.total;
			}
		});
		$('#high-data-teachers').highcharts({
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
	                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
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