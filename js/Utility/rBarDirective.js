ddApp.directive("raBar", function () {
    return {
        restrict: 'A',
        transclude: true,
        scope: {
            datasets: '='
        },
        
        link: function (scope, element, attrs) {
        }
    }
});