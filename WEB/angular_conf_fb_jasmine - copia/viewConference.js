var app = angular.module('conferencesApp');

app.controller('viewConference', ['$scope', 'mainServices', '$routeParams', '$firebaseArray', '$location',
	function( $scope, mainServices, $routeParams, $firebaseArray, $location){


	
	//get the parameter comin in the route
	var confId = $routeParams.conferenceId;
	//Retrieves conference array from the factory
	$scope.conference = mainServices.getConferenceById(confId);
	$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

	//Stores username of current user
	$scope.user = mainServices.getCurrentUser();

	//Stores state of login
	$scope.isLogged = mainServices.isLogged();
	$scope.comentario = "";
	//Retreive comments from factory
	var ref1 = new Firebase("https://torrid-inferno-7555.firebaseio.com/comments/");
	var ref2 = new Firebase("https://torrid-inferno-7555.firebaseio.com/locations/");
	var ref3 = new Firebase("https://torrid-inferno-7555.firebaseio.com/tags/");
	$scope.comments = $firebaseArray(ref1);
	$scope.locations = $firebaseArray(ref2);
	$scope.tags = $firebaseArray(ref3);
  var places = $scope.locations;

	$scope.getCommentsConf = function(){
      var commentsAns = [];
      for (var i=0; i< $scope.comments.length ; i++){
        var comm = $scope.comments[i];
        if(String(comm.event) === String(confId)){
          commentsAns.push(comm);
        }

      }
      return commentsAns;
	}

	$scope.newComment = function() {

    	    $scope.comments.$add({
                event: confId,
                user: $scope.user,
                message: $scope.comentario
              });

    	  

  	};

	$scope.newConf = function(path){
			$location.path('/newConference/'+path);
		
	};


	
	
}]);