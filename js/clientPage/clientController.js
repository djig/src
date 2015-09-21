ddApp.controller('ClientCntrl', ['$window', '$templateCache','$rootScope', '$scope', '$location', 'appSetting', '$http', '$routeParams', 'popUpBlur', 'Utility', 'clMvSummaryFactory','RemoteData',
  function ($window,$templateCache, $rootScope, $scope, $location, appSetting, $http, $routeParams, popUpBlur, Utility, clMvSummaryFactory, RemoteData) {
      $templateCache.removeAll();
      $scope.ClientCode = $routeParams.ClientCode;
      $scope.contLen = null;
      $scope.bData=false;
      $scope.contacts  = {
          all: false,
          primary: true,
          DFE: false,
          billing: false,
          authorized: false
        };

      $('#tabAnimation').css("opacity", "0");
      var allLi = $('#clmvtab li');
      $(allLi).find(".sactive").css("color", "silver");
      var liSelected = $('#clmvtab li:eq(0)');
      $(liSelected).find(".sactive").css("color", "black");
      $(liSelected).css("background-color", "rgba(236, 255, 241, 0.9)");
      //rgba(236, 255, 241, 0.9)

      $scope.strategyCols = ["Strategy","MV","",""];
      $scope.assetCols = ["Asset Class", "MV", "", ""];



      $scope.asofdate=$routeParams.asofdate;

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

        ///  console.log($scope.tab);

          var filterVals=arguments[1].split("-");

          var filteredAccts=_.filter($scope.accounts,function(obj){
                var innerFS = _.filter(filterVals, function(filterVal){
                  if($scope.tab===1){
                    return filterVal===obj.DistributionEntity.parent_custodian_acct_no
                    ||filterVal===obj.DistributionEntity.custodian_acct_no
                    ;
                    }
                  else   if($scope.tab===2){
                    return filterVal===obj.DistributionEntity.product_id;
                  }
                  else{
                    return filterVal===obj.DistributionEntity.marketing_asset_class;
                  }

                });
                return  innerFS.length !== 0 ;
            //return arguments[1].toString().indexOf(obj.DistributionEntity.parent_custodian_acct_no)>-1  ;
          })


        //  console.log(filteredAccts);


          $scope.filteredaccounts=filteredAccts.map(function(obj){
              var retObj=obj;
              for(var i=0;i<obj.FeeStructure.length;i++){
                obj.FeeStructure[i].tierstartWithMV= Utility.getMVWithoutHTML(obj.FeeStructure[i].tierstart);
                obj.FeeStructure[i].tierendWithMV= Utility.getMVWithoutHTML(obj.FeeStructure[i].tierend);
              }
          //    retObj.FeeStructure.tierstart= Utility.getMVWithoutHTML(retObj.FeeStructure.tierstart);
            //  retObj.FeeStructure.tierend= Utility.getMVWithoutHTML(retObj.FeeStructure.tierend);
              return retObj;
          }) ;

        //  console.log($scope.filteredaccounts);
          Avgrund.show("#clientDetailsPopUp");
          var svgLine = d3.select("#d3Navline").append("svg")
             .attr("width", 720)
             .attr("height", 700);
          var dr = 2200;

          console.log( $( $(arguments[0].toElement).parent().parent().parent()[0]).height()  );
          var xintial=angular.element(arguments[0]).prop('clientX')-angular.element(arguments[0]).prop('offsetX');
          var yinitial = angular.element(arguments[0]).prop('clientY')-angular.element(arguments[0]).prop('offsetY');

          var ln = svgLine.append("line")
                              .attr("x1", xintial+30 )
                              .attr("y1", yinitial-20)
                             .attr("x2", angular.element(arguments[0]).prop('clientX')-200)
                            .attr("y2",  angular.element(arguments[0]).prop('clientY')-20)
                            .attr("stroke", 'rgba(0,255,0,.8)')
                           .attr("stroke-width", 0)
                           .transition()
                            .duration(function (d) {
                              return dr;
                            })
                            .attr("x2", angular.element("#clientDetailsPopUp").prop('offsetLeft')-50)
                           .attr("y2",  angular.element("#clientDetailsPopUp").prop('offsetTop')+50)
                           .attr("stroke-width", 1)
                            ;
              var rowElement= $(arguments[0].toElement).parent().parent().parent()[0];
              var rectHeight=$(rowElement).height();
              var rectWidth=$(rowElement).width();
             var rectangle = svgLine.append("rect")
                              .attr("x", xintial-220)
                              .attr("y", yinitial-20)
                             .attr("width", 0)
                             .attr("height", 0)
                             .attr("fill", function (d) {
                                return "rgba(0,0,0,0)";
                              })
                             .attr("stroke-width", 1)
                             .transition()
                              .duration(function (d) {
                                return dr;
                              })
                              .attr("width", rectWidth-30)
                              .attr("height", rectHeight+7)
                             .attr("stroke", 'rgba(0,255,0,.8 )')
                            .attr("stroke-width", 1)

                             ;

              //  console.log(xintial);
                //  console.log( angular.element("#clientDetailsPopUp").prop('offsetLeft')-50);
            $(".container").animate({
              'margin-left':"100px"
            },500);

            $(".avgrund-cover").addClass("moveLeftContent");
            //
            console.log($(".container").width()*.8);

            $("#clientDetailsPopUp").width($(".container").width()*.8);
          //  console.log(angular.element("#clientDetailsPopUp"));
          //console.log(angular.element(arguments[0]).prop('clientX'));
          //console.log(angular.element(arguments[0]).prop('clientY'));
        //   console.log(angular.element($event.target));
        //  popUpBlur.blurContents("clientDetailsPopUp");
      }




      $rootScope.closeclientDetailsPopUp = function () {
          Avgrund.hide();
          document.getElementById('d3Navline').innerHTML = '';

        $(".container").css({'margin-left':''});
        //  $(".container").removeClass("moveLeftContent");
        //  $window.history.back();
           //popUpBlur.clearContents();
      }



      if (typeof $routeParams.entityId !== "undefined") {
          Avgrund.show("#clientDetailsPopUp");

      }
      else {


          var objclMV;
          //Admin Service


        var dsClientLevels = RemoteData.post(appSetting.svrurl + "/HoldingsService.svc/POSTAdminClientLevels", {label:$routeParams.ClientCode});
          dsClientLevels.then(function (data, status, headers, config) {
             $scope.watch_list_rank=data[0].watch_list_rank;
             $scope.client_tier_level=data[0].client_tier_level;
          });

          var dsrSvr = RemoteData.get(appSetting.svrurl + "/HoldingsService.svc/GetDSR/" + $routeParams.ClientCode + "/12-31-2014");
            dsrSvr.then(
              function(data,status,headers,config){
                console.log(data[0]);
                $scope.DSR=data[0].Fullname;
              }
            );
          //adminSVR Promises
          var adminSvr = RemoteData.get(appSetting.svrurl + "/HoldingsService.svc/GetAdminClientDetails/" + $routeParams.ClientCode + "");


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
                        //console.log($scope.ContractSummary);
                        $scope.contLen = $scope.ContractSummary.length;

                        if ($scope.clientsAdminData.length > 0) {
                            $scope.adminDS = $scope.clientsAdminData[0];
                            //console.log($scope.adminDS);
                             $scope.$emit("populateSearchBoxValBasedOn",{val:$scope.adminDS.ClientName});
                        }
                        $rootScope.isLoaded = true;
                        var dataInput = {
                            "AsOfDate": $routeParams.asofdate,
                            "ClientCode": $routeParams.ClientCode
                        };


                        var dsMVSvr = RemoteData.post(appSetting.svrurl + "/HoldingsService.svc/GetClientAccts", dataInput);
                        //$http.post(appSetting.svrurl + "/HoldingsService.svc/GetClientAccts", JSON.stringify(dataInput)).
                        dsMVSvr.then(function (data, status, headers, config) {
                            $scope.bData=true;
                            var uniqueStrategyPre = _.filter(data, function (el, i) {
                                return el.DistributionEntity.acct_vehicle != "Participant"
                                && el.DistributionEntity.acct_vehicle != "Participant Hedge Funds"
                                && el.DistributionEntity.acct_vehicle != "Fund Based Balanced"
                                ;
                            });
                            angular.forEach(uniqueStrategyPre, function (element, key) {
                               // console.log(element.DistributionEntity);
                            })
                            console.log(uniqueStrategyPre);
                            $scope.accounts=uniqueStrategyPre.map(function(obj){
                              var retObj=obj;
                              retObj.DistributionEntity.acct_inception_date=Utility.parseJSONDate(retObj.DistributionEntity.acct_inception_date);
                              retObj.DistributionEntity.mv=Utility.getMVWithoutHTML(retObj.DistributionEntity.base_mkt_val);
                              return retObj;
                            });
                              var arrMV=_.pluck(_.pluck(uniqueStrategyPre, "DistributionEntity"), "base_mkt_val")
                                        .map(function(obj){
                                          return Number(obj) ;
                                        });

                            $scope.totalMV= Utility.getMVWithoutHTML( _.reduce(arrMV, function(a, b){ return a + b; }, 0));
                              //  console.log(  $scope.totalMV);
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






                        })



                    }
            });


          var adminContactsSvr = RemoteData.get(appSetting.svrurl + "/HoldingsService.svc/GetAdminClientContacts/" + $routeParams.ClientCode + "");
          adminContactsSvr.then(function (data, status, headers, config) {
                               $scope.clientsContacts = data;


          })




          //this is for If User hits back button instead of Close button of PopUp Window
          var isPopUpOpen = $(".avgrund-active .avgrund-cover") ;
          if (isPopUpOpen.length>0) {
              Avgrund.hide();
              popUpBlur.clearContents();
          }
      }

  }]);
