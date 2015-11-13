var app = angular.module('conferencesApp', ['ngRoute', 'firebase', 'uiGmapgoogle-maps']);

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
	}).when('/newConference/:conferenceId/',{
		templateUrl : 'newConference.html',
		controller : 'createConfController'
	}).when('/conference/:conferenceId/', {
		templateUrl : 'conference.html',
		controller : 'viewConference'
	}).when('/favorites', {
		templateUrl : 'favorites.html',
		controller : 'favoriteController'
	}).otherwise({
		redirectTo : '/login'
	});
}]);