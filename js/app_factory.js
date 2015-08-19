/* 
        Name        :_appFactory.js
        purpose     : All Factories
        Date        : 02/05/2015
*/
//TypeHead JS Related 


ddApp.factory("typeheadDSFactory", ['$http', '$rootScope', 'ApplicationLog', function ($http, $rootScope, ApplicationLog) {
    var typeheadDSFactory = {};
    //typeheadDSFactory.getRemoteData = function (serviceURL,eventName ) {
    //    $http.get(serviceURL).
    //                    success(function (data, status, headers, config) {
    //                        ApplicationLog.setAppLog(" Remote Data ", eventName, "jdhamecha");
    //                        $rootScope.$broadcast( eventName, data);
    //                    }).
    //                    error(function (data, status, headers, config) {
    //                        ApplicationLog.setAppLog(" Error Remote Data ", eventName +': Error Status Code'+ status, "jdhamecha");
    //                    });
         
    //}
    typeheadDSFactory.buildMainSearchDS = function (arrDS, arrBloodhound) {
            return function (arr) {
            angular.forEach(arr, function (element, key) {
                var bDs = new Bloodhound({
                    datumTokenizer: function (d) { return Bloodhound.tokenizers.whitespace(d.value); },
                    queryTokenizer: Bloodhound.tokenizers.whitespace,
                    limit: 1000,
                    local: []
                });
                bDs.initialize();
                var dsObj = {
                    name: element.name,
                    templates: {
                        header: '<span  class=headerDropDown><span  id=' + element.name + '_Counter>  </span>  ' + element.title + ' </span> </span>'
                    },
                    displayKey: 'value',
                    source: bDs.ttAdapter()   // Note the nba Bloodhound engine isn't really defined here.
                };
                arrBloodhound.push(bDs);
                arrDS.push(dsObj);
            });
        }
    }



    return typeheadDSFactory;
}]);


ddApp.factory('RemoteData', ['$http', '$q', 'ApplicationLog', function ($http, $q, ApplicationLog) {
    var getRemoteData = {};
    return {
        
        post: function (serviceURL, dataInput) {
           // return $http.post(serviceURL, JSON.stringify(dataInput));
            var def = $q.defer();
            $http.post(serviceURL, JSON.stringify(dataInput)).success(function (data) {
                def.resolve(data);
                ApplicationLog.setAppLogPost(serviceURL + '' + JSON.stringify(dataInput), "Post", "jdhamecha");
            }).error(function (data, status, headers, config) {
                ApplicationLog.setAppLogPost(' Error Status Code' + status, "Post Service Call", "jdhamecha");
                      
            });
            return def.promise;
       },
        get: function (serviceURL) {
            var def = $q.defer();
            $http.get(serviceURL).success(function (data) {
                def.resolve(data);
                ApplicationLog.setAppLogPost(serviceURL, "GET Service Call", "jdhamecha");
            }).error(function () {
                ApplicationLog.setAppLogPost(serviceURL + ' Error Status Code' + status, "Get", "jdhamecha");
               });
            return def.promise;
        },
    }
}]);



//Client MV Summary

