var app = angular.module('conferencesApp');

app.controller('favoriteController', ['$scope', 'mainServices', '$firebaseArray', '$location',
	function( $scope, mainServices, $firebaseArray, $location){

	var ref = new Firebase("https://torrid-inferno-7555.firebaseio.com/conferences");
	var ref1 = new Firebase("https://torrid-inferno-7555.firebaseio.com/favorites");
	$scope.conferences = $firebaseArray(ref);
	$scope.favorites = $firebaseArray(ref1);
	$scope.areYouLogged = mainServices.isLogged();

	//Stores username of current user
	$scope.user = mainServices.getCurrentUser();

	var query = ref1.orderByChild("user").equalTo($scope.user);
	$scope.favoritesFilter = $firebaseArray(query);
	console.log($scope.favoritesFilter.length);

	//redirect to /conference/:conferenceId
	$scope.go = function(path){
		$location.path('/conference/'+path);
	};




}]);