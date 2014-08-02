describe("Global Config.", function () {

    var globalConfig;

    beforeEach(module('ApiExplorerApp'));

    beforeEach(inject(function (GlobalConfig) {
        globalConfig = GlobalConfig;
    }));

    it("Constructor.",
        function () {
            expect(globalConfig).toBe(globalConfig);
        });

    it("ContentTypes. Xml. Json.",
        function () {
            expect(globalConfig.ContentTypes.length).toBe(2);
        });
});