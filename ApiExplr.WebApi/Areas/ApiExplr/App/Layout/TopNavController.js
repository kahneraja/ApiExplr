(function () {
    'use strict'


    angular.module('ApiExplr')
      .controller('TopNavController', ['$scope', 'GlobalConfig', 'OAuthTokenService', TopNavController]);

    function TopNavController($scope, GlobalConfig, OAuthTokenService) {
        $scope.OAuthTokenService = OAuthTokenService;

        $scope.ContentTypes = GlobalConfig.ContentTypes;
        $scope.ActiveContentTypeIndex = GlobalConfig.ActiveContentTypeIndex;

        $scope.UpdateActiveContentTypeIndex = function (i) {
            GlobalConfig.SaveActiveContentTypeIndex(i);
            $scope.ActiveContentTypeIndex = i;
        }
    }

}());