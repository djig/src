//some testing
var ddApp = angular.module('ddApp', [ 'ngRoute']);

ddApp.controller('avgCover', ['$scope', function($scope) {

$scope.closeWindow=function(){
  document.getElementById('d3Navline').innerHTML = '';

  $(".container").css({'margin-left':''});
}

}]);

var SimpleController = function ($scope) {
  $scope.isTriggered=true;
  $scope.trigger = function() {
          $scope.isTriggered = false;
      };
   };
   ddApp.controller("SimpleController",
                ["$scope", SimpleController]);
//
// describe("Hello World example", function() {
//   var scope,
//   controller;
//   beforeEach(function () {
//       module('ddApp');
//   });
//     beforeEach(inject(function ($rootScope, $controller) {
//               scope = $rootScope.$new();
//               controller = $controller('helloWorldController', {
//                   '$scope': scope
//               });
//           }));
//
//       it("test 232 'hang'", function() {
//           expect("hang1".startsWith('hang')).toEqual(true);
//         });
// });
//





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
