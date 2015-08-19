ddApp.controller('ClientCntrl', ['$window', '$templateCache','$rootScope', '$scope', '$location', 'appSetting', '$http', '$routeParams', 'popUpBlur', 'Utility', 'clMvSummaryFactory','RemoteData',
  function ($window,$templateCache, $rootScope, $scope, $location, appSetting, $http, $routeParams, popUpBlur, Utility, clMvSummaryFactory, RemoteData) {
      $templateCache.removeAll();
      $scope.ClientCode = $routeParams.ClientCode;
      $scope.contLen = null;
      $('#tabAnimation').css("opacity", "0");
      var allLi = $('#clmvtab li');
      $(allLi).find(".sactive").css("color", "silver");
      var liSelected = $('#clmvtab li:eq(0)');
      $(liSelected).find(".sactive").css("color", "black");
      $(liSelected).css("background-color", "rgba(236, 255, 241, 0.9)");
      //rgba(236, 255, 241, 0.9)

      $scope.strategyCols = ["Strategy","MV","",""];
      $scope.assetCols = ["Asset Class", "MV", "", ""];

      $rootScope.$on("something", function (event, data) {
          console.log("Got It");
      });














      $scope.tab = 1;

      $scope.isSet = function (checkTab) {
         // console.log(checkTab);
          return this.tab === checkTab;
      };

      $scope.setTab = function (activeTab) {
          //jQuery is used for animation only...
          var allLi = $('#clmvtab li');
          $(allLi).find("div").removeClass("bgTabNumActive");
          $(allLi).find("div").addClass("bgTabNum");
          $(allLi).find(".sactive").css("color", "silver");
          $(allLi).css("background-color", "rgba(255,255,255,.9)");
          var liSelected = $('#clmvtab li:eq(' + (activeTab - 1) + ')');
          $(liSelected).find("div").removeClass("bgTabNum");
          $(liSelected).find("div").addClass("bgTabNumActive");
          $(liSelected).find(".sactive").css("color", "black");
          $(liSelected).css("background-color", "rgba(236, 255, 241, 0.9)");
          var prevTabId = $scope.getTabId($scope.tab);
          var leftTabIncriment = 150 * Math.abs(this.tab-activeTab);
          if (this.tab > activeTab) leftTabIncriment = -150 * Math.abs(this.tab - activeTab);

          this.tab = activeTab;
          var currTabId = $scope.getTabId($scope.tab);



          $('#' + currTabId).css("opacity", "0");
          $('#' + currTabId).addClass("animateLableC");
            setTimeout(function () {
                $('#' + currTabId).css("opacity", "1");

                $('#' + currTabId).removeClass("animateLableC");
                $('#tabAnimation').css("opacity", "0");

            }, 701);
            $('#tabAnimation').css("opacity", "1");
            $("#tabAnimation").animate({

                left: "+=" + leftTabIncriment
            }, 701, function () {
                // Animation complete.
            });

          //Ends jQuery is used for animation only...


      };

      $scope.getTabId = function () {
          var tabId = "";
          if ($scope.tab == 1) tabId = "clientSummaryInner";
          if ($scope.tab == 2) tabId = "clientSummaryInnerStrategy";
          if ($scope.tab == 3) tabId = "clientSummaryInnerAccount";
          return tabId;
      } ;
      $scope.sort = {
          sortingOrder: 'startdateforSorting',
          reverse: false
      };
      $scope.popUp = function () {
          // var buildPath = "/ClientsDetails/" + $routeParams.ClientCode + "/" + $routeParams.asofdate + "/1212";
          var buildPath = "/Clients/" + $routeParams.ClientCode + "/" + $routeParams.asofdate + "/1212";
          //$location.path(buildPath);
          Avgrund.show("#clientDetailsPopUp");
          popUpBlur.blurContents("clientDetailsPopUp");
      }

      $rootScope.closeclientDetailsPopUp = function () {
          Avgrund.hide();
        //  $window.history.back();
           popUpBlur.clearContents();
      }

      if (typeof $routeParams.entityId !== "undefined") {
          Avgrund.show("#clientDetailsPopUp");

      }
      else {


          var objclMV;
          //Admin Service

          //adminSVR Promises
          var adminSvr = RemoteData.get(appSetting.svrurl + "/HoldingsService.svc/GetAdminClientDetails/" + $routeParams.ClientCode + "");
          //adminSvr.success(function (data, status, headers, config) {
          //                     $scope.clientsAdminData = data;


          //                     var activeObjectives = _.filter(data, function (el, i) {
          //                         return el.ObjectiveStatus == "Active"
          //                             || (el.ObjectiveStatus == 'Terminated'
          //                             && Date.parse(Utility.parseJSONDate(el.Objectivestatus_date)) > Date.parse($routeParams.asofdate));
          //                     });

          //                     $scope.activeObj = activeObjectives;
          //                     var contracts = _.groupBy(activeObjectives, 'ContractName');
          //                      objclMV = clMvSummaryFactory.populateMVData('Contracts', contracts);
          //                     //console.log(objclMV);
          //                      $scope.ContractSummary = objclMV.getDS();
          //                      $scope.contLen = $scope.ContractSummary.length;
          //})

          adminSvr.then(
                function (data, status, headers, config) {
                    {


                        $scope.clientsAdminData = data;


                        var activeObjectives = _.filter(data, function (el, i) {
                            return el.ObjectiveStatus == "Active"
                                || (el.ObjectiveStatus == 'Terminated'
                                && Date.parse(Utility.parseJSONDate(el.Objectivestatus_date)) > Date.parse($routeParams.asofdate));
                        });

                        $scope.activeObj = activeObjectives;
                        var contracts = _.groupBy(activeObjectives, 'ContractName');
                        objclMV = clMvSummaryFactory.populateMVData('Contracts', contracts);
                        //console.log(objclMV);
                        $scope.ContractSummary = objclMV.getDS();
                        $scope.contLen = $scope.ContractSummary.length;

                        if ($scope.clientsAdminData.length > 0) {
                            $scope.adminDS = $scope.clientsAdminData[0];
                        }
                        $rootScope.isLoaded = true;
                        var dataInput = {
                            "AsOfDate": $routeParams.asofdate,
                            "ClientCode": $routeParams.ClientCode
                        };


                        var dsMVSvr = RemoteData.post(appSetting.svrurl + "/HoldingsService.svc/GetClientAccts", dataInput);
                        //$http.post(appSetting.svrurl + "/HoldingsService.svc/GetClientAccts", JSON.stringify(dataInput)).
                        dsMVSvr.then(function (data, status, headers, config) {

                            var uniqueStrategyPre = _.filter(data, function (el, i) {
                                return el.DistributionEntity.acct_vehicle != "Participant"
                                && el.DistributionEntity.acct_vehicle != "Participant Hedge Funds"
                                && el.DistributionEntity.acct_vehicle != "Fund Based Balanced"
                                ;
                            });
                            angular.forEach(uniqueStrategyPre, function (element, key) {
                               // console.log(element.DistributionEntity);
                            })

                            var strategy = _.uniq(_.pluck(_.pluck(uniqueStrategyPre, "DistributionEntity"), "product_id"));
                            var assetClass = _.uniq(_.pluck(_.pluck(uniqueStrategyPre, "DistributionEntity"), "marketing_asset_class"));

                            var strategyDS = _.groupBy(_.pluck(uniqueStrategyPre, "DistributionEntity"), 'product_id');
                            var assetClassDS = _.groupBy(_.pluck(uniqueStrategyPre, "DistributionEntity"), 'marketing_asset_class');

                            $scope.strategyLen = strategy.length;
                            $scope.assetClassLen = assetClass.length;
                            objclMV.setDS(uniqueStrategyPre);


                            var objStr = clMvSummaryFactory.populateMVData('product_id', strategyDS);
                            objStr.setDS(uniqueStrategyPre);
                            $scope.StrategySummary = objStr.getDS();
                            var objAsset = clMvSummaryFactory.populateMVData('marketing_asset_class', assetClassDS);
                            objAsset.setDS(uniqueStrategyPre);

                            $scope.AssetSummary = objAsset.getDS();





                            //angular.forEach($scope.ContractSummary, function (element, key) {




                            //      var filterDS = _.filter(uniqueStrategyPre, function (el, i) {
                            //          return element['custodiancode']
                            //              .indexOf(el.DistributionEntity['parent_custodian_acct_no'] == null ?  el.DistributionEntity['custodian_acct_no'] : el.DistributionEntity['parent_custodian_acct_no']) > -1
                            //        ;
                            //      });

                            //      var acctVehicles = _.groupBy(_.pluck(filterDS, "DistributionEntity"), 'acct_vehicle');

                            //      var mv2 = _.pluck(acctVehicles['Commingled'], "base_mkt_val")
                            //          .concat(_.pluck(acctVehicles['Separately Managed'], "base_mkt_val"));

                            //      var totalMv2 = _.reduce(mv2, function (a, b) { return a + b; }, 0);
                            //      console.log(mv2);


                            //      var description = '';

                            //      if (acctVehicles['Commingled']!=null && acctVehicles['Commingled'].length > 0) description += acctVehicles['Commingled'].length + ' Commingled'
                            //      if (acctVehicles['Commingled'] != null && acctVehicles['Commingled'].length > 0 && acctVehicles['Separately Managed'] != null && acctVehicles['Separately Managed'].length > 0) description += ','
                            //      if (acctVehicles['Separately Managed'] != null&& acctVehicles['Separately Managed'].length > 0) description += acctVehicles['Separately Managed'].length + ' Separately Managed'
                            //       element.description = description;

                            //      //var mv=_.pluck(_.pluck(partcipants, "DistributionEntity"), "base_mkt_val")
                            //      //    .concat(_.pluck(_.pluck(smas, "DistributionEntity"), "base_mkt_val"));

                            //      //var totalMv = _.reduce(mv, function (a, b) { return a + b; }, 0);
                            //      var x = new UtilService;

                            //      element.mv = x.getMVNW(totalMv2);

                            //      //strategyLen assetClassLen
                            //      //3 Commingled,9 Separately Managed

                            //  });




                        })



                    }
            });


          var adminContactsSvr = RemoteData.get(appSetting.svrurl + "/HoldingsService.svc/GetAdminClientContacts/" + $routeParams.ClientCode + "");
          adminContactsSvr.then(function (data, status, headers, config) {
                               $scope.clientsContacts = data;
                               //console.log($scope.clientsContacts);



          })




          //this is for If User hits back button instead of Close button of PopUp Window
          var isPopUpOpen = $(".avgrund-active .avgrund-cover") ;
          if (isPopUpOpen.length>0) {
              Avgrund.hide();
              popUpBlur.clearContents();
          }
      }

  }]);
