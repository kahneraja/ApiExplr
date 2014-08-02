(function () {
    'use strict';

    angular.module('ApiExplorerApp')
      .controller('PropertyController', ['$scope', PropertyController]);

    function PropertyController($scope) {
        $scope.Property = $scope.$parent.Property;

        $scope.IsOpen = true;

        $scope.Keyup = function () {
            $scope.$emit('Keyup');
        };

        $scope.AddProperty = function () {
            var lastIndex = $scope.Property.Properties.length - 1;
            var template = $scope.Property.Properties[lastIndex];
            var item = angular.copy(template);
            $scope.Property.Properties.push(item);
            $scope.Keyup();
        };
    }
}());