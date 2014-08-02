 (function () {
     'use strict';

    angular.module('ApiExplorerApp')
      .controller('ActionController', ['$scope', '$routeParams', 'EndpointDataService', 'GlobalConfig', 'ngProgress', ActionController]);

    function ActionController($scope, $routeParams, EndpointDataService, GlobalConfig, ngProgress) {
        var endpointName = $routeParams.EndpointName;
        var actionName = $routeParams.ActionName;
        var httpMethod = $routeParams.HttpMethod;

        $scope.EndpointName = endpointName;
        $scope.Action = {};
        $scope.RequestUri = '';
        $scope.JsonRequest = '{}';
        $scope.JsonResponse = '{}';
        $scope.GlobalConfig = GlobalConfig;

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
            var baseUrl = GlobalConfig.Environments[GlobalConfig.ActiveEnvironment].BaseUrl;
            var uri = baseUrl + endpointUri + '/' + actionUri;

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

                    var data = $scope.FormatResponse(response);

                    $scope.JsonResponse = data;
                });
        };

        $scope.FormatResponse = function (response) {
            var data = response;

            if (response.data !== undefined)
                data = response.data;

            if (GlobalConfig.ContentTypes[GlobalConfig.ActiveContentType].Name == 'Json')
                data = JSON.stringify(data, null, 4);

            return data;
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