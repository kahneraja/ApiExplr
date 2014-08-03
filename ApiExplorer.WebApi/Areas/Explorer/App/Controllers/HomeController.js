(function () {
    'use strict'

    angular.module('ApiExplorerApp')
      .controller('HomeController', ['$scope', '$routeParams', 'EndpointDataService', 'OAuthTokenService', '$location', HomeController]);

    function HomeController($scope, $routeParams, EndpointDataService, OAuthTokenService, $location) {
        var endpointName = $routeParams.EndpointName;

        $scope.ActiveToken = OAuthTokenService.ActiveToken;
        $scope.Endpoints = {};
        $scope.ActiveEndpoint = {};
        $scope.OAuthEnabled = OAuthTokenService.IsEnabled();

        $scope.Init = function () {
            $scope.Endpoints = EndpointDataService.GetEndpoints();
            $scope.ActiveEndpoint = $scope.MatchActiveEndpoint();
        };

        $scope.MatchActiveEndpoint = function () {
            var l = $scope.Endpoints.length;
            for (var i = 0; i < l; i++) {
                var e = $scope.Endpoints[i];
                if (e.Name == endpointName)
                {
                    return e;
                }
            }

            return $scope.Endpoints[0];

        };

        $scope.SelectEndpoint = function (i) {
            $scope.ActiveEndpoint = $scope.Endpoints[i];
        };

        $scope.RenewToken = function () {
            OAuthTokenService.Init();
        };

        if (!EndpointDataService.IsActive() && EndpointDataService.IsConfigured()) {
            EndpointDataService.Init()
                .then(function () {
                    $scope.Init();
                });
        } else if (EndpointDataService.IsConfigured()) {
            $scope.Init();
        } else {
            $location.path('Settings');
        }

        if (!OAuthTokenService.IsActive() && OAuthTokenService.IsEnabled()) {
            OAuthTokenService.Init();
        }

    }

}());