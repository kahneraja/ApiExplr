(function () {
    'use strict';

    var app = angular.module("ApiExplorerApp", ['ngRoute','ui.bootstrap', 'ngProgress']);


    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider

            .when('/',
                { templateUrl: 'App/Controllers/HomeController.html' })

            .when('/Endpoint/:EndpointName',
                { templateUrl: 'App/Controllers/EndpointController.html' })

            .when('/Endpoint/:EndpointName/Action/:ActionName/HttpMethod/:HttpMethod',
                { templateUrl: 'App/Controllers/ActionController.html' })

            .otherwise({ redirectTo: '/' });
    }]);
}());