describe("TopNavController.", function () {

    var constructor;
    var scope;
    var controller;

    beforeEach(module('ApiExplorerApp'));

    beforeEach(inject(function ($controller, $rootScope, $route) {
        constructor = $controller;
        scope = $rootScope.$new();
        controller = constructor('TopNavController', { $scope: scope });
    }));

    it("Initialise.", function () {
        expect(controller).toBe(controller);
    });

    it("Check Default ContentType.", function () {
        expect(scope.ContentTypes[scope.ActiveContentTypeIndex].Name).toBe('Json');
    });
});