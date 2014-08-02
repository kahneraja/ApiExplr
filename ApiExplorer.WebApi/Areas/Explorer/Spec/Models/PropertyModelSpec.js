describe("PropertyModel", function () {

    it("Initialise.", function () {
        var p = CreateMockProperty();
        expect(p).toBe(p);
    });

    it("Has no value.", function () {
        var p = CreateMockProperty();
        expect(p.HasValue()).toBe(false);
    });

    it("Has no properties.", function () {
        var p = CreateMockProperty();
        expect(p.HasProperties()).toBe(false);
    });

    it("Add properties.", function () {
        var p = CreateMockProperty();
        var properties = CreateMockProperties();
        p.AddProperties(properties);
        expect(p.HasProperties()).toBe(true);
    });

    it("Has value.", function () {
        var p = CreateMockProperty();
        var properties = CreateMockProperties();
        p.AddProperties(properties);
        AssignMockValues(p);
        expect(p.HasValue()).toBe(true);
    });

    it("Has properties. No value.", function () {
        var p = CreateMockProperty();
        var properties = CreateMockProperties();
        p.AddProperties(properties);
        expect(p.HasValue()).toBe(false);
    });

    it("Get Json.", function () {
        var p = CreateMockProperty();
        var properties = CreateMockProperties();
        p.AddProperties(properties);
        AssignMockValues(p);

        var data = p.GetJsonData();

        var json = JSON.stringify(data);
        expect(json).toContain('John');
        expect(json).toContain('Smith');
        expect(json).toContain('3');
        expect(json).toContain('Manly St.');
        expect(json).toContain('2000');
    });


    it("Is collection type.", function () {
        var p = CreateMockProperty();
        var properties = CreateMockProperties();
        p.AddProperties(properties);
        AssignMockValues(p);
        var middleNames = p.Properties[2];

        expect(middleNames.IsCollectionType()).toBe(true);
    });

    it("Duplicate last item.", function () {
        var p = CreateMockProperty();
        var properties = CreateMockProperties();
        p.AddProperties(properties);
        AssignMockValues(p);
        var middleNames = p.Properties[2];

        middleNames.DuplicateLastProperty();
        expect(middleNames.Properties.length).toBe(2);
    });

    it("Collection Json.", function () {
        var p = CreateMockProperty();
        var properties = CreateMockProperties();
        p.AddProperties(properties);
        AssignMockValues(p);
        var middleNames = p.Properties[2];
        middleNames.DuplicateLastProperty();
        middleNames.Properties[1].Value = "Steven";

        var data = p.GetJsonData();
        var json = JSON.stringify(data);

        expect(json).toContain('Alex');
        expect(json).toContain('Steven');
    });

    // mock functions

    function CreateMockProperty() {
        return new PropertyModel("person", "Person", false);
    };

    function CreateMockProperties() {
        var json = [
            {
                "Name": "Firstname",
                "Type": "string"
            },
            {
                "Name": "Lastname",
                "Type": "string"
            },
            {
                "Name": "Middenames",
                "Type": "Json.Collection",
                "Properties": [
                    {
                        "Name": "Middename",
                        "Type": "string"
                    }
                ]
            },
            {
                "Name": "address",
                "Type": "Address",
                "Properties": [
                    {
                        "Name": "StreetNumber",
                        "Type": "int"
                    },
                    {
                        "Name": "StreetName",
                        "Type": "string"
                    },
                    {
                        "Name": "Postcode",
                        "Type": "int"
                    }
                ]
            },
        ];

        return json;
    };

    function AssignMockValues(person) {
        person.Properties[0].Value = 'John';
        person.Properties[1].Value = 'Smith';
        person.Properties[2].Properties[0].Value = 'Alex';
        person.Properties[3].Properties[0].Value = '3';
        person.Properties[3].Properties[1].Value = 'Manly St.';
        person.Properties[3].Properties[2].Value = '2000';
    };


});