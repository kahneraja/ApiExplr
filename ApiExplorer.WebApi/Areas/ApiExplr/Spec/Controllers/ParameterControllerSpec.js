describe("Parameter Controller", function () {

    var $controllerConstructor;
    var scope;
    var controller;
    var parameter;

    beforeEach(module('ApiExplr'));
    
    beforeEach(inject(function ($controller, $rootScope, $route) {
        parameter = new ParameterModel("TestName", "TestType");
 
        $controllerConstructor = $controller;
        scope = $rootScope.$new();
        scope.$parent.$index = 0;
        scope.$parent.Parameter = parameter;
        controller = $controllerConstructor('ParameterController', { $scope: scope });
    }));

    it("Initialise.", function () {
        expect(controller).toBe(controller);
    });
    
    it("Check name.", function () {
        expect(scope.Parameter.Name).toBe(parameter.Name);
    });

});