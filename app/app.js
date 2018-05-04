var myNinjaApp = angular.module("myNinjaApp", ["ngRoute", "ngAnimate"]);

myNinjaApp.config([
  "$routeProvider",
  "$locationProvider",
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider
      .when("/home", {
        templateUrl: "views/home.html",
        controller: "ninjaController"
      })
      .when("/directory", {
        templateUrl: "views/directory.html",
        controller: "ninjaController"
      })
      .when("/contact", {
        templateUrl: "views/contact.html",
        controller: "contactController"
      })
      .when("/contact-success", {
        templateUrl: "views/contact-success.html",
        controller: "contactController"
      })
      .otherwise({
        redirectTo: "/home"
      });
  }
]);

myNinjaApp.directive("randomNinja", [
  function() {
    return {
      restrict: "E",
      scope: {
        ninjas: "=",
        title: "="
      },
      templateUrl: "views/random.html",
      transclude: true,
      replace: true,
      controller: function($scope) {
        $scope.random = Math.floor(Math.random() * 4);
      }
    };
  }
]);

myNinjaApp.controller("ninjaController", [
  "$scope",
  "$http",
  function($scope, $http) {
    $scope.removeNinja = function(ninja) {
      var removedNinja = $scope.ninjas.indexOf(ninja);
      $scope.ninjas.splice(removedNinja, 1);
    };

    $scope.addNinja = function() {
      $scope.ninjas.push({
        name: $scope.newninja.name,
        belt: $scope.newninja.belt,
        rate: parseInt($scope.newninja.rate),
        available: true
      });

      $scope.newninja.name = "";
      $scope.newninja.belt = "";
      $scope.newninja.rate = "";
    };

    $scope.removeAll = function() {
      $scope.ninjas = [];
    };

    $http.get("data/ninjas.json").then(function(response) {
      // success method has been deprecated
      $scope.ninjas = response.data;
    });
  }
]);

myNinjaApp.controller("contactController", [
  "$scope",
  "$location",
  function($scope, $location) {
    $scope.sendMessage = function() {
      $location.path("/contact-success");
    };
  }
]);
