
ddApp.provider("appSetting", function () {

    var objArr = [];
    return {
        setObj: function (type, obj) {
            var objNew = { 'type': type, 'value': obj };
            objArr.push(objNew);
        } ,
        $get: function () {
            return {

                settings: objArr
                ,
                typehead: _.where(objArr, { type: "typeHeadList" })[0].value,
                svrurl: _.where(objArr, { type: "svrurl" })[0].value,
                asOfDate: _.where(objArr, { type: "asofDate" })[0].value,
                colors: _.where(objArr, { type: "colors" })[0].value,
                months: _.where(objArr, { type: "months" })[0].value


            };
        }
    };
});
