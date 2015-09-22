/*!

	Author: Jignesh Dhamecha
    Date : 02/10/2015
	Purpose : Application Level Angular JS Services.
*/

//Utility : THis is to make sure UtilService is available for TypeheadBundle.js code...Which is jQUery code.
function UtilService() {

    this.sortJSON = function (data, key) {
        return data.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    
    this.RowsAnimationWithDuration = function (count, divrows, Duration, maxcnt) {
        count = 0;
        var divROws = $(divrows);
        (function step() {
            $(divROws[count]).css({ opacity: 1 });
            try {
                $(divROws[count]).find(".asColNum").addClass("animateScaleExpROWMV");
            }
            catch (exception) {
            }
            $(divROws[count]).addClass("animateScaleExpROWDetails");

            //if (count-- > 0) {
            //    setTimeout(step, 100);
            //}
            //console.log(count);
            //console.log(divrows);
            if (count++ < maxcnt) {
                setTimeout(step, Duration);
            }

        })();
    }
    this.RowsAnimation = function (count, divrows) {
        count = 0;
        var divROws = $(divrows);
        (function step() {
            $(divROws[count]).css({ opacity: 1 });
            $(divROws[count]).find(".asColNum").addClass("animateScaleExpROWMV");
            $(divROws[count]).addClass("animateScaleExpROWDetails");

            //if (count-- > 0) {
            //    setTimeout(step, 100);
            //}
            //console.log(count);
            if (count++ < divrows.length) {
                setTimeout(step, 300);
            }

        })();
    }

    this.parseGLobalAsOfDate = function (date) {

        var sDate = new Date(date);

        var month = sDate.getMonth() + 1;
        var day = sDate.getDate();
        var year = sDate.getFullYear();
        var smonth, sday;
        if (month < 10) { smonth = "0" + month }
        else { smonth = month };
        if (day < 10) { sday = "0" + day }
        else { sday = day };
        //  console.log(date);
        return smonth + "-" + sday + "-" + year
    }



    this.SetRMPieCharLabel = function () {
        $.each(pieStrategySummary.labels, function (iLabel, eLabel) {

            eLabel.attr({ "font-size": 11 });
            eLabel.attr({ "font-family": "'Helvetica', sans-serif" });

        });
        $.each(pieSummary.labels, function (iLabel, eLabel) {

            eLabel.attr({ "font-size": 11 });
            eLabel.attr({ "font-family": "'Helvetica', sans-serif" });

        });
    }


    this.SetPieCharLabel = function () {
        $.each(pieValueEntity.labels, function (iLabel, eLabel) {

            eLabel.attr({ "font-size": 11 });
            eLabel.attr({ "font-family": "'Helvetica', sans-serif" });

        });
        $.each(pie.labels, function (iLabel, eLabel) {

            eLabel.attr({ "font-size": 11 });
            eLabel.attr({ "font-family": "'Helvetica', sans-serif" });

        });
    }



    this.labelBarChart = function (r, bc, labels) {

        $.each(bc.bars, function (i, v) {
            //for (var i = 0; i < bc.bars.length; i++) {
            var bar = bc.bars[i];

            var gutter_y = bar.w * 0.4;
            var label_x = bar.x
            var label_y = bar.y + bar.h + gutter_y - 10;


            var label_text = labels[i];

            var label_attr = { fill: "#2f69bf", font: "12px Helvetica" };

            if (bc.bars.length > 5 && i % 2 == 0) {
                label_attr = { fill: "#2f69bf", font: "12px Helvetica", opacity: 0 };
            }
            r.text(label_x, label_y, label_text).attr(label_attr).toBack();
            v.attr('opacity', 0.1);
            v.animate({
                opacity: 1
            }, 2000);
        });

    }

    function numberFormat(Mv) {

        var num = Mv.toString().split(".");

        num[0] = num[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return num.join(".");
    }


    this.getMVNW = function (MV) {
        //var strMV = '$'
        var strMV = ''
        if (Math.abs(MV) > 1000000000) {
            //strMV = strMV + '' + parseFloat(Math.abs(MV) / 1000000000).toFixed(3) + 'B'
            strMV = strMV + '' + formatNW(MV, 1000000000) + 'B'
        }
        else if (Math.abs(MV) > 1000000) {
            strMV = strMV + '' + formatNW(MV, 1000000) + 'MM'
        }
        else if (Math.abs(MV) > 1000) {
            strMV = strMV + '' + formatNW(MV, 1) + ''
        }
        else {
            strMV = strMV + '' + formatNW(MV, 1) + ''
        }


        return '$' + strMV
    }

    function formatNW(MV, d) {

        if (MV < 0) {
            return ' (' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(3)) + ")";
        }
        else {
            return '' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(3)) + "";
        }


    }



    this.getMV = function (MV) {
        //var strMV = '$'
        var strMV = ''
        if (Math.abs(MV) > 1000000000) {
            //strMV = strMV + '' + parseFloat(Math.abs(MV) / 1000000000).toFixed(3) + 'B'
            strMV = strMV + '' + format(MV, 1000000000) + 'B'
        }
        else if (Math.abs(MV) > 1000000) {
            strMV = strMV + '' + format(MV, 1000000) + 'MM'
        }
        else if (Math.abs(MV) > 1000) {
            strMV = strMV + '' + format(MV, 1) + ''
        }
        else {
            strMV = strMV + '' + format(MV, 1) + ''
        }


        return '$' + strMV
    }

    function format(MV, d) {

        if (MV < 0) {
            return '<span class=asColNum>(' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(3)) + ")</span>";
        }
        else {
            return '<span class=asColNum>' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(3)) + "</span>";
        }


    }


    this.getMVWhite = function (MV) {

        var strMV = ''
        if (Math.abs(MV) > 1000000000) {

            strMV = strMV + '' + formatWhite(MV, 1000000000) + 'B'
        }
        else if (Math.abs(MV) > formatWhite) {
            strMV = strMV + '' + format(MV, 1000000) + 'MM'
        }
        else if (Math.abs(MV) > 1000) {
            strMV = strMV + '' + formatWhite(MV, 1) + ''
        }
        else {
            strMV = strMV + '' + formatWhite(MV, 1) + ''
        }


        return '$' + strMV
    }

    this.formatWhite = function (MV, d) {

        if (MV < 0) {
            return '<span class=asColNumWhite>(' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(3)) + ")</span>";
        }
        else {
            return '<span class=asColNumWhite>' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(3)) + "</span>";
        }


    }




    this.getRevenue = function (MV) {
        //var strMV = '$'
        var strMV = ''
        if (Math.abs(MV) > 1000000000) {
            //strMV = strMV + '' + parseFloat(Math.abs(MV) / 1000000000).toFixed(3) + 'B'
            strMV = strMV + '' + formatRevenue(MV, 1000000000, 3) + 'B'
        }
        else if (Math.abs(MV) > 1000000) {
            strMV = strMV + '' + formatRevenue(MV, 1000000, 3) + 'MM'
        }
        else if (Math.abs(MV) > 1000) {
            strMV = strMV + '' + formatRevenue(MV, 1, 0) + ''
        }
        else {
            strMV = strMV + '' + formatRevenue(MV, 1, 0) + ''
        }


        return '$' + strMV
    }

    function formatRevenue(MV, d, p) {

        if (MV < 0) {
            return '<span class=asColNum>(' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(p)) + ")</span>";
        }
        else {
            return '<span class=asColNum>' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(p)) + "</span>";
        }


    }



    this.getTier = function (MV) {
        //var strMV = '$'
        var strMV = ''
        if (Math.abs(MV) > 1000000000) {
            //strMV = strMV + '' + parseFloat(Math.abs(MV) / 1000000000).toFixed(3) + 'B'
            strMV = strMV + '' + formatTier(MV, 1000000000) + 'B'
        }
        else if (Math.abs(MV) > 1000000) {
            strMV = strMV + '' + formatTier(MV, 1000000) + 'MM'
        }
            //else if (Math.abs(MV) > 1000) {
            //    strMV = strMV + '' + formatTier(MV, 1) + ''
            //}
        else {
            strMV = strMV + '' + formatTier(MV, 1) + ''
        }


        return '$' + strMV
    }


    function formatTier(MV, d) {

        if (MV < 0) {
            return '<span class=asColNum>(' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(0)) + ")</span>";
        }
        else {
            return '<span class=asColNum>' + numberFormat(parseFloat(Math.abs(MV) / d).toFixed(0)) + "</span>";
        }


    }

    this.getMVWithoutHTML = function (MV) {
        //var strMV = '$'
        var strMV = ''
        if (Math.abs(MV) > 1000000000) {
            //strMV = strMV + '' + parseFloat(Math.abs(MV) / 1000000000).toFixed(3) + 'B'
            strMV = strMV + '' + parseFloat(MV / 1000000000).toFixed(3) + 'B'
        }
        else if (Math.abs(MV) > 1000000) {
            strMV = strMV + '' + parseFloat(MV / 1000000).toFixed(3) + 'MM'
        }
            //else if (Math.abs(MV) > 1000) {
            //    strMV = strMV + '' + parseFloat(MV / 1000).toFixed(3) + ''
            //}
        else {
            strMV = strMV + '' + parseFloat(MV / 1).toFixed(3) + ''
        }


        return '$' + strMV
    }

    this.parseJSONDate = function (jsonDate) {
        var date = jsonDate;
        var substringedDate = date.substring(6);
        var parsedIntDate = parseInt(substringedDate);
        var sDate = new Date(parsedIntDate);

        var month = sDate.getMonth() + 1;
        var day = sDate.getDate();
        var year = sDate.getFullYear();
        var smonth, sday;
        if (month < 10) { smonth = "0" + month }
        else { smonth = month };
        if (day < 10) { sday = "0" + day }
        else { sday = day };

        return smonth + "/" + sday + "/" + year
    }


}
ddApp.service("Utility", UtilService);

