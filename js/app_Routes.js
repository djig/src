
ddApp.config(
    function ($routeProvider, $locationProvider,$provide ) {
        // var dsList = GblService.getGobals().dataSourcesName;
        $routeProvider
            .when('/Clients/:ClientCode/:asofdate', {
                templateUrl: 'partials/_cPage.html',
                controller: 'ClientCntrl'
            })
            .when('/Clients/:ClientCode/:asofdate/:entityId', {
                templateUrl: 'partials/_cAcPage.html',//account details
                controller: 'ClientCntrl'
            })
             .when('/Clients/:RMCSRCode/:asofdate/', {
                templateUrl: 'partials/_cRMPage.html',
                controller: 'ClientRMCSRCntrl'
            })
            .when('/Clients/:SecurityCode/:asofdate', {
                templateUrl: 'partials/_cSecPage.html',
                controller: 'ClientSecCntrl'
            })
            .otherwise({
                    redirectTo: '/'// landing search page
                });
            ;
          //  console.log($locationProvider)

        //  $locationProvider.html5Mode(true);
          // $provide.decorator('$sniffer', function($delegate) {
          //   $delegate.history = false;
          //   return $delegate;
          // });


 });
