describe("Property Controller", function () {

    var $controllerConstructor;
    var scope;
    var controller;
    var property;

    beforeEach(module('ApiExplorerApp'));

    beforeEach(inject(function ($controller, $rootScope, $route) {
        property = new PropertyModel("TestName", "TestType");

        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        scope.$parent.$index = 0;
        scope.$parent.Property = property;
        controller = $controllerConstructor('PropertyController', { $scope: scope });
    }));

    it("Initialise.", function () {
        expect(controller).toBe(controller);
    });

    it("Check name.", function () {
        expect(scope.Property.Name).toBe(property.Name);
    });
});