ddApp.directive('mvsummary', function () {
    return {
        restrict: 'E',
        scope: {
            columns: '=',     
            datasets: '='       
        },
        templateUrl: "partials/_cPageMvSummary.html",
        link: function (scope, element, attrs) {
        }
        
    };
});