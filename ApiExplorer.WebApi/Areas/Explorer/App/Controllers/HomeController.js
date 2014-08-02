(function() {
  'use strict'

  angular.module('ApiExplorerApp')
    .controller('HomeController', ['$scope', 'EndpointDataService', 'OAuthTokenService', 'GlobalConfig',  HomeController]);

  function HomeController($scope, EndpointDataService, OAuthTokenService, GlobalConfig) {

      $scope.GlobalConfig = GlobalConfig;
      $scope.Endpoints = {};
      $scope.ActiveEndpoint = {};

      $scope.Init = function () { 
          $scope.Endpoints = EndpointDataService.GetEndpoints();
          $scope.ActiveEndpoint = $scope.Endpoints[0];
      };

      $scope.SelectEndpoint = function (i) {
          $scope.ActiveEndpoint = $scope.Endpoints[i];
      };

      if (EndpointDataService.JsonFeed === undefined) {
          EndpointDataService.Init()
              .then(function () {
                  $scope.Init();
              });
      } else {
          $scope.Init();
      }

      if (OAuthTokenService.ActiveToken.Data === undefined) {
          OAuthTokenService.Init();
      }

  }

}());