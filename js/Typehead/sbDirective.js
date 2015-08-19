ddApp.directive('typehead', function () {
    return {
        restrict: 'E',
        templateUrl: "partials/_sb.html"
        ,
        link: function(scope, element, attr) {
          $(".mainC2").hover(function () {
              d3AsOfMouseLeave(this);
              $(this).css({
                zoom:1.1
              } );
            //stuff to do on mouse enter
            if($(this).attr("class").indexOf('marg')>-1 ){

                $("this").addClass("margA");
                var id= $(this).attr("id");
                console.log($("#"+id+" ~ .mainC2")[0]);
                var nextElement=$("#"+id+" ~ .mainC2")[0];
                  $(nextElement).addClass("margA");
                //$("#"+id+" ~ .mainC2").addClass("margA");
            }
            else{
               $(".mainC2:nth-child(2)").addClass("margA");
            }
          },
          function () {
            $(this).css({
              zoom:1
            } );
                d3AsOfMouseLeave(this);
              });

        }
        ,

        controller: ['$scope', '$location',   'Utility', 'typeheadDSFactory', 'ApplicationLog', 'appSetting', '$http', 'RemoteData',
                  function ($scope, $location,  Utility, typeheadDSFactory, ApplicationLog, appSetting, $http, RemoteData) {

                            $scope.d3Chart=true;
                            $scope.selectedNumber = null;
                            $scope.modSuggestions = null;
                            $scope.historicalMVs = null;
                            $scope.bAsofDateMVBar = false;

                            $location.baseHref = "/DDWebAngular/";
                            console.log($location);


                            var objAsOfDate = appSetting.asOfDate;



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
                            //Create instance of Factory To populate Data from async service

                            //var eventName = "mainSearchBoxDataPopulated";

                            //typeheadDSFactory.getRemoteData(appSetting.svrurl + "/HoldingsService.svc/GetSearchData/" + objAsOfDate.AsOfDate, eventName);


                            var typeheadSearchDS = RemoteData.get(appSetting.svrurl + "/HoldingsService.svc/GetSearchData/" + objAsOfDate.AsOfDate);
                            typeheadSearchDS.then(function (typeheadDS) {
                                var dsList = appSetting.typehead;

                                angular.forEach(dsList, function (element, keyouter) {

                                    angular.forEach(_.where(typeheadDS, { label: element.name }), function (element3, key) {

                                        arrBloodhound[keyouter].add(element3);
                                    });
                                });

                            });


                            //$scope.$on( eventName, function (event, typeheadDS) {
                            //    console.log(typeheadDS);
                            //    var dsList = appSetting.typehead;

                            //        angular.forEach(dsList, function (element, keyouter) {
                            //            angular.forEach(_.where(typeheadDS, { label: element.name }), function (element, key) {
                            //                    arrBloodhound[keyouter].add(element);
                            //            });
                            //        });
                            //     });

                            $scope.$on('typeahead:selected', function (event, suggestion, dataset) {

                                ApplicationLog.setAppLog(suggestion.CodeColumn, dataset, "jdhamecha");
                                $scope.populateBarGraph(dataset, suggestion.CodeColumn);
                                var buildPath = "/" + dataset + "/" + suggestion.CodeColumn + "/" + objAsOfDate.AsOfDate;
                                //console.log(buildPath);
                                //console.log(dataset);

                                //console.log(suggestion.CodeColumn);



                                console.log($location);
                                $location.path(buildPath);




                            });



                           $scope.populateBarGraph = function (col, val) {
                                // $scope.historicalMVs = [{ AsofDate: '01/31/2015', mv: '24.5M' }, { AsofDate: '12/31/2014', mv: '24.1M' }, { AsofDate: '11/30/2014', mv: '14.5M' }];
                                $scope.bAsofDateMVBar = true;
                                console.log("Hre");
                                if (col == "Clients") {
                                    var clientCodedataInput = {
                                        "label": val
                                    };
                                    var barPostDS = RemoteData.post(appSetting.svrurl + "/HoldingsService.svc/POSTclientMV", clientCodedataInput);
                                    barPostDS.then(function (data, status, headers, config) {
                                        $scope.historicalMVs = data;
                                        var cmv = _.pluck(data, "ClientMV");
                                        var cmvlables = _.pluck(data, "eff_date").map(function (asofdate,i) {
                                            if (Utility.parseJSONDate(asofdate).indexOf('12/31') > -1)
                                            {
                                                var mv = Utility.getMVWithoutHTML(cmv[i]);

                                                return  mv + '\n' + Utility.parseJSONDate(asofdate);
                                            }
                                            else
                                                {
                                                return Utility.parseJSONDate(asofdate)  ;
                                            }
                                        });


                                        $("#chtClientMVs").html("");
                                        var rBar = Raphael("chtClientMVs", 700, 80);
                                        bc = rBar.barchart(40, 15, 650, 70, cmv, { type: "soft" });

                                        bc.animate({ 'scale': "3" }, 1000, "bounce");
                                        bc.label(cmvlables, false);

                                        var xText = bc.labels;
                                        console.log(bc.labels.length);




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
                               //console.log($location.path());
                               //console.log($location.path().split('/')[1]);
                               $scope.populateBarGraph($location.path().split('/')[1], $location.path().split('/')[2]);
                               // populateBarGraph($location.path().split('/')[1], $location.path().split('/')[2]);

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

                                //angular.forEach(searchSummaryElements, function (element, key) {
                                //    element.innerHTML = "";

                                //    var  aEl = angular.element(element);
                                //    aEl.addClass('emptySearchBox');
                                //});

                                //var aEl = angular.element(document.querySelector('#container'));
                                //aEl.removeClass('show_hide');

                                var clResultLength = seriesData.length;

                                if (clResultLength > 1 && clResultLength < 11) {
                                    //var seriesLabels = _.pluck($scope.modSuggestions, 'value');
                                    //var chartWidth = 380 + (25 * seriesData.length);
                                    //var aEl = angular.element(document.querySelector('#clientSearchSB'));
                                    //aEl.removeClass('emptySearchBox');
                                    //var chart = new Highcharts.Chart({
                                    //    chart: {  renderTo: 'clientSearchSB', width: chartWidth, backgroundColor: "transparent", type: 'bubble' },
                                    //    title: { text: '', x: -20   },
                                    //    subtitle: {  text: 'Search Results-Clients', x: -20   },
                                    //    legend: {  enabled: false  },
                                    //    xAxis: { categories: seriesLabels, labels: {  align: 'right',  style: {  fontSize: '10px',  fontFamily: 'Helvetica, sans-serif' } } },
                                    //    yAxis: { min: 0, max: Math.max.apply(Math, seriesData), title: {   text: '' },  labels: { enabled: false  } },
                                    //    plotOptions: { column: {  pointPadding: 0.2, borderWidth: 0 } },
                                    //    tooltip: {  enabled: false },
                                    //     series: [{  name: 'Clients',  data: seriesData  }]
                                    //});


                                    var classes = [];
                                    angular.forEach($scope.modSuggestions, function (element, key) {
                                        classes.push({ packageName: "Main", className: element.value, value: element.marketValueDescription });
                                    });





                                }




                                // $scope.selectedNumber = suggestions;

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
