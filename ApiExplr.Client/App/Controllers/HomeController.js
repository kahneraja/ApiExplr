(function() {
  'use strict'

  angular.module('ApiExplorerApp')
    .controller('HomeController', ['$scope', 'EndpointDataService', 'ngProgress', 'GlobalConfig',  HomeController]);

  function HomeController($scope, EndpointDataService, ngProgress, GlobalConfig) {

      $scope.GlobalConfig = GlobalConfig;

      $scope.Init = function () { 
          $scope.Endpoints = EndpointDataService.GetEndpoints();
      };

      if (EndpointDataService.JsonFeed === undefined) {
          EndpointDataService.Init()
              .then(function () {
                  $scope.Init();
              });
      } else {
          $scope.Init();
      }

  }

}());