ddApp.factory("clMvSummaryFactory", ['Utility', function (Utility) {
    var clMvSummaryFactory = {};
  

    clMvSummaryFactory.populateMVData = function (category, dataSet) {
        var objArrContractSummary = [];
        angular.forEach(dataSet, function (element, key) {

            var objCSSummary = {};
            objCSSummary.name = key;
            if (category == "Contracts") {
                objCSSummary.startdateforSorting = Date.parse(Utility.parseJSONDate(element[0].ICStartDate));
                objCSSummary.startdate = Utility.parseJSONDate(element[0].ICStartDate) == '01/01/3000' ? '' : Utility.parseJSONDate(element[0].ICStartDate);
                objCSSummary.custodiancode = _.pluck(element, 'AcctNum').toString().replace(/,/g, '-');;
            }
            objCSSummary.mv = '';
            objCSSummary.description = '';
           // objCSSummary.custodiancode = _.pluck(element, 'AcctNum').toString().replace(/,/g, '-');;
            objArrContractSummary.push(objCSSummary);
            //return objArrContractSummary

        });

        return {
        setDS: function (dataset2) {

                angular.forEach( objArrContractSummary, function (element, key) {

                //console.log(element);
                var filterDS;

                

                if (category == "Contracts") {
                    filterDS = _.filter(dataset2, function (el, i) {
                        return element['custodiancode']
                            .indexOf(el.DistributionEntity['parent_custodian_acct_no'] == null ? el.DistributionEntity['custodian_acct_no'] : el.DistributionEntity['parent_custodian_acct_no']) > -1
                        ;
                    });
                }
                else {
                    filterDS = _.filter(dataset2, function (el, i) {
                        return element.name
                            .indexOf(el.DistributionEntity[category]) > -1
                        ;
                    });
                }


                //console.log(filterDS);
                var acctVehicles = _.groupBy(_.pluck(filterDS, "DistributionEntity"), 'acct_vehicle');

                var mv2 = _.pluck(acctVehicles['Commingled'], "base_mkt_val")
                    .concat(_.pluck(acctVehicles['Separately Managed'], "base_mkt_val"));

                var totalMv2 = _.reduce(mv2, function (a, b) { return a + b; }, 0);
                // console.log(mv2);


                var description = '';

                if (acctVehicles['Commingled'] != null && acctVehicles['Commingled'].length > 0) description += acctVehicles['Commingled'].length + ' Commingled'
                if (acctVehicles['Commingled'] != null && acctVehicles['Commingled'].length > 0 && acctVehicles['Separately Managed'] != null && acctVehicles['Separately Managed'].length > 0) description += ','
                if (acctVehicles['Separately Managed'] != null && acctVehicles['Separately Managed'].length > 0) description += acctVehicles['Separately Managed'].length + ' Separately Managed'
                element.description = description;

                //var mv=_.pluck(_.pluck(partcipants, "DistributionEntity"), "base_mkt_val")
                //    .concat(_.pluck(_.pluck(smas, "DistributionEntity"), "base_mkt_val"));

                //var totalMv = _.reduce(mv, function (a, b) { return a + b; }, 0);
                var x = new UtilService;

                element.mv = x.getMVNW(totalMv2);

                //strategyLen assetClassLen
                //3 Commingled,9 Separately Managed

            });
             
         },
        getDS: function () {
                return objArrContractSummary;
         }
        }

    }
    return clMvSummaryFactory;
} ]);




//AsOfDate Bar Graph 


ddApp.factory("asofdateBarGraph", ['ApplicationLog', function (ApplicationLogg) {
        var asofdateBarGraph = {};

        asofdateBarGraph.historicalMV = function (baseUrl, column, value) {
       
        }
        return clMvSummaryFactory;
}]);
///Cleaning Up PopUp
ddApp.factory("popUpBlur", function () {
    var popUpBlurfactory = {};
    popUpBlurfactory.blurContents = function (popUpId) {
        var contenntDivs = $('.avgrund-contents').find('*');
        angular.forEach(contenntDivs, function (element, key) {
            if (element.id !== "clientDetailsPopUp") {
                $(element).addClass('customBlur');
            }
        });
        var popupcontenntDivs = $('#clientDetailsPopUp *');
        removeBlur(popupcontenntDivs);
        $('#viewcontainer').removeClass('customBlur');;
    

    }
    popUpBlurfactory.clearContents = function () {
        var contenntDivs = $('.avgrund-contents').find('*');
        removeBlur(contenntDivs);
        //angular.forEach(contenntDivs, function (element, key) {
        //     $(element).removeClass('customBlur');
        //});
        //..
    }

      function removeBlur(contenntDivs) {
        
        angular.forEach(contenntDivs, function (element, key) {
            $(element).removeClass('customBlur');
        });
        //..
    }

    return popUpBlurfactory;

});

