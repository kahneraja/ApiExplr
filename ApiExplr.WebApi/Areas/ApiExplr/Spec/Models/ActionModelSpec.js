describe("ActionModel", function () {

    var endpointDataService;

    beforeEach(module('ApiExplr'));

    beforeEach(inject(function (EndpointDataService, SampleJsonService) {
        EndpointDataService.JsonFeed = SampleJsonService.Sample;
        endpointDataService = EndpointDataService;
    }));

    it("Initialise.", function () {
        var m = new ActionModel("Index", "/");
        expect(m).toBe(m);
    });

    it("Has Name.", function () {
        var m = new ActionModel("Index", "/");
        expect(m.Name).toBe("Index");
    });

    it("Has Uri.", function () {
        var m = new ActionModel("Index", "/");
        expect(m.Uri).toBe("/");
    });

    it("Add Parameter.", function () {
        var m = new ActionModel("Index", "/");
        expect(m.Uri).toBe("/");
    });

    it("Get Json. Multiple Parameters.", function () {
        var j = [
        {
            "Name": "SampleParameter1",
            "Type": "SampleType1",
            "FromUri": false,
            "Properties": [
                {
                    "Name": "SampleProperty1.1",
                    "Type": "SampleType1.1",
                    
                },
                {
                    "Name": "SampleProperty1.2",
                    "Type": "SampleType1.2",
                    
                }
            ],
        },
        {
            "Name": "SampleParameter2",
            "Type": "SampleType2",
            "FromUri": false,
            "Properties": [
                {
                    "Name": "SampleProperty2.1",
                    "Type": "SampleType2.1",
                },
                {
                    "Name": "SampleProperty2.2",
                    "Type": "SampleType2.2",
                }
            ],
        }
        ];

        var action = new ActionModel("Index", "/");
        action.AddParameters(j);
        action.Parameters[0].Properties[0].Value = "SampleValue1.1";
        action.Parameters[0].Properties[1].Value = "SampleValue1.2";
        action.Parameters[1].Properties[0].Value = "SampleValue2.1";
        action.Parameters[1].Properties[1].Value = "SampleValue2.2";

        var jsonData = action.GetJsonData();
        var json = JSON.stringify(jsonData, null, 4);

        expect(json).toContain('SampleParameter1');
        expect(json).toContain('SampleParameter2');
        expect(json).toContain('SampleProperty1.1');
        expect(json).toContain('SampleProperty1.2');
        expect(json).toContain('SampleProperty2.1');
        expect(json).toContain('SampleProperty2.2');
    });

    it("Get Json. Single Parameter.", function () {
        var parameters = [
        {
            "Name": "SampleParameter1",
            "Type": "SampleParameter1Type",
            "FromUri": false,
            "Properties": [
                {
                    "Name": "SampleProperty1.1",
                    "Type": "SampleType1",
                },
                {
                    "Name": "SampleProperty1.2",
                    "Type": "SampleType2",
                }
            ],
        }
        ];

        var m = new ActionModel("Index", "/");
        m.AddParameters(parameters);
        m.Parameters[0].Properties[0].Value = "SampleValue1.1";
        m.Parameters[0].Properties[1].Value = "SampleValue1.2";

        var jsonData = m.GetJsonData();
        var json = JSON.stringify(jsonData, null, 4);

        expect(json).not.toContain('SampleParameter1');
        expect(json).toContain('SampleProperty1.1');
        expect(json).toContain('SampleProperty1.2');
    });

    it("Get Json. Empty Value.", function () {
        var parameters = [
        {
            "Name": "SampleParameter1",
            "Type": "SampleParameter1Type",
            "FromUri": false,
            "Properties": [
                {
                    "Name": "SampleProperty1.1",
                    "Type": "SampleType1",
                },
                {
                    "Name": "SampleProperty1.2",
                    "Type": "SampleType2",
                }
            ],
        }
        ];

        var m = new ActionModel("Index", "/");
        m.AddParameters(parameters);
        m.Parameters[0].Properties[0].Value = "SampleValue1.1";

        var jsonData = m.GetJsonData();
        var json = JSON.stringify(jsonData, null, 4);

        expect(json).toContain('SampleProperty1.1');
        expect(json).not.toContain('SampleProperty1.2');
    });

    it("Get HttpMethod.", function () {
        var defaultAction = new ActionModel("Index", "/");
        expect(defaultAction.HttpMethod).toBe("GET");
    });

});