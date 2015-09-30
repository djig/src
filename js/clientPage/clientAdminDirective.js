ddApp.directive('clientAdmin', function () {
    return {

        restrict: 'E',
        templateUrl: "partials/_cPageAdmin.html",
         controller: ['$scope', '$location', '$routeParams',  'Utility', 'typeheadDSFactory', 'ApplicationLog', 'appSetting', '$http', 'RemoteData','$timeout',
                  function ($scope, $location,$routeParams,  Utility, typeheadDSFactory, ApplicationLog, appSetting, $http, RemoteData,$timeout) {

                    $scope.ClientCode = $routeParams.ClientCode;
                    $scope.asofdate=$routeParams.asofdate;
                    $scope.vTab=1;
                    $scope.vTabDescArr=["Contacts","Auth Funds","Cash Flow"];

                    $scope.setTabVeritical = function(tabId){
                      this.vTab=tabId;
                    }
                    $scope.isSetVeritical =function(tabId){
                       return tabId===this.vTab ;
                    }
                    $scope.acivecontactTab=0;
                    $scope.contactPopUp=false;
                    $scope.setClientContactTab = function (activeTab) {
                      //console.log(activeTab);
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

                    $scope.openContact = function(){
                      $scope.contactPopUp=true;
                     
                      var pos=$(arguments[0].toElement).parent().position();
                       
                      $(".contactList").addClass("contentRollver");
                      $(".dvContact").css({
                          position: "absolute",
                          top: pos.top + "px",
                          left: pos.left + "px",
                          
                          "-webkit-transition": "0.3s all cubic-bezier(0.250, 0.460, 0.450, 0.940)",
                          "webkit-transform-origin": "50% 50%",
                          //"-webkit-transform": "scale( 1.1 )" 
                      })


                      $scope.selectedContact = arguments[1];
                    }
                    $scope.closeContact = function(){
                       $scope.contactPopUp=false;
                       $(".contactList").removeClass("contentRollver");
                    }
                      $scope.bindSingleSwitch= function(key){
                        return function(key){
                        //  console.log(key);
                            $scope.$watch('contacts.' + key, function (newVal) {
                                console.log("Watch" + key);
                                  $scope.contacts[key]=newVal;

                                   $scope.filterContactData(key,newVal);
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

                            $scope.bindUISwithch();
                            $scope.filterContactData("primary",true);
                            console.log($scope.selectedContacts);
            

                        });
                        $scope.clientDataSummary=function(){
                          $scope.allCnt=$scope.ClientContactsUnfilterdData.length;
                          $scope.primaryCnt= _.where($scope.ClientContactsUnfilterdData , {primary_contact:'Y'}).length;
                          $scope.billingCnt= _.where($scope.ClientContactsUnfilterdData , {billing_contact:'Y'}).length;
                          $scope.dfeCnt= _.where($scope.ClientContactsUnfilterdData , {dfe_report:'Y'}).length;
                          $scope.authorizedCnt= _.where($scope.ClientContactsUnfilterdData , {signator:'Y'}).length;
                        }

                        $scope.filterContactData = function(key,newVal){
                            //var cData=$scope.ClientContacts;
                            var objWhere={};
                            if(key==="all" && newVal===true){
                                angular.element( '.chkNonAll+.switchery' ).removeAttr( 'style' );
                                $( '.chkNonAll+.switchery' ).addClass("switheryChangeOff");
                                $( '.chkNonAll' ).removeClass("ng-pristine");
                                $( '.chkNonAll' ).addClass("ng-valid-parse");
                                $( '.chkNonAll' ).addClass("ng-dirty");
                                angular.element( '.chkNonAll+.switchery small' ).removeAttr('style');
                                $( '.chkNonAll+.switchery small' ).addClass("smallOff");

                                $scope.contacts.primary= false;
                                $scope.contacts.DFE= false;
                                $scope.contacts.billing= false;
                                $scope.contacts.authorized= false;

                            }

                           if(key!=="all"  && newVal===true ){
                                 $scope.contacts.all= false;

                                 angular.element( '.chkAll+.switchery' ).removeAttr( 'style' );
                                 $( '.chkAll+.switchery' ).addClass("switheryChangeOff");
                                 $( '.chknAll' ).removeClass("ng-pristine");
                                 $( '.chkAll' ).addClass("ng-valid-parse");
                                 $( '.chkAll' ).addClass("ng-dirty");
                                 angular.element( '.chkAll+.switchery small' ).removeAttr('style');
                                 $( '.chkAll+.switchery small' ).addClass("smallOff");
                              }

                           if($scope.contacts.all){
                                  objWhere={} ;
                           }
                           if($scope.contacts.authorized){  objWhere.signator = "Y"}
                           if($scope.contacts.primary){

                              objWhere.primary_contact = "Y"
                            }
                           if($scope.contacts.DFE){ objWhere.dfe_report ="Y"}
                            if($scope.contacts.billing){ objWhere.billing_contact ="Y"}
                           //console.log(objWhere);
                           //console.log($scope.ClientContactsUnfilterdData);

                           $scope.ClientContacts =_.where($scope.ClientContactsUnfilterdData , objWhere);
                           $scope.clientContactTabs=_.uniq(_.pluck($scope.ClientContacts,"business_function"));
                           $scope.ClientContactsGrp = _.groupBy($scope.ClientContacts,"business_function");
                           if($scope.ClientContacts.length>0){
                             $scope.selectedContactCompanyName= _.findWhere($scope.ClientContacts , {business_function: $scope.clientContactTabs[0]}).person_company_name;
                             $scope.selectedContacts =  _.where($scope.ClientContacts,{person_company_name:$scope.selectedContactCompanyName});
                           }
                           else {
                             $scope.selectedContactCompanyName= "";
                             $scope.selectedContacts = [];
                           }


                          
                           //cashflow related data
                           $scope.modeOfCashFlow=0;

                            var cashflowparam = {
                                "AsOfDate": $routeParams.asofdate,//always calculate last month end(t+5 rule apply)
                                "ClientCode": $routeParams.ClientCode,
                                "Mode": $scope.modeOfCashFlow
                            }

                          var dsCashFlow = RemoteData.post(appSetting.svrurl + "/HoldingsService.svc/GetCashFlow", cashflowparam);
                          dsCashFlow.then(function (data, status, headers, config) {
                          var cashflowGrps =  _.partition(data,function(obj){
                                return obj.invest_action ==="Contributions";
                          });
                          //console.log(cashflowGrps);
                          var cashFlows=[];
                          var toals = [];
                          angular.forEach(cashflowGrps, function (element, key) {
                            var cashFlow = _.pluck(element,"tran_amount").map(function(obj){
                              return Math.abs(obj);
                            });
                            cashFlows.push(cashFlow);
                            var total = _.reduce(cashFlow, function(memo, num){ return memo + num; }, 0);
                            toals.push(Utility.getMVWithoutHTML(total) );

                          });
                          
                          $scope.cashflows  =cashFlows;
                          $scope.cashflowTotals  =toals;
                          $scope.scols  = ["Contributions","Withdrwals"];
                           
                          //console.log("here");



                        });










                        }

                  }]

    };
});
