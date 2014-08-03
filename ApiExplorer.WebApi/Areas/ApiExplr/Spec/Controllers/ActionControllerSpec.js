describe("Action Controller", function () {

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

    it("Initialise Action Controller.", function () {
        routeParams = {};
        routeParams.EndpointName = 'Customers';
        routeParams.ActionName = 'Get';
        routeParams.HttpMethod = 'GET';

        var c = constructor('ActionController', {
            $scope: scope,
            '$routeParams': routeParams
        });
        scope.Init();

        expect(c).toBe(c);
    });

});