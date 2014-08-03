(function () {
    'use strict'

    angular.module('ApiExplr')
      .controller('EndpointController', ['$scope', '$routeParams', 'EndpointDataService', EndpointController]);

    function EndpointController($scope, $routeParams, EndpointDataService) {
        var endpointName = $routeParams.EndpointName;
        $scope.Endpoint = {};

        $scope.Init = function () {
            var endpoints = EndpointDataService.GetEndpoints();

            for(var i = 0; i < endpoints.length; i++){
                if (endpoints[i].Name == endpointName)
                    $scope.Endpoint = endpoints[i];
            };
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