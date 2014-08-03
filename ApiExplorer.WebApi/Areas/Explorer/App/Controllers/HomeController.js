(function() {
  'use strict'

  angular.module('ApiExplorerApp')
    .controller('HomeController', ['$scope', 'EndpointDataService', 'OAuthTokenService', HomeController]);

  function HomeController($scope, EndpointDataService, OAuthTokenService) {

      $scope.ActiveToken = OAuthTokenService.ActiveToken;
      $scope.Endpoints = {};
      $scope.ActiveEndpoint = {};
      $scope.OAuthEnabled = OAuthTokenService.IsEnabled();

      $scope.Init = function () { 
          $scope.Endpoints = EndpointDataService.GetEndpoints();
          $scope.ActiveEndpoint = $scope.Endpoints[0];
      };

      $scope.SelectEndpoint = function (i) {
          $scope.ActiveEndpoint = $scope.Endpoints[i];
      };

      $scope.RenewToken = function () {
          OAuthTokenService.Init();
      };

      if (!EndpointDataService.IsActive()) {
          EndpointDataService.Init()
              .then(function () {
                  $scope.Init();
              });
      } else {
          $scope.Init();
      }

      if (!OAuthTokenService.IsActive() && OAuthTokenService.IsEnabled()) {
          OAuthTokenService.Init();
      }

  }

}());