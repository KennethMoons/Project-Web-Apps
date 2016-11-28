var myApp = angular.module('myApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })
        .state('details', {
            url: '/details',
            templateUrl: 'details.html'      
        })
        .state('create', {
            url: '/create',
            templateUrl: 'create.html'      
        })
        .state('update', {
            url: '/update',
            templateUrl: 'update.html'      
        });
        
});

myApp.controller('AppCtrl', ['$scope', '$http','$location', function($scope, $http,$location) {
    console.log("Hello World from controller");
    $scope.bluray = {};

var refresh = function() {
  $http.get('/bluraylist').success(function(response) {
    console.log("I got the data I requested");
    $scope.bluraylist = response;
  });
};

refresh();

$scope.goToCreate = function(){
	$location.path('/create');
};

$scope.addBluray = function() {
  console.log($scope.bluray);
  $http.post('/bluraylist', $scope.bluray).success(function(response) {
    console.log(response);
    $location.path('/home');
    $scope.bluray = {};
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/bluraylist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/bluraylist/' + id).success(function(response) {
    $scope.bluray1 = response;
    $location.path('/details');

  });
};

$scope.updatePagina = function(id) {
  console.log(id);
  $http.get('/bluraylist/' + id).success(function(response) {
    $scope.bluray1 = response;
    $location.path('/update');

  });
};
$scope.cancel = function(){
	$location.path('/home');
};

$scope.update = function() {
  console.log($scope.bluray1._id);
  $http.put('/bluraylist/' + $scope.bluray1._id, $scope.bluray1).success(function(response) {
    $location.path('/home');
    $scope.bluray1 = {};
    refresh();
  })
};

}]);﻿