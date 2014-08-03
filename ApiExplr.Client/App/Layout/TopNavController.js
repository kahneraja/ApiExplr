(function () {
    'use strict'


    angular.module('ApiExplorerApp')
      .controller('TopNavController', ['$scope', 'GlobalConfig', 'EndpointDataService', TopNavController]);

    function TopNavController($scope, GlobalConfig, EndpointDataService) {
        $scope.GlobalConfig = GlobalConfig;

        $scope.EnvironmentName = $scope.GlobalConfig.Environments[GlobalConfig.ActiveEnvironment].Name;

        $scope.ContentType = $scope.GlobalConfig.ContentTypes[GlobalConfig.ActiveContentType].Name;

        $scope.ChangeEnvironment = function (Index) {
            GlobalConfig.OAuth.Clear();
            EndpointDataService.Clear();
            GlobalConfig.ActiveEnvironment = Index;
            localStorage.ActiveEnvironment = Index;
            $scope.EnvironmentName = $scope.GlobalConfig.Environments[GlobalConfig.ActiveEnvironment].Name;
        }

        $scope.ChangeContentType = function (Index) {
            GlobalConfig.ActiveContentType = Index;
            localStorage.ActiveContentType = Index;
            $scope.ContentType = $scope.GlobalConfig.ContentTypes[GlobalConfig.ActiveContentType].Name;
        }
    }

}());