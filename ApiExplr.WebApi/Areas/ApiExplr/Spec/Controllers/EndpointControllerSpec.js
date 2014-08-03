describe("Endpoint Controller", function () {

    var constructor;
    var scope;
    var globalConfig;
    var endpointDataService;

    beforeEach(module('ApiExplr'));

    beforeEach(inject(function ($controller, $rootScope, $route, EndpointDataService, SampleJsonService, GlobalConfig) {
        constructor = $controller;
        scope = $rootScope.$new();
        globalConfig = GlobalConfig;
        globalConfig.ActiveEnvironment = 0;
        EndpointDataService.JsonFeed = SampleJsonService.Sample;
    }));

    it("Initialise.", function () {
        routeParams = {};
        routeParams.EndpointName = 'Customers'
        routeParams.HttpMethod = 'GET';
        var c = constructor('EndpointController', {
            $scope: scope,
            '$routeParams': routeParams
        });
        scope.Init();

        expect(c).toBe(c);
    });

    it("Has Endpoint.", function () {
        routeParams = {};
        routeParams.EndpointName = 'Customers';
        routeParams.HttpMethod = 'GET';
        var c = constructor('EndpointController', {
            $scope: scope,
            '$routeParams': routeParams
        });
        scope.Init();
        expect(scope.Endpoint).not.toBeNull();
    });

    it("Has Uri.", function () {
        routeParams = {};
        routeParams.EndpointName = 'Customers';
        routeParams.HttpMethod = 'GET';
        var c = constructor('EndpointController', {
            $scope: scope,
            '$routeParams': routeParams
        });
        scope.Init();
        expect(scope.Endpoint.Uri).toBeDefined();
    });

    it("Has Actions.", function () {
        routeParams = {};
        routeParams.EndpointName = 'Customers';
        routeParams.HttpMethod = 'GET';
        var c = constructor('EndpointController', {
            $scope: scope,
            '$routeParams': routeParams
        });
        scope.Init();
        expect(scope.Endpoint.Actions.length).toBeGreaterThan(0);
    });

    it("Has Info.", function () {
        routeParams = {};
        routeParams.EndpointName = 'Customers';
        routeParams.HttpMethod = 'GET';
        var c = constructor('EndpointController', {
            $scope: scope,
            '$routeParams': routeParams
        });
        scope.Init();
        expect(scope.Endpoint.Info).toBeDefined();
        expect(scope.Endpoint.Info).not.toBe('');
    });

});