var app = angular.module('conferencesApp');

app.controller('conferencesController', ['$scope', 'mainServices', '$firebaseArray', '$location',
	function( $scope, mainServices, $firebaseArray, $location){

	var ref = new Firebase("https://torrid-inferno-7555.firebaseio.com/conferences");
	var ref1 = new Firebase("https://torrid-inferno-7555.firebaseio.com/comments");
	$scope.conferences = $firebaseArray(ref);
	$scope.comments = $firebaseArray(ref1);

	mainServices.updateComms($scope.comments);
	mainServices.updateConf($scope.conferences);

	var query = ref.orderByChild("date");
    // the $firebaseArray service properly handles database queries as well
 	
 	$scope.conferencesFilter = $firebaseArray(query);

	//Stores state of login
	$scope.areYouLogged = mainServices.isLogged();

	//Stores username of current user
	$scope.user = mainServices.getCurrentUser();

	$scope.move = function(attr){
		$location.path('/'+attr);
	};

	//redirect to /conference/:conferenceId
	$scope.go = function(path){
		$location.path('/conference/'+path);
	};

	$scope.newConf = function(){

			$location.path('/newConference/empty');
		
	};

}]);