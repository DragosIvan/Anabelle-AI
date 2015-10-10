angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('AIService', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/homepage');
			},
			post : function() {
				return $http.get('/api/homepage');
			}
		}
	}]);