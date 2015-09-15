'use strict';
 
angular.module('myApp.home', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])

.service('CommonProp', function() {
    var user = '';
 
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
})
 
// Home controller
.controller('HomeCtrl', ['$scope','$location','CommonProp','$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {
	var firebaseObj = new Firebase("https://angbase-tutorial.firebaseio.com");
    var loginObj = $firebaseAuth(firebaseObj);
	
	$scope.SignIn = function(event) {
	    event.preventDefault();  // To prevent form refresh
	    var username = $scope.user.email;
	    var password = $scope.user.password;
     
    	loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            // Success callback
            console.log(user);
            console.log('Authentication successful');
            CommonProp.setUser(user.password.email);
            $location.path('/welcome');
        }, function(error) {
            // Failure callback
            console.log('Authentication failure');
        });
	}
}]);