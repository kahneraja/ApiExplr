(function () {
    'use strict'

    angular.module('ApiExplorerApp')
      .controller('SettingsController', ['$scope', 'EndpointDataService', 'OAuthTokenService', SettingsController]);

    function SettingsController($scope, EndpointDataService, OAuthTokenService) {
        $scope.Credentials = {};
        $scope.Settings = {};

        $scope.Init = function () {
            $scope.RestoreSettings();
        };

        $scope.RestoreSettings = function () {
            if (OAuthTokenService.Credentials !== undefined)
                $scope.Credentials = OAuthTokenService.Credentials;

            if (EndpointDataService.Settings !== undefined)
                $scope.Settings = EndpointDataService.Settings;
        };

        $scope.SaveSettings = function () {
            OAuthTokenService.UpdateCredentials($scope.Credentials);
            EndpointDataService.UpdateSettings($scope.Settings);
        };

        $scope.Init();
    }

}());