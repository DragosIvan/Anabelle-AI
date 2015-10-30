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

 		function findRandomSolution() {
 			var statisticsCounter = 0;
 			var totalTime = 0, solutionsFound = 0;

 			while (statisticsCounter < 100) {
	 			var queens = 8;
	 			$scope.queens = queens;
	 			var maxIterations = 0, maxInitializations = 0;
	 			
	 			var startTime = new Date().getTime();
	 			// console.log("Start Time: " + startTime);

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
		 				// console.log(state);
		 			}
		 			maxInitializations++;
		 		}


		 		var endTime = new Date().getTime();
		 		totalTime += endTime - startTime;
		 		// console.log("End Time:" + endTime);

		 		// console.log("Seconds passed: " + (endTime - startTime) / 1000);

		 		if (finalSolution()) {
			 		for (var i = 0; i < state.length; i++) {
			 			var temp = [];
			 			for (var j = 0; j < state.length; j++) {
			 				if (state[i] - 1 == j) temp.push(1);
			 				else temp.push(0);
			 			}
			 			$scope.finalMatrix.push(temp);
			 		}
			 		solutionsFound++;
			 		// console.log($scope.finalMatrix);
			 	} else $scope.message = 'No solution was found ! Please refresh the page.';

			 	statisticsCounter++;

			 	if (statisticsCounter == 99) {
			 		console.log("Random strategy results: ");
					console.log("Total spent time: " + totalTime);
					console.log("Average time: " + (totalTime / 1000) / 100 );
					console.log("Solutions found, out of 100 tries: " + solutionsFound);
			 	}
			}
 		}

 		function score(state) {
 			var temp = 0;
 			for (var i = 0; i < state.length; i++) {
 				if (state[i] != 0) temp++;
 			}

 			return temp;
 		}

 		function findHillClimbingSolution() {
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

	 				if (validTransition(i, j)) {
	 					$scope.newState = state;
	 					$scope.newState[i] = j;
	 					console.log("Score: " + score($scope.newState) + " --- " + $scope.newState);
	 				}

	 				if (score($scope.newState) >= score(state)) state = $scope.newState;

	 				maxIterations++;
	 				$scope.state = state;
	 				
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

		 	} else $scope.message = 'No solution was found ! Please refresh the page.';
 		}

		
	    function canPlaceQueen(r, c) {
	        for (var i = 0; i < r; i++)
	            if ($scope.state[i] == c || (i - r) == ($scope.state[i] - c) || (i - r) == (c - $scope.state[i])) return false;
	        return true;
	    }

	    function placeQueens(r, n) {
	        for (var c = 0; c < n; c++)
	            if (canPlaceQueen(r, c)) {
	                state[r] = c;
	                if (r == n - 1) {
	                	$scope.message = "";
	                	for (var i = 0; i < $scope.state.length; i++) $scope.state[i]++;
	                	
	                	console.log($scope.state);
	                	
	                	for (var i = 0; i < $scope.state.length; i++) {
				 			var temp = [];
				 			for (var j = 0; j < $scope.state.length; j++) {
				 				if ($scope.state[i] - 1 == j) temp.push(1);
				 				else temp.push(0);
				 			}
				 			$scope.finalMatrix.push(temp);
				 		}
	                	
	                	for (var i = 0; i < $scope.state.length; i++) $scope.state[i]--;
	                }
	                else placeQueens(r + 1, n);
	            }
	    }

	    function findAllSolutions() {
	        var queens = 5;
	        initialize(queens);
	        $scope.message = "No solution was found for the selected number of queens (" + $scope.state.length + ") !";
	        placeQueens(0, $scope.state.length);
	    }

 		// findRandomSolution();
 		// findHillClimbingSolution();
 		findAllSolutions();

 	}])