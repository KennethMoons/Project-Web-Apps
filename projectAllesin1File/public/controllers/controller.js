var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


var refresh = function() {
  $http.get('/bluraylist').success(function(response) {
    console.log("I got the data I requested");
    $scope.bluraylist = response;
    $scope.bluray = "";
  });
};

refresh();

$scope.addBluray = function() {
  console.log($scope.bluray);
  $http.post('/bluraylist', $scope.bluray).success(function(response) {
    console.log(response);
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
  });
};

$scope.update = function() {
  console.log($scope.bluray1._id);
  $http.put('/bluraylist/' + $scope.bluray1._id, $scope.bluray1).success(function(response) {
    refresh();
    $scope.bluray1 = "";
  })
};

}]);﻿