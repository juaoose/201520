var app = angular.module('conferencesApp');

app.controller('createConfController', ['$scope', 'mainServices', '$firebaseArray', '$location', '$routeParams',
	function( $scope, mainServices, $firebaseArray, $location, $routeParams){

		var confId = $routeParams.conferenceId;

		var ref = new Firebase("https://torrid-inferno-7555.firebaseio.com/conferences");
		var ref1 = new Firebase("https://torrid-inferno-7555.firebaseio.com/tags")
		$scope.conferences = $firebaseArray(ref);
		$scope.tags = $firebaseArray(ref1);

		//fukin hell
		$scope.conference = mainServices.getConferenceById(confId);
		$scope.name = "";
		$scope.date = "";
		$scope.description = "";
		$scope.id = "";
		$scope.location = "";
		$scope.temas = "";
		$scope.tagsE = "";



		if($scope.conference && !(confId === 'vacio')){
			$scope.name = $scope.conference.name;
			$scope.date = $scope.conference.date;
			$scope.description = $scope.conference.description;
			$scope.id = $scope.conference.id;
			$scope.location = $scope.conference.location;
			$scope.tagsE = $scope.conference.tags;
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
										location : $scope.location,
										tags : $scope.tagsE
									};

				var etiquetas = $scope.tagsE.split(",");	
				for (var i = 0; i<etiquetas.length ; i++){
					console.log("entro al fooor1")
					for(var j = 0; j< $scope.tags ; j++){
						if(etiquetas[i] === $scope.tags[j].tag){
							console.log("LA etiqueta ya existe "+etiquetas[i]);
						}
						else{
							console.log("crear tag");
													var newTag = { 			tag : etiquetas[i]

									};
						$scope.tags.$add(newTag);
						}
					}
				}

				//					
				$scope.conferences.$add($scope.conference);
				$location.path('/conferences');
			}
			else{
				$scope.conference = { 	user : mainServices.getCurrentUser(),
										date : $scope.date,
										description : $scope.description,
										id : $scope.id,
										name : $scope.name,
										location : $scope.location,
										tags : $scope.tagsE
									};

				//
				var etiquetas = $scope.tagsE.split(",");	
				for (var i = 0; i<etiquetas.length ; i++){
					console.log("entro al fooor2")
					for(var j = 0; j< $scope.tags ; j++){
						if(etiquetas[i] === $scope.tags[j].tag){
							console.log("LA etiqueta ya existe "+etiquetas[i]);
						}
						else{
							console.log("crear tag");
													var newTag = { 			tag : etiquetas[i]

									};
						$scope.tags.$add(newTag);
						}
					}
				}



				//
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