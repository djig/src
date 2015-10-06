
  describe("A suite is just a function", function() {
    var a;

    it("and so is a spec", function() {
      a = true;

      expect(a).toBe(true);
    });
  });
  describe("ddApp", function() {
    var scope,
    controller ;

    beforeEach(function () {
        module('ddApp');
    });
    describe('SimpleController', function () {
      beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();

            controller = $controller('SimpleController', {
                '$scope': scope
            });

        }));
        it("contains spec with an expectation", function() {
            expect(scope.isTriggered).toBe(true);
            });

      });
  //  it('should have a mailctrl', inject(function($rootScope, $controller) {
  //    }));
});



 describe("ddApp", function() {
     var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('ddApp');
        inject(function($injector){
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');
            
            $httpBackend.when('GET', 'partials/_cPage.html').respond('Clients');
            
            //console.log($location);
          });

    });
     it('Client route Testing', function(){
    // navigate using $apply to safely run the $digest cycle
          $location.path("/Clients/CHRLSWB/06-30-2015");
          $scope = $rootScope.$new();
        //  console.log($scope);
          $scope.$apply()
         
           // expect($location.path()).toBe('/Clients/CHRLSWB/06-30-2015');
            expect($route.current.templateUrl).toBe('partials/_cPage.html');
            expect($route.current.controller).toBe('ClientCntrl');
          })
          
  //  it('should have a mailctrl', inject(function($rootScope, $controller) {
  //    }));
});

describe("ddApp", function() {
     var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('ddApp');
        inject(function($injector){
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');
            
            $httpBackend.when('GET', 'partials/_cPage.html').respond('Clients');
            
            //console.log($location);
          });

    });
     it('RM route Testing', function(){
    // navigate using $apply to safely run the $digest cycle
          $location.path("/Clients/DavidDirks/06-30-2015");
          $scope = $rootScope.$new();
        //  console.log($scope);
          $scope.$apply()
         
           // expect($location.path()).toBe('/Clients/CHRLSWB/06-30-2015');
            expect($route.current.templateUrl).toBe('partials/_cRMPage.html');
            expect($route.current.controller).toBe('ClientRMCSRCntrl');
          })
          
  //  it('should have a mailctrl', inject(function($rootScope, $controller) {
  //    }));
});

describe("ddApp", function() {
     var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('ddApp');
        inject(function($injector){
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');
            
            $httpBackend.when('GET', 'partials/_cPage.html').respond('Clients');
            
            //console.log($location);
          });

<<<<<<< HEAD
=======
describe("ddApp", function() {
     var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('ddApp');
        inject(function($injector){
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');
            
            $httpBackend.when('GET', 'partials/_cRMPage.html').respond('Clients');
            
            //console.log($location);
          });

    });
     it('RM route Testing', function(){
    // navigate using $apply to safely run the $digest cycle
          $location.path("/Clients/DavidDirks/06-30-2015");
          $scope = $rootScope.$new();
        //  console.log($scope);
          $scope.$apply()
         
           // expect($location.path()).toBe('/Clients/CHRLSWB/06-30-2015');
            expect($route.current.templateUrl).toBe('partials/_cRMPage.html');
            expect($route.current.controller).toBe('ClientRMCSRCntrl');
          })
          
  //  it('should have a mailctrl', inject(function($rootScope, $controller) {
  //    }));
});

describe("ddApp", function() {
     var $route, $rootScope, $location, $httpBackend;

    beforeEach(function () {
        module('ddApp');
        inject(function($injector){
            $route = $injector.get('$route');
            $rootScope = $injector.get('$rootScope');
            $location = $injector.get('$location');
            $httpBackend = $injector.get('$httpBackend');
            
            $httpBackend.when('GET', 'partials/_cSecPage.html').respond('Clients');
            
            //console.log($location);
          });

>>>>>>> origin/master
    });
     it('RM route Testing', function(){
    // navigate using $apply to safely run the $digest cycle
          $location.path("/Clients/EDLF0109122/06-30-2015");
          $scope = $rootScope.$new();
        //  console.log($scope);
          $scope.$apply()
         
           // expect($location.path()).toBe('/Clients/CHRLSWB/06-30-2015');
            expect($route.current.templateUrl).toBe('partials/_cSecPage.html');
            expect($route.current.controller).toBe('ClientSecCntrl');
          })
          
  //  it('should have a mailctrl', inject(function($rootScope, $controller) {
  //    }));
});
<<<<<<< HEAD
=======


>>>>>>> origin/master




   describe("ddApp", function() {
    var scope,
    controller ;

    beforeEach(function () {
        module('ddApp');
    });
    describe('ClientCntrl', function () {
      beforeEach(inject(function ($rootScope, $controller ) {
            scope = $rootScope.$new();

            controller = $controller('ClientCntrl', {
                '$scope': scope
            });

        }));
        it("ClientCntrl Test", function() {


            expect(scope.strategyCols.length).toBe(4);
            });

      });
  //  it('should have a mailctrl', inject(function($rootScope, $controller) {
  //    }));
});

