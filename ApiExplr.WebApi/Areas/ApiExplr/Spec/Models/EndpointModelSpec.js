describe("When Creating Endpoint.", function () {

    var endpoint;

    beforeEach(function () {
        var json = CreateMockEndpoint();
        endpoint = new EndpointModel(json.Name, json.Uri, json.Info);
    });

    it("Initialise.", function () {
        expect(endpoint).toBe(endpoint);
    });
    
    it("Has Name.", function () {
        expect(endpoint.Name).toBe("Fruit");
    });

    it("Has Uri.", function () {
        expect(endpoint.Uri).toBe("api/fruit");
    });

    it("Has Actions.", function () {
        expect(endpoint.Actions.length).toBe(0);
    });

    it("Should add action.", function () {
        var json = CreateMockSimpleActions();
        endpoint.AddActions(json);
        expect(endpoint.Actions.length).toBe(1);
    });

    it("Should add action with correct name.", function () {
        var json = CreateMockSimpleActions();
        endpoint.AddActions(json);
        var name = endpoint.Actions[0].Name;
        expect(name).toBe('GetFruit');
    });

    it("Should add matching action names with suffix.", function () {
        var json = CreateMockMatchingActions();
        endpoint.AddActions(json);
        var name = endpoint.Actions[1].Name;
        expect(name).toBe('GetFruit-1');
    });

    it("Should get Action by Name and HttpMethod.", function () {
        var json = CreateMockSimpleActions();
        endpoint.AddActions(json);
        var actionName = 'GetFruit';
        var httpMethod = 'GET';
        var action = endpoint.GetAction(actionName, httpMethod);
        expect(action.Name).toBe(actionName);
    });

    function CreateMockEndpoint() {
        var json = {
            "Info": "Retrieve fruit data.",
            "Name": "Fruit",
            "Uri": "api/fruit"
        };

        return json;
    };

    function CreateMockSimpleActions() {
        var json = [
            {
                "Comment": null,
                "Info": "Get fruit collection.",
                "Parameters": [],
                "Name": "GetFruit",
                "HttpMethod": "GET",
                "Uri": ""
            }
        ];
        return json;
    };

    function CreateMockMatchingActions() {
        var json = [
            {
                "Comment": null,
                "Info": "Get fruit collection.",
                "Parameters": [],
                "Name": "GetFruit",
                "HttpMethod": "GET",
                "Uri": ""
            },
            {
                "Comment": null,
                "Info": "GET fruit detail",
                "Parameters": [
                    {
                        "Name": "id",
                        "Type": "Int32",
                        "FromUri": true,
                        "Properties": []
                    }
                ],
                "Name": "GetFruit",
                "HttpMethod": "GET",
                "Uri": "{id}"
            }
        ];
        return json;
    };
   
});