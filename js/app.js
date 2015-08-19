//some testing
var ddApp = angular.module('ddApp', ['ngResource', 'ngRoute', 'ui.grid']);

ddApp.controller('helloWorldController', ['$scope', function($scope) {
  $scope.name = 'Superhero';
      $scope.counter = 0;
      $scope.$watch('name', function (newValue, oldValue) {
          $scope.counter = $scope.counter + 1;
      });
}]);


String.prototype.startsWith = function (param) {
    //this check will take care of non String Data Type as input parama..
    if (typeof param !== 'string') {
            return false;
       }
    return this.indexOf(param)===0 ? true:false;
};


describe("Hello World example", function() {
    var strTst="hang the dj";

              it("test 1 'hang'", function() {
                  expect(strTst.startsWith('hang')).toEqual(true);
                });
});


describe("Hello World example", function() {
  var scope,
  controller;
  beforeEach(function () {
      module('ddApp');
  });
    beforeEach(inject(function ($rootScope, $controller) {
              scope = $rootScope.$new();
              controller = $controller('helloWorldController', {
                  '$scope': scope
              });
          }));

      it("test 232 'hang'", function() {
          expect("hang1".startsWith('hang')).toEqual(true);
        });
});






//
// describe(‘Hello World example ’, function() {
//
//       beforeEach(module('ddApp'));
//
//       var HelloWorldController,
//       scope;
//
//       beforeEach(inject(function ($rootScope, $controller) {
//       scope = $rootScope.$new();
//       HelloWorldController = $controller('HelloWorldController', {
//       $scope: scope
//       });
//       }));
//       it('says hello world!', function () {
//       expect(scope.greeting).toEqual("Hello world!”);
//       });
//
// });
