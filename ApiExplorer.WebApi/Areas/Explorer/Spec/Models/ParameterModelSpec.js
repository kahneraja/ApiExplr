describe("ParameterModel", function () {

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

    it("Add String property. Check child (char/length) properties are ignored.", function () {
        var json = CreateMockJsonProperties();
        var sampleParameter = new ParameterModel("Name", "String");
        sampleParameter.AddProperties(json);
        expect(sampleParameter.Properties[0].Properties.length).toBe(0);
    });

    it("Is collection type.", function () {
        var m = new ParameterModel("Name", "Json.Collection");
        expect(m.IsCollectionType()).toBe(true);
    });

    it("Duplicate last item.", function () {
        var m = new ParameterModel("Name", "Json.Collection");
        var json = CreateMockCollectionItem();
        m.AddProperties(json);
        m.DuplicateLastProperty();
        expect(m.Properties.length).toBe(2);
    });

    it("Get collection data.", function () {
        var m = new ParameterModel("Name", "Json.Collection");
        var jsonProperties = CreateMockCollectionItem();
        m.AddProperties(jsonProperties);
        m.Properties[0].Value = 'SampleItemValue';
        m.DuplicateLastProperty();

        var data = m.GetCollectionData();
        var json = JSON.stringify(data);

        expect(json).toContain('SampleItemValue');
        expect(json).toContain('[');
        expect(json).toContain(']');
    });


    // Mock Functions

    function CreateMockJsonProperties() {
        var json = [{
            "Name": "SampleProperty",
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

        return json;
    };

    function CreateMockCollectionItem() {
        var json = [{
            "Name": "person",
            "Type": "Person",
            "DefaultValue": null,
            "Parameters": [
                {
                    "Name": "Firstname",
                    "Type": "string"
                },
                {
                    "Name": "Lastname",
                    "Type": "string"
                }
            ]
        }];

        return json;
    };

});