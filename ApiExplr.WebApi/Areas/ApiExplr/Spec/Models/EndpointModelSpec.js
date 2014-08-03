describe("EndpointModel", function () {

    var m;

    beforeEach(function () {
        m = new EndpointModel("Location", "~/api/v1/location");
        var a = new ActionModel("Index", "/");
        m.Actions.push(a);
    });

    it("Initialise.", function () {
        expect(m).toBe(m);
    });
    
    it("Has Name.", function () {
        expect(m.Name).toBe("Location");
    });

    it("Has Uri.", function () {
        expect(m.Uri).toBe("~/api/v1/location");
    });

    it("Has Actions.", function () {
        expect(m.Actions.length).toBe(1);
    });

    it("Get Action by Name and HttpMethod.", function () {
        var actionName = 'Index';
        var httpMethod = 'GET';
        var action = m.GetAction(actionName, httpMethod);
        expect(action.Name).toBe(actionName);
        expect(action.HttpMethod).toBe(httpMethod);
    });
   
});