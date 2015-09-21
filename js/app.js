//some testing
var ddApp = angular.module('ddApp', ['ngResource', 'ngRoute', 'ui.grid']);

ddApp.controller('avgCover', ['$scope', function($scope) {

$scope.closeWindow=function(){
  document.getElementById('d3Navline').innerHTML = '';

  $(".container").css({'margin-left':''});
}

}]);


String.prototype.startsWith = function (param) {
    //this check will take care of non String Data Type as input parama..
    if (typeof param !== 'string') {
            return false;
       }
    return this.indexOf(param)===0 ? true:false;
};

//TESTING
// describe("Hello World example", function() {
//     var strTst="hang the dj";
//
//               it("test 1 'hang'", function() {
//                   expect(strTst.startsWith('hang')).toEqual(true);
//                 });
// });
//
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
