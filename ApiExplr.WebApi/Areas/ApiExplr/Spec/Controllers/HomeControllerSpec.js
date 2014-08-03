describe("Home Controller", function () {

    var $controllerConstructor;
    var scope;
    var controller;
    var endpointDataService;
    var sampleJsonService;

    beforeEach(module('ApiExplr'));
    
    beforeEach(inject(function ($controller, $rootScope, EndpointDataService, SampleJsonService) {
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        EndpointDataService.JsonFeed = SampleJsonService.Sample;
        controller = $controllerConstructor('HomeController', { $scope: scope });

        scope.Endpoints = EndpointDataService.GetEndpoints();
    }));

    it("Initialise.", function () {
        expect(controller).toBe(controller);
    });

    it("Has endpoints.", function () {
        expect(scope.Endpoints.length).toBeGreaterThan(0);
    });

});