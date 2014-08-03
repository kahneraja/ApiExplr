 (function () {
     'use strict';

    angular.module('ApiExplorerApp')
      .controller('ActionController', ['$scope', '$routeParams', 'EndpointDataService', 'OAuthTokenService', 'GlobalConfig', ActionController]);

    function ActionController($scope, $routeParams, EndpointDataService, OAuthTokenService, GlobalConfig) {
        var endpointName = $routeParams.EndpointName;
        var actionName = $routeParams.ActionName;
        var httpMethod = $routeParams.HttpMethod;

        $scope.EndpointName = endpointName;
        $scope.Action = {};
        $scope.RequestUri = '';
        $scope.JsonRequest = '{}';
        $scope.JsonResponse = '{}';

        $scope.Init = function () {
            var endpoint = EndpointDataService.GetEndpoint(endpointName);

            $scope.Action = endpoint.GetAction(actionName, httpMethod);
            $scope.EndpointUri = endpoint.Uri;
            $scope.SetRequestUri();
        };

        $scope.SetRequestUri = function () {
            $scope.Action.RefreshDynamicUri();
            var actionUri = $scope.Action.DynamicUri;
            var endpointUri = $scope.EndpointUri;
            var baseUri = EndpointDataService.Settings.BaseRequestUri;
            var uri = baseUri + endpointUri + '/' + actionUri;

            $scope.RequestUri = uri;
        };

        $scope.RefreshRequest = function () {
            this.SetRequestUri();
            var json = $scope.Action.GetJson();
            $scope.JsonRequest = json;
        };

        $scope.$on('Keyup', function () {
            $scope.RefreshRequest();
        });

        $scope.SendRequest = function () {
            var url = $scope.RequestUri;
            var data = JSON.parse($scope.JsonRequest);
            var httpMethod = $scope.Action.HttpMethod;
            EndpointDataService.SendRequest(url, data, httpMethod)
                .then(function (response) {
                    $scope.JsonResponse = response;
                });
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