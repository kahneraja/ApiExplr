(function () {
    'use strict';

    angular.module('ApiExplr')
      .controller('ParameterController', ['$scope', ParameterController]);

    function ParameterController($scope) {
        $scope.Parameter = $scope.$parent.Parameter;

        $scope.IsOpen = true;
        
        $scope.Keyup = function () {
            $scope.$emit('Keyup');
        };

        $scope.AddProperty = function () {
            $scope.Parameter.DuplicateLastItem();
            $scope.Keyup();
        };
    }
}());