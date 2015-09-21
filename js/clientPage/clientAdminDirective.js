ddApp.directive('clientAdmin', function () {
    return {
        restrict: 'E',
        templateUrl: "partials/_cPageAdmin.html",
         controller: ['$scope', '$location', '$routeParams',  'Utility', 'typeheadDSFactory', 'ApplicationLog', 'appSetting', '$http', 'RemoteData',
                  function ($scope, $location,$routeParams,  Utility, typeheadDSFactory, ApplicationLog, appSetting, $http, RemoteData) {
                 
                    $scope.ClientCode = $routeParams.ClientCode;

                    $scope.contacts  = {
                        all: false,
                        primary: true,
                        DFE: false,
                        billing: false,
                        authorized: false
                      };

                      //this is related Clients Summary righthand menu and events
                      $scope.openRSMenu="";
                      $scope.onRightMenuMouseOver=function(type){
                        $scope.openRSMenu="rightSide-open rightSide-content";
                        // console.log(type);
                        // if(type==='mi'){
                        //     $scope.openRSMenu="rightSide-open rightSide-content";
                        // }
                        // else{
                        //     $scope.openRSMenu="";
                        // }
                      }
                      $scope.onRightMenuMouseOut=function(type){
                        console.log(type);
                      $scope.openRSMenu="";
                      }
                  }]

    };
});
