ddApp.directive('mvsummary', function () {
    return {
        restrict: 'E',
        scope: {
            columns: '=',
            datasets: '='
        },
        templateUrl: "partials/_cPageMvSummary.html",
        link: function (scope, element, attrs) {
          scope.popUp = function () {
            console.log(arguments);
          //  scope.parent.popUp();
          scope.$parent.popUp(arguments[0],arguments[1]);
            //  scope.$parent.apply(scope.$parent.popUp, arguments);

          }


        },
        controller:function($scope){
          $scope.popUp = function () {
          //  console.log($scope.$parent);
          //  scope.parent.popUp();
          }
        }
    };
});
