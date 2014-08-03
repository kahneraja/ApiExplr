describe("Endpoint Data Service Specifications", function () {

    var endpointDataService;

    beforeEach(module('ApiExplr'));

    beforeEach(inject(function (EndpointDataService, SampleJsonService) {
        EndpointDataService.JsonFeed = SampleJsonService.Sample;
        endpointDataService = EndpointDataService;
    }));

    it("Constructor.",
        function () {
            expect(endpointDataService).toBe(endpointDataService);
        });

    it("Load sample.",
        function () {
            expect(endpointDataService.JsonFeed.length).toBeGreaterThan(0);
        });

    it("Get Endpoints.",
        function () {
            var endpoints = endpointDataService.GetEndpoints();
            expect(endpoints.length).toBeGreaterThan(0);
        });
});