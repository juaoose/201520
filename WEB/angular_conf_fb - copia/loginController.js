var app = angular.module( "conferencesApp" );

app.controller( "loginController", [ '$scope', '$location', 'mainServices',  function( $scope, $location, mainServices) {

  $scope.login = "";
  $scope.password = "";
  
  $scope.validateLogin = function() {
    
    if ( mainServices.validateLogin( $scope.login, $scope.password ) ) {
      $location.path( "/conferences" );

    } else {
      $scope.mensaje = "Failed to login";      
    }
  }
  
}]);
