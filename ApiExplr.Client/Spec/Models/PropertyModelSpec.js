describe("PropertyModel", function () {

    var m;

    beforeEach(function () {
        m = new PropertyModel("City", "CitySummary");
    });

    it("Initialise.", function () {
        expect(m).toBe(m);
    });
    
    it("Has Properties.", function () {
        var hasChildren = m.HasProperties();
        expect(hasChildren).toBe(false);
    });

    it("Add property.", function () {
        var properties = [
                {
                    "Name": "Age",
                    "Type": "Int32"
                }
        ];

        var sampleProperty = new PropertyModel("Student", "Person");
        sampleProperty.AddProperties(properties);

        expect(sampleProperty.Properties.length).toBe(1);
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

        var sampleProperty = new PropertyModel("Name", "String");
        sampleProperty.AddProperties(properties);

        expect(sampleProperty.Properties[0].Properties.length).toBe(0);
    });


    it("Get simple json summary.", function () {
        var sample = new PropertyModel();
        sample.Name = "Name";
        sample.Value = "Sydney";
        var jsonData = sample.GetJsonData();

        var json = JSON.stringify(jsonData);
        expect(json).not.toContain('Name');
        expect(json).toContain('Sydney');
        expect(json).not.toContain('[');
        expect(json).not.toContain(']');
    });


    it("Get nested json summary.", function () {

        var sample1 = new PropertyModel();
        sample1.Name = "Name";
        sample1.Value = "Sydney";
        m.Properties.push(sample1);

        var sample2 = new PropertyModel();
        sample2.Name = "Population";
        sample2.Value = "10,000";
        m.Properties.push(sample2);

        var jsonData = m.GetJsonData();

        var json = JSON.stringify(jsonData);

        expect(json).not.toContain('City');
        expect(json).toContain('Name');
        expect(json).toContain('Sydney');
        expect(json).toContain('Population');
        expect(json).toContain('10,000');
        expect(json).not.toContain('[');
        expect(json).not.toContain(']');
    });

    it("Has no value.", function () {
        var hasValue = m.HasValue();
        expect(hasValue).toBe(false);
    });

    it("Has parameter. No value.", function () {
        var json = [
        {
            "Name": "SampleParameter",
            "Type": "SampleType"
        }
        ];
        m.AddProperties(json);
        var hasValue = m.HasValue();
        expect(hasValue).toBe(false);
    });

    it("Has value.", function () {
        var json = [
        {
            "Name": "SampleParameter",
            "Type": "SampleType"
        }
        ];
        m.AddProperties(json);
        m.Properties[0].Value = 'SampleValue';
        var hasValue = m.HasValue();
        expect(hasValue).toBe(true);
    });
});