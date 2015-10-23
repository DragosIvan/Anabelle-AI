angular.module('EDeC')
    .controller('AnabelleCtrl', ['$scope', '$routeParams', '$filter', '$http', 'AIService', function($scope, $routeParams, $filter, $http, AIService) {

	    AIService.post(function(data) {
	        console.log(data);
	    })
	}])
 	.controller('QueensCtrl', ['$scope', function($scope) {

 		var n, state = [];
 		$scope.finalMatrix = [];
 		$scope.message = '';

 		function initialize(numberOfQueens) {
 			n = numberOfQueens;
 			state = [];
 			for (var i = 0; i < n; i++) state.push(0);
 			$scope.state = state;
 		}

 		function finalSolution() {
 			for (var i = 0; i < n; i++)
 				if (state[i] == 0) return false;
 			return true;
 		}

 		function validTransition(i, j) {
 			if (state[i] != 0) return false;
 			for (var k = 0; k < n; k++) {
 				if (state[k] == j) return false;
 				if ((Math.abs(k - i) == Math.abs(state[k] - j)) && state[k] != 0) return false;
 			}
 			return true;
 		}

 		function findSolution() {
 			var queens = 8;
 			$scope.queens = queens;
 			var maxIterations = 0, maxInitializations = 0;
 			initialize(queens);
 			while(maxInitializations < 100 && !finalSolution()) {
	 			initialize(queens);
	 			maxIterations = 0;
	 			while (!finalSolution()) {
	 				if (maxIterations >= 100) break;
	 				var i = Math.floor((Math.random() * queens) + 0);
	 				var j = Math.floor((Math.random() * queens) + 1);

	 				if (validTransition(i, j)) state[i] = j;
	 				maxIterations++;
	 				$scope.state = state;
	 				console.log(state);
	 			}
	 			maxInitializations++;
	 		}

	 		if (finalSolution()) {
		 		for (var i = 0; i < state.length; i++) {
		 			var temp = [];
		 			for (var j = 0; j < state.length; j++) {
		 				if (state[i] - 1 == j) temp.push(1);
		 				else temp.push(0);
		 			}
		 			$scope.finalMatrix.push(temp);
		 		}

		 		console.log($scope.finalMatrix);
		 	} else $scope.message = 'No solution was found ! Please refresh the page.';
 		}

 		$scope.getNumber = function(n) {
 			return new Array(n);
 		}

 		findSolution();

 	}])