var myApp = angular.module('myApp', ['ui.router']);

myApp.directive('errorMessage',function(){
  return {
        template : "{{errorMsg}}"
    };
});


myApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/aanmelden');
    
    $stateProvider

        .state('aanmelden', {
          url: '/aanmelden',
          templateUrl: 'aanmelden.html'
        })
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
        })
        .state('registreer', {
            url: '/registreer',
            templateUrl: 'registreer.html'      
        });
        
});

myApp.controller('AppCtrl', ['$scope', '$http','$location', function($scope, $http,$location) {
    console.log("Hello World from controller");
    $scope.bluray = {};
    $scope.bluraylist = {};
    $scope.gebruikerRegistratie = {};
    $scope.preAanmelding = {};
    var postAanmelding = {};
    $scope.errorMsg = "";

     $scope.video = 
    {
        "url": ""
    }
    ;

var refresh = function() {
  $http.get('/blurays').success(function(response) {
    console.log("I got the data I requested");
    var gebruikerblurayList = response;
    var teller = 0;
    for(var i = 0 ; i < gebruikerblurayList.length;i++){
      if(gebruikerblurayList[i].gebruiker == $scope.bluray.gebruiker){
        $scope.bluraylist[teller] = gebruikerblurayList[i];
        teller++;
      };
    };
  });
};

$scope.goToCreate = function(){
	$location.path('/create');
};

$scope.addBluray = function() {
  console.log($scope.bluray);
  $http.post('/blurays', $scope.bluray).success(function(response) {
    console.log(response);
    var gebruikerTemp = $scope.bluray.gebruiker;
    $location.path('/home');
    $scope.bluray = {};
    $scope.bluray.gebruiker = gebruikerTemp;
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/blurays/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/blurays/' + id).success(function(response) {
    $scope.bluray1 = response;
    $scope.video.url = $scope.bluray1.youtubelink;
    $location.path('/details');

  });
};

$scope.updatePagina = function(id) {
  console.log(id);
  $http.get('/blurays/' + id).success(function(response) {
    $scope.bluray1 = response;
    $location.path('/update');

  });
};
$scope.cancel = function(){
	$location.path('/home');
};

$scope.update = function() {
  console.log($scope.bluray1._id);
  $http.put('/blurays/' + $scope.bluray1._id, $scope.bluray1).success(function(response) {
    $location.path('/home');
    $scope.bluray1 = {};
    refresh();
  })
};

$scope.Registreren =  function(){
  $location.path('/registreer');
};
$scope.AnnulerenRegistratie = function(){
  $location.path('/aanmelden');
};
$scope.addGebruiker = function() {
  console.log($scope.gebruikerRegistratie);
  $http.post('/gebruikers', $scope.gebruikerRegistratie).success(function(response) {
    $location.path('/aanmelden');
    $scope.gebruikerRegistratie = {};
  });
};

$scope.LogOn = function(){
  $http.get('/gebruikers').success(function(response) {
    console.log("I got the data I requested");
    postAanmelding = response;
    for(var i = 0 ; i < postAanmelding.length;i++){
      if(postAanmelding[i].email == $scope.preAanmelding.email && postAanmelding[i].wachtwoord == $scope.preAanmelding.wachtwoord){
        $scope.bluray.gebruiker = postAanmelding[i]._id;
        refresh();
        $location.path('/home');
        return;
      };
    };
  });
  $scope.errorMsg = "aanmelden niet gelukt. wachtwoord of email niet in orde";
  $location.path('/aanmelden');
};

}]);﻿

myApp.filter('trusted', ['$sce', function ($sce) {
        return function(url) {
        		var video_id = url.split('v=')[1].split('&')[0];
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + video_id);
        };
    }]);

