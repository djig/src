ddApp.directive('clients', function () {
    return {
        restrict: 'E',
        templateUrl: "partials/_cPage.html",
        controller: ['$scope', 'appSetting', '$http', '$routeParams',

                  function ($scope, appSetting, $http, $routeParams) {
                      console.log($routeParams.ClientCode);
                      $scope.$on('clienttypeaheadselected', function (event, suggestion, dataset) {
                       
                      });


                      var promise = $http.post(appSetting.svrurl + "/HoldingsService.svc/CachedAdminClientDetails", { "label": "VERIZON" }).
                        success(function (data, status, headers, config) {
                            $scope.clients = data;
                          // console.log(data);


                        }).
                        error(function (data, status, headers, config) {

                        });


                      promise.then(
                        function (payload) {
                            //console.log("Test");
                            //This was to test jQuery calls... Should avoid using jQuery with angular.Because Angular is really best way to code UI.
                            //$("#tst").html("<font color=red>Test</font>");
                        });

                      $scope.orderProp = 'AcctNum';
                  } ]  ,
        controllerAs: 'ClientsCtrl'
    };
});
