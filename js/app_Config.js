ddApp.config(function (appSettingProvider) {
 var ddList = [
             { name: 'ClientTier', title: 'Client Tier' }
               ,
            { name: 'WatchList', title: 'WatchList' },
            { name: 'CSR', title: 'Client Service Rep.' },
            { name: 'RM', title: 'Relationship Manager' },
             { name: 'DSR', title: 'Distribution Support' },
            { name: 'Consultant', title: 'Consultants' },
             { name: 'Fund', title: 'Fund Name' },
             { name: 'Custodian', title: 'Custodian Code' },
             { name: 'EQPM', title: 'EQ Portfolio Manager' },
              { name: 'FIPM', title: 'FI Portfolio Manager' },
            { name: 'PortiaAcctName', title: 'Portia AccountName' },
            { name: 'Portiasymbol', title: 'Portia Symbol' }
    ];
    appSettingProvider.setObj('typeHeadList', ddList);
    appSettingProvider.setObj('svrurl', "http://10.13.65.69/DDservice");
   var dtData = {
        "AsOfDate": "04-30-2015",//always calculate last month end(t+5 rule apply) Best thing is get from Holdings Database
        "AsOfDateGet": "2015-04-30"
    };
    appSettingProvider.setObj('asofDate', dtData);
 var appcolors = [
              "RGBA(131,159,182,.9)",
                   "RGBA(101,178,106,.99)",

                   " RGBA(0, 123, 131, .99)",
                   "RGBA(131, 159, 182, 1)",
                   "RGBA(0,123,183,1)",
                   "RGBA(94,181,184,1)",


                   "RGBA(0,111,81,.99)",


                   " RGBA(90, 124, 194, .9)",
                   "RGBA(141, 182, 145, 1)",
                   "RGBA(213,225,242,1)",
                   "RGBA(56,72,0,1)",
                   "RGBA(139, 69, 19, 1)",
                   "RGBA(30, 144, 255, .6)",
                   "RGBA(139, 34, 82, .6)",
                   "RGBA(18, 42, 76, .9)",
                   "RGBA(159,182,205,.6)",
                   "RGBA(190, 0, 50, .8)",
                   "RGBA(101,178,106,.99)",

                   " RGBA(0, 123, 131, .99)",
                   "RGBA(131, 159, 182, 1)",
                   "RGBA(0,123,183,1)",
                   "RGBA(94,181,184,1)",


                   "RGBA(0,111,81,.99)",


                   " RGBA(90, 124, 194, .9)",
                   "RGBA(141, 182, 145, 1)",
                   "RGBA(213,225,242,1)",
                   "RGBA(56,72,0,1)",
                   "RGBA(139, 69, 19, 1)",
                   "RGBA(30, 144, 255, .6)",
                   "RGBA(139, 34, 82, .6)",
                   "RGBA(18, 42, 76, .9)",
                   "RGBA(101,178,106,.99)",

                   " RGBA(0, 123, 131, .99)",
                   "RGBA(131, 159, 182, 1)",
                   "RGBA(0,123,183,1)",
                   "RGBA(94,181,184,1)",


                   "RGBA(0,111,81,.99)",


                   " RGBA(90, 124, 194, .9)",
                   "RGBA(141, 182, 145, 1)",
                   "RGBA(213,225,242,1)",
                   "RGBA(56,72,0,1)",
                   "RGBA(139, 69, 19, 1)",
                   "RGBA(30, 144, 255, .6)",
                   "RGBA(139, 34, 82, .6)",
                   "RGBA(18, 42, 76, .9)"
    ]
    appSettingProvider.setObj('colors', appcolors);


    var gmonth = new Array();
    gmonth[0] = "Jan";
    gmonth[1] = "Feb";
    gmonth[2] = "Mar";
    gmonth[3] = "Apr";
    gmonth[4] = "May";
    gmonth[5] = "Jun";
    gmonth[6] = "Jul";
    gmonth[7] = "Aug";
    gmonth[8] = "Sep";
    gmonth[9] = "Oct";
    gmonth[10] = "Nov";
    gmonth[11] = "Dec";

    appSettingProvider.setObj('months', gmonth);





});
