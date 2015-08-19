
ddApp.config(
    function ($routeProvider, $locationProvider,$provide ) {
        // var dsList = GblService.getGobals().dataSourcesName;



        $routeProvider
            .when('/Clients/:ClientCode/:asofdate', {
                templateUrl: 'partials/_cPage.html',
                controller: 'ClientCntrl'
            })
            .when('/Clients/:ClientCode/:asofdate/:entityId', {
                templateUrl: 'partials/_cPage.html',
                controller: 'ClientCntrl'
            })

            ;
            console.log($locationProvider)

        //  $locationProvider.html5Mode(true);
          // $provide.decorator('$sniffer', function($delegate) {
          //   $delegate.history = false;
          //   return $delegate;
          // });


 });
