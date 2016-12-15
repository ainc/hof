var filterApp = angular.module("filterApp", ['ngAnimate']).controller('FilterCtrl', FilterCtrl);

/*
Function to change {{ template tags }} to [[ template tags ]] so jekyll and angular use different tags
*/
filterApp.config(function($interpolateProvider) {
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
});

function FilterCtrl($http) {
	var self = this;

	self.filter = {};
	self.classes = [
		{name: 'After school', day: 'M'},
		{name: 'After school', day: 'T'},
		{name: 'Academy', day: 'T'},
		{name: 'Academy', day: 'R'},
		{name: 'Membership', day: 'T'},
	];

	self.contents = null;
	$http.get('/files/course-list-eventbrite.json')
			.success(function(data) {
				self.contents = data;
			})
			.error(function(data, status, error, config) {
				self.contents = [{heading:"Error",description:"Could not load json data"}];
			});

	console.log(self.contents);

	self.filterByCategory = filterByCategory;
	self.getCategories = getCategories;

	function filterByCategory(name) {
		return self.filter[name.day] || noFilter(self.filter);
	}

	function getCategories() {
		return (self.classes || []).
			map(function (name) {
				return name.day
			}).
			filter(function (cat, idx, arr) {
				return arr.indexOf(cat) === idx;
			});
	}

	function noFilter(filterObj) {
		return Object.
			keys(filterObj).
			every(function(key) {
				return !filterObj[key];
			});
	}

}

