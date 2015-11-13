var app = angular.module('conferencesApp', ['ngRoute']);

app.config( ['$routeProvider', function($routeProvider){
	$routeProvider.when('/conferences', {
		templateUrl : 'conferences.html',
		controller : 'conferencesController'
	}).when('/login', {
		templateUrl : 'login.html',
		controller : 'loginController'
	}).when('/register', {
		templateUrl : 'register.html',
		controller : 'registrationController'
	}).when('/newConference',{
		templateUrl : 'newConference.html',
		controller : 'createConfController'
	}).when('/conference', {
		templateUrl : 'conference.html',
		controller : 'viewConference'
	}).otherwise({
		redirectTo : '/conferences'
	});
}]);