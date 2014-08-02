describe("ParameterModel", function () {

    var endpointDataService;

    beforeEach(module('ApiExplorerApp'));

    beforeEach(inject(function (EndpointDataService, SampleJsonService) {
        EndpointDataService.JsonFeed = SampleJsonService.Sample;
        endpointDataService = EndpointDataService;
    }));

    beforeEach(inject(function (EndpointDataService, SampleJsonService) {
        Service = EndpointDataService;
        Service.JsonFeed = SampleJsonService.Sample;
    }));

    it("Initialise.", function () {
        var m = new ParameterModel("Name", "String");
        expect(m).toBe(m);
    });

    it("Initialise. With FromUri.", function () {
        var fromUri = true;
        var m = new ParameterModel("Name", "String", fromUri);
        expect(m.FromUri).toBe(fromUri);
    });

    it("Initialise. With FromBody.", function () {
        var fromUri = false;
        var m = new ParameterModel("Name", "String", fromUri);
        expect(m.FromUri).toBe(fromUri);
    });

    it("Has Name.", function () {
        var m = new ParameterModel("Name", "String");
        expect(m.Name).toBe("Name");
    });

    it("Has Type.", function () {
        var m = new ParameterModel("Name", "String");
        expect(m.Type).toBe("String");
    });

    it("Add String property. Check child properties are ignored.", function () {
        var properties = [{
            "Name": "CurrentFederalEstablishmentNumber",
            "Type": "String",
            "DefaultValue": null,
            "Parameters": [
                {
                    "Name": "Chars",
                    "Type": "Char"
                },
                {
                    "Name": "Length",
                    "Type": "Int32"
                }
            ]
        }];

        var sampleParameter = new ParameterModel("Name", "String");
        sampleParameter.AddProperties(properties);

        expect(sampleParameter.Properties[0].Properties.length).toBe(0);
    });

});