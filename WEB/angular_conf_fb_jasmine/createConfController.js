var app = angular.module('conferencesApp');

app.controller('createConfController', ['$scope', 'mainServices', '$firebaseArray', '$location', '$routeParams',
	function( $scope, mainServices, $firebaseArray, $location, $routeParams){

		var confId = $routeParams.conferenceId;

		var ref = new Firebase("https://torrid-inferno-7555.firebaseio.com/conferences");
		$scope.conferences = $firebaseArray(ref);
		$scope.conference = mainServices.getConferenceById(confId);
		$scope.name = "";
		$scope.date = "";
		$scope.description = "";
		$scope.id = "";
		$scope.location = "";

		if($scope.conference && !(confId === 'vacio')){
			$scope.name = $scope.conference.name;
			$scope.date = $scope.conference.date;
			$scope.description = $scope.conference.description;
			$scope.id = $scope.conference.id;
			$scope.location = $scope.conference.location;
		}


		$scope.getIndex = function(conferenceId){
      	for (var i = 0;i < $scope.conferences.length ; i++){
       			 var conf = $scope.conferences[i];
       			 if(String(conf.id) === String(conferenceId)){
       	  		 	return i;
      	  			}
     		 }
		};




		$scope.create = function(){

			if ($scope.conference){
				console.log("Intentando cambiar una conf");
				var index = $scope.getIndex(confId);
				$scope.conferences.$remove(index);
				$scope.conference = { 	user : mainServices.getCurrentUser(),
										date : $scope.date,
										description : $scope.description,
										id : $scope.id,
										name : $scope.name,
										location : $scope.location
									};

				$scope.conferences.$add($scope.conference);
				$location.path('/conferences');
			}
			else{
				$scope.conference = { 	user : mainServices.getCurrentUser(),
										date : $scope.date,
										description : $scope.description,
										id : $scope.id,
										name : $scope.name,
										location : $scope.location
									};
				$scope.conferences.$add($scope.conference);
				$location.path('/conferences');
			}
		};


		$scope.remove = function(){
			if($scope.conference){
				var index = $scope.getIndex(confId);
				$scope.conferences.$remove(index);
				$location.path('/conferences');
			}
			else{
				alert('Cant remove');
			}
		}

}]);