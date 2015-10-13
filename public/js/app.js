angular.module('EDeC', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/anabelle', {
				templateUrl: 'views/anabelle-ai.html',
				controller: 'AnabelleCtrl'
			})
		  	.otherwise({
		    	redirectTo: '/homepage'
		  	});
	}])
