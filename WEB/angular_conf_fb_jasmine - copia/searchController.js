var app = angular.module('conferencesApp');

app.controller('searchController', ['$scope', '$firebaseArray', '$location',
	function( $scope,  $firebaseArray, $location){

		var ref1 = new Firebase("https://torrid-inferno-7555.firebaseio.com/conferences")
		$scope.tagname = "";
		$scope.conferences = $firebaseArray(ref1);

		$scope.busqueda = [];

		$scope.search = function (){
			$scope.busqueda = [];
		for (var i = 0 ; i < $scope.conferences.length ; i++){
			var etiqueta = $scope.conferences[i].tags.split(",");
			for (var j = 0; j< etiqueta.length ; j++){
				if (etiqueta[j] === $scope.tagname){
				$scope.busqueda.push($scope.conferences[i]);
				}
			}
			console.log("asd");
			}

		};

}]);