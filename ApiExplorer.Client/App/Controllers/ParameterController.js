(function () {
    'use strict';

    angular.module('ApiExplorerApp')
      .controller('ParameterController', ['$scope', ParameterController]);

    function ParameterController($scope) {
        $scope.Parameter = $scope.$parent.Parameter;

        $scope.IsOpen = true;
        
        $scope.Keyup = function () {
            $scope.$emit('Keyup');
        };

        $scope.AddProperty = function () {
            var lastIndex = $scope.Parameter.Properties.length - 1;
            var template = $scope.Parameter.Properties[lastIndex];
            var item = angular.copy(template);
            $scope.Parameter.Properties.push(item);
            $scope.Keyup();
        };
    }
}());