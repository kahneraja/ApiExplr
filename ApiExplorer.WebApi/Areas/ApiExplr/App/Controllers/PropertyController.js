(function () {
    'use strict';

    angular.module('ApiExplr')
      .controller('PropertyController', ['$scope', PropertyController]);

    function PropertyController($scope) {
        $scope.Property = $scope.$parent.Property;

        $scope.IsOpen = true;

        $scope.Keyup = function () {
            $scope.$emit('Keyup');
        };

        $scope.AddProperty = function () {
            $scope.Property.DuplicateLastProperty();
            $scope.Keyup();
        };
    }
}());