var app = angular.module('conferencesApp');

app.controller('tagsController', ['$scope', '$firebaseArray', '$location',
	function( $scope,  $firebaseArray, $location){

		var ref1 = new Firebase("https://torrid-inferno-7555.firebaseio.com/tags")
		$scope.tagname = "";
		$scope.tags = $firebaseArray(ref1);

		$scope.create = function(){
				$scope.tag = { 			tag : $scope.tagname

									};

				$scope.tags.$add($scope.tag);
		};


		$scope.remove = function(tag){
			$scope.tags.$remove(tag);
		};

}]);