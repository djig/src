ddApp.directive('clientAdmin', function () {
    return {
        restrict: 'E',
        templateUrl: "partials/_cPageAdmin.html",
         controller: ['$scope', '$location', '$routeParams',  'Utility', 'typeheadDSFactory', 'ApplicationLog', 'appSetting', '$http', 'RemoteData',
                  function ($scope, $location,$routeParams,  Utility, typeheadDSFactory, ApplicationLog, appSetting, $http, RemoteData) {

                    $scope.ClientCode = $routeParams.ClientCode;
                    $scope.asofdate=$routeParams.asofdate;
                    $scope.acivecontactTab=0;
                    $scope.setClientContactTab = function (activeTab) {
                      console.log(activeTab);
                        $scope.acivecontactTab = activeTab;
                        $scope.selectedContactCompanyName= _.findWhere($scope.ClientContacts , {business_function: $scope.clientContactTabs[activeTab]}).person_company_name;
                        $scope.selectedContacts =  _.where($scope.ClientContacts,{person_company_name:$scope.selectedContactCompanyName});
                    }
                    $scope.isClientContactTab = function (checkTab) {
                       // console.log(checkTab);
                        return $scope.acivecontactTab === checkTab;
                    };
                    $scope.contacts  = {
                        all: false,
                        primary: true,
                        DFE: false,
                        billing: false,
                        authorized: false
                      };
                      $scope.bindSingleSwitch= function(key){
                        return function(key){
                        //  console.log(key);
                            $scope.$watch('contacts.' + key, function (newVal) {
                                  $scope.contacts[key]=newVal;
                                   $scope.filterContactData();
                            });
                          }(key);
                      }
                      $scope.bindUISwithch = function(){
                        for (var key in $scope.contacts) {
                            $scope.bindSingleSwitch(key);
                        }

                    }





                      //this is related Clients Summary righthand menu and events
                      $scope.openRSMenu="";
                      $scope.onRightMenuMouseOver=function(type){
                        $scope.openRSMenu="rightSide-open rightSide-content";

                      }
                      $scope.onRightMenuMouseOut=function(type){

                        $scope.openRSMenu="";
                      }

                      //loading Contacts data from admin Service
                      var dsClientContacts = RemoteData.post(appSetting.svrurl + "/HoldingsService.svc/POSTAdminClientContacts", {label:$routeParams.ClientCode});
                        dsClientContacts.then(function (data, status, headers, config) {


                          $scope.ClientContactsUnfilterdData =data;
                          $scope.clientDataSummary();
                          $scope.filterContactData();
                            $scope.bindUISwithch();
                                         //console.log($scope.selectedContacts);

                        });
                        $scope.clientDataSummary=function(){
                          //console.log($scope.ClientContactsUnfilterdData);

                          $scope.allCnt=$scope.ClientContactsUnfilterdData.length;
                          $scope.primaryCnt= _.where($scope.ClientContactsUnfilterdData , {primary_contact:'Y'}).length;
                          $scope.billingCnt= _.where($scope.ClientContactsUnfilterdData , {billing_contact:'Y'}).length;
                          $scope.dfeCnt= _.where($scope.ClientContactsUnfilterdData , {dfe_report:'Y'}).length;
                          $scope.authorizedCnt= _.where($scope.ClientContactsUnfilterdData , {signator:'Y'}).length;
                        }

                        $scope.filterContactData = function(){
                            //var cData=$scope.ClientContacts;
                            var objWhere={};
                            console.log($scope.contacts);
                              if($scope.contacts.billing ){
                                objWhere['billing_contact'] ="Y" ;
                              }
                              if($scope.contacts.authorized){  objWhere.signator = "Y"}
                              if($scope.contacts.primary){
                                console.log("t");
                                 objWhere.primary_contact = "Y"}
                              if($scope.contacts.dfe){ objWhere.dfe_report ="Y"}


                            if($scope.all){
                              objWhere={
                                billing_contact: "Y" ,
                               dfe_report : "Y",
                               signator:  "Y",
                               primary_contact:  "Y",
                             }
                            }
                            console.log(objWhere);


                            $scope.ClientContacts =_.where($scope.ClientContactsUnfilterdData , objWhere);
                            // $scope.ClientContacts =_.filter($scope.ClientContactsUnfilterdData , function(obj){
                            //   return obj.primary_contact.toString() ===objWhere.primary_contact
                            //    && obj.signator  === objWhere.signator
                            //     && obj.dfe_report  === objWhere.dfe_report
                            //     //  && obj.billing_contact  === objWhere.billing_contact
                            // });
                            console.log($scope.ClientContacts);
                            $scope.clientContactTabs=_.uniq(_.pluck($scope.ClientContacts,"business_function"));
                            $scope.ClientContactsGrp = _.groupBy($scope.ClientContacts,"business_function");

                            $scope.selectedContactCompanyName= _.findWhere($scope.ClientContacts , {business_function: $scope.clientContactTabs[0]}).person_company_name;



                            $scope.selectedContacts =  _.where($scope.ClientContacts,{person_company_name:$scope.selectedContactCompanyName});



                        }

                  }]

    };
});
