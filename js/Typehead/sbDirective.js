ddApp.directive('typehead', function () {
    return {
        restrict: 'E',
        templateUrl: "partials/_sb.html"
        ,
        link: function(scope, element, attr) {
          $(document).on({
            mouseenter: function (e) {
                //stuff to do on mouse enter

                $(this).removeClass("margA");
                  $(".mainC1").removeClass("margA",1000);
                $(this).css({
                  zoom:1.1
                } );
              //stuff to do on mouse enter

              if($(this).attr("class").indexOf('marg')>-1 ){

                  $("this").addClass("margA");

                  var nextElement=$(this).next()[0];
                //  console.log(nextElement);
                    $(nextElement).addClass("margA");
                  //$("#"+id+" ~ .mainC2").addClass("margA");
              }
              else{
                  //console.log("HERE");
                 $(".mainC2:nth-child(2)").addClass("margA");
              }
            },
            mouseleave: function (e) {
                //stuff to do on mouse leave

                $(this).removeClass("margA");
                  $(".mainC1").removeClass("margA",1000);
                    $(this).css({
                      zoom:1
                    } );

            }
        }, ".mainC1"); //pass the element as an argument to .on



        }
        ,

        controller: ['$scope', '$location', '$routeParams',  'Utility', 'typeheadDSFactory', 'ApplicationLog', 'appSetting', '$http', 'RemoteData',
                  function ($scope, $location,$routeParams,  Utility, typeheadDSFactory, ApplicationLog, appSetting, $http, RemoteData) {

                            $scope.d3Chart=true;
                            $scope.selectedNumber = null;
                            $scope.modSuggestions = null;
                            $scope.historicalMVs = null;
                            $scope.bAsofDateMVBar = false;
                            $scope.selectedNumber = $routeParams.ClientCode!==undefined? $routeParams.ClientCode:'';
                            //console.log($location);
                            $scope.bSearch = true;

                            $location.baseHref = "/DDWebAngular/";
                             var objAsOfDate = appSetting.asOfDate;


                             //this is listner for Populing Search box value if User comes to page directly through URL
                             $scope.$on("populateSearchBoxValBasedOn",function(event,args){
                                if($location.path!==""){
                                //  console.log(args);
                                  $scope.selectedNumber =args.val;
                                }
                             })

                             $scope.$on("asofDateEventClick",function(event,args){

                                  var selectedNewDate=_.filter($scope.cleanData,function(obj){
                                        var effDate=new Date(obj.eff_date);
                                        var strEffDate=(effDate.getMonth()).toString()+"/" + effDate.getFullYear().toString();

                                        if(strEffDate.indexOf(args.join('/'))>-1){
                                              return true;
                                        }
                                        else{return false;}
                                  });

                                  var codeColumn="Clients";
                                  objAsOfDate.AsOfDate=selectedNewDate[0].eff_date.toString().split('/').join('-');
                                  var codeVal = $routeParams.ClientCode;
                                  $scope.populateBarGraph(codeColumn, codeVal);
                                  ApplicationLog.setAppLog(codeColumn,  codeVal, "jdhamecha");
                                  var buildPath = "/" + codeColumn + "/" + codeVal + "/" + selectedNewDate[0].eff_date.toString().split('/').join('-');
                                  console.log(buildPath);
                                  $location.path(buildPath);
                            })
                          //   $scope.emit("populateSearchBoxValBasedOn",{val:$scope.adminDS.ClientName});


                            var clients = new Bloodhound({
                                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                                queryTokenizer: Bloodhound.tokenizers.whitespace,
                                limit: 1000,
                                remote: appSetting.svrurl + '/HoldingsService.svc/GetClientValuesWithMV/Clients___%QUERY/' + objAsOfDate.AsOfDate,
                                // remote: appSetting.svrurl + '/HoldingsService.svc/GetClientValuesWithMV/Clients___%QUERY/11-30-2014' + GlobaldataInput.AsOfDate,
                            });
                            clients.initialize();
                            var hashtagSearch = new Bloodhound({
                                datumTokenizer: Bloodhound.tokenizers.obj.whitespace('value'),
                                queryTokenizer: Bloodhound.tokenizers.whitespace,
                                limit: 1000,
                                remote: appSetting.svrurl + '/HoldingsService.svc/HashTagSearch/%QUERY'

                            });
                            hashtagSearch.initialize();
                            var arrBloodhound = [];
                            var mainSearchDS = [
                                        {
                                            name: 'Clients',
                                            displayKey: 'value',
                                            source: clients.ttAdapter(),
                                            templates: {
                                                header: '<span id=clHeader class=headerDropDown><span  id=clientCounter>  </span> Clients - <span class=headerDropDownInner id=clientCounterMV>  </span> </span>',
                                               suggestion: Handlebars.compile('<p>{{value}} –  <span class=asColNum>{{marketValueDescriptionMod}}</span></p>')
                                            }
                                        },
                                        {
                                            name: 'Hashtag',
                                            displayKey: 'value',
                                            source: hashtagSearch.ttAdapter(),
                                            templates: {
                                                header: '<span  class=headerDropDown>Hashtag Search</span>',
                                                suggestion: Handlebars.compile('<p>{{value}}</p>')
                                            }
                                        }
                            ];
                            var DSPopulate = typeheadDSFactory.buildMainSearchDS(mainSearchDS, arrBloodhound);
                           // DSPopulate(GblService.getGobals().dataSourcesName);
                            DSPopulate(appSetting.typehead);
                            //console.log(appSetting);
                            $scope.searchDS = mainSearchDS;
                            var typeheadSearchDS = RemoteData.get(appSetting.svrurl + "/HoldingsService.svc/GetSearchData/" + objAsOfDate.AsOfDate);
                            typeheadSearchDS.then(function (typeheadDS) {
                                var dsList = appSetting.typehead;
                                  $scope.bSearch = false;
                                angular.forEach(dsList, function (element, keyouter) {

                                    angular.forEach(_.where(typeheadDS, { label: element.name }), function (element3, key) {

                                        arrBloodhound[keyouter].add(element3);
                                    });
                                });

                            });

                            $scope.$on('typeahead:selected', function (event, suggestion, dataset) {

                                ApplicationLog.setAppLog(suggestion.CodeColumn, dataset, "jdhamecha");
                                $scope.populateBarGraph(dataset, suggestion.CodeColumn);
                                var buildPath = "/" + dataset + "/" + suggestion.CodeColumn + "/" + objAsOfDate.AsOfDate;
                                 $location.path(buildPath);
                                 console.log( buildPath);
                                });




                           $scope.populateBarGraph = function (col, val) {
                                // $scope.historicalMVs = [{ AsofDate: '01/31/2015', mv: '24.5M' }, { AsofDate: '12/31/2014', mv: '24.1M' }, { AsofDate: '11/30/2014', mv: '14.5M' }];
                                $scope.bAsofDateMVBar = true;

                                if (col == "Clients") {
                                    var clientCodedataInput = {
                                        "label": val
                                    };
                                    var barPostDS = RemoteData.post(appSetting.svrurl + "/HoldingsService.svc/POSTclientMV", clientCodedataInput);
                                    barPostDS.then(function (data, status, headers, config) {
                                        $scope.historicalMVs = data;

                                        var cleanData=data.map(function(obj){
                                          var retObj=obj;
                                          retObj.eff_date = Utility.parseJSONDate(obj.eff_date);
                                          retObj.isActive= retObj.eff_date===$routeParams.asofdate.toString().split('-').join('/');
                                          return retObj;
                                        });

                                        var yearlyMvData=_.groupBy(cleanData,function(obj){
                                               var asofDate=new Date(obj.eff_date);
                                              return asofDate.getFullYear();
                                        });
                                        var mYearlyData = _.map( yearlyMvData,(function(obj,key){
                                          //console.log(obj);
                                          var retObj={};
                                          retObj.year=key;
                                        //  retObj.d3Outerid="d3_"+$index;
                                          retObj.d3Enid="mainU"+key;
                                          retObj.d3id="main"+key;
                                          retObj.vals=_.pluck(obj,"ClientMV");

                                          retObj.lables=retObj.vals.map(function(obj){
                                            return Utility.getMVWithoutHTML(obj);
                                          });
                                          //retObj.acitiveLabel=_.pluck(obj,"isActive");
                                          retObj.acitiveLabel=_.map(obj,function(o){
                                            if(o.isActive){
                                              return o.eff_date;
                                            }
                                            else {
                                              return '';
                                            }
                                          }).join("");

                                               //console.log(retObj);
                                          return retObj;
                                        }))
                                        ;
                                        $scope.cleanData=cleanData;
                                       //console.log(yearlyMvData);
                                        $scope.D3AsofDS=mYearlyData;


                                        var cmv = _.pluck(data, "ClientMV");
                                        // var cmvlables = _.pluck(data, "eff_date").map(function (asofdate,i) {
                                        //     if ( asofdate.indexOf('12/31') > -1)
                                        //     {
                                        //         var mv = Utility.getMVWithoutHTML(cmv[i]);
                                        //
                                        //         return  mv + '\n' +  asofdate ;
                                        //     }
                                        //     else
                                        //         {
                                        //         return asofdate   ;
                                        //     }
                                        // });
                                        var cmvlables = _.pluck(data, "eff_date").map(function (asofdate,i) {
                                          var dt=new Date(asofdate);
                                          ///console.log(dt.getMonth());
                                            if (dt.getMonth() > 10)
                                            {
                                                var mv = Utility.getMVWithoutHTML(cmv[i]);

                                                return  mv + '\n' +  asofdate ;
                                            }
                                            else
                                                {
                                                return asofdate   ;
                                            }
                                        });

                                        $("#chtClientMVs").html("");
                                        var rBar = Raphael("chtClientMVs", 700, 140);
                                        bc = rBar.barchart(40, 15, 650, 70, cmv, { type: "soft" });

                                        bc.animate({ 'scale': "3" }, 1000, "bounce");
                                        bc.label(cmvlables, false);

                                        var xText = bc.labels;




                                        //this is for MV Strategy Pie Chart
                                        var iPieClick = true;
                                        var icntBar = 0;
                                        $.each(bc.bars, function (iBar, elBar) {
                                            icntBar = icntBar + 1;
                                            if (icntBar % 2 == 0) {
                                                if (cmvlables[iBar].indexOf("12/31") > -1) {
                                                    bc.bars[iBar].attr({ fill: "rgba(0, 0, 0,.61)" });
                                                }
                                                else {
                                                     bc.bars[iBar].attr({ fill: "rgba(131, 159, 182,.2)" });
                                                }

                                            }
                                            else {
                                                if (cmvlables[iBar].indexOf("12/31") > -1) {
                                                    bc.bars[iBar].attr({ fill: "rgba(0, 0, 0,.61)" });
                                                }
                                                else {
                                                    bc.bars[iBar].attr({ fill: "rgba(211, 211, 211,.4)" });
                                                }

                                            }


                                            if (Utility.parseGLobalAsOfDate(cmvlables[iBar]) == Utility.parseGLobalAsOfDate(objAsOfDate.AsOfDate)) {
                                                //101/178/106

                                                // bc.bars[iBar].attr({ fill: "#65B26A" });
                                                bc.bars[iBar].attr({ fill: "rgba(101, 178, 106,1)" });
                                            }


                                        });



                                    })




                                }
                                else {

                                }

                           };


                      //this is for users directly coming with book mark/Refresh Button
                          if ($location.path().length > 0) {
                               $scope.populateBarGraph($location.path().split('/')[1], $location.path().split('/')[2]);
                            }
                                $scope.$on('typeahead:onDatasetRendered', function (event, suggestions) {
                                $scope.$emit('clienttypeaheadselected', suggestions, 0);
                                $scope.modSuggestions = suggestions;
                                var suggestionsCat=document.querySelectorAll(".tt-suggestions");
                                angular.forEach(suggestionsCat, function (element, key) {

                                    if (element.querySelectorAll(".tt-suggestion").length > 10)
                                    { element.classList.add("tt-suggestionslargerDS"); }
                                    else { element.classList.remove("tt-suggestionslargerDS"); }

                                });
                                var seriesData = _.pluck($scope.modSuggestions, 'marketValueDescription').map(function (mv) { return Number(mv); });
                                var searchSummaryElements = document.getElementsByClassName('sb');
                                var clResultLength = seriesData.length;

                                if (clResultLength > 1 && clResultLength < 11) {

                                    var classes = [];
                                    angular.forEach($scope.modSuggestions, function (element, key) {
                                        classes.push({ packageName: "Main", className: element.value, value: element.marketValueDescription });
                                    });





                                }


                            });

                            $scope.setValue = function () {
                                $scope.selectedNumber = { num: 'seven' };
                            };

                            $scope.clearValue = function () {
                                $scope.selectedNumber = null;
                            };


                            // Typeahead options object
                            $scope.exampleOptions = {
                                highlight: true
                            };


                            $scope.exampleOptionsNonEditable = {
                                highlight: true,
                                editable: false // the new feature
                            };

                  }],
        controllerAs: 'TypeheadCtrl'
    };
});