//Logging Message to Sever using Service(REST).And using Angular log service to output message on client also.
ddApp.service("ApplicationLog", ['$log', '$http', 'appSetting', function ($log, $http, appSetting) {
    var appbaselogURL = appSetting.svrurl + '/HoldingsService.svc/AppLoginfo/';
    this.setAppLog = function (message, typeoflog, uid) {
        var applogURL = appbaselogURL + uid + '/' + encodeURIComponent(typeoflog) + '/' + encodeURIComponent(message) + "";
        $http.get(applogURL)
            .success(function (data, status, headers, config) {
                $log.log(applogURL + ":Successfully Logged on Sever, Status:" + status);
                return status;
            }).
            error(function (data, status, headers, config) {
                $log.error(applogURL + ":Error, Status:" + status);
                return status;
            });
    }

    var appbaselogPostURL = appSetting.svrurl + '/HoldingsService.svc/AppLoginfoPOST';
    this.setAppLogPost = function (message, typeoflog, uid) {

        var data = {
            ipaddress: '' + uid,
            typeofmessage: '' + typeoflog,
            message :''+message

        }


        $http.post(appbaselogPostURL, JSON.stringify(data))
            .success(function (data, status, headers, config) {
                $log.log(appbaselogPostURL + ":Successfully Logged on Sever, Status:" + status);
                return status;
            }).
            error(function (data, status, headers, config) {
                $log.error(appbaselogPostURL + ":Error, Status:" + status);
                return status;
            });
    }

}]);
