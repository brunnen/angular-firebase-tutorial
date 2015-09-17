'use strict';
 
angular.module('myApp.addPost', ['ngRoute'])
 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])
 
.controller('AddPostCtrl', ['$scope','$firebase','CommonProp','$location', function($scope,$firebase,CommonProp,$location) {
	var firebaseObj = new Firebase("https://angbase-tutorial.firebaseio.com/Articles");
    var fb = $firebase(firebaseObj);

    $scope.AddPost = function() {
      	var title = $scope.article.title;
		var post = $scope.article.post;
 
 		fb.$push({
		    title: title,
		    post: post,
        	emailId: CommonProp.getUser()
		}).then(function(ref) {
		    console.log(ref);
		    $location.path('/welcome');
		}, function(error) {
		    console.log("Error:", error);
		});
    }
}]);