ddApp.directive('uiSwitch', ['$window', '$timeout','$log', '$parse', function($window, $timeout, $log, $parse) {
return {
          require: 'ngModel',
          restrict: 'AE',
          scope : {initValue : '=ngModel'},
          link: function(scope, elem, attrs, ngModel) {
            //    console.log(elem);
                if(!ngModel) return false;
                var options = {};
                try {
                    options = $parse(attrs.uiSwitch)(scope);
                }
                catch (e) {}
                var switcher;
                var previousDisabledValue;
                // Watch for attribute changes to recreate the switch if the 'disabled' attribute changes
                attrs.$observe('disabled', function(value) {
                  //  console.log("test Directive");
                  if (value == undefined || value == previousDisabledValue) {
                    return;
                  } else {
                    previousDisabledValue = value;
                  }
                  initializeSwitch();
                });



                function initializeSwitch() {
                  $timeout(function() {
                    // Remove any old switcher
                    if (switcher) {
                      angular.element(switcher.switcher).remove();
                    }
                    // (re)create switcher to reflect latest state of the checkbox element
                    switcher = new $window.Switchery(elem[0], options);
                    var element = switcher.element;
                    element.checked = scope.initValue;
                    switcher.setPosition(false);
              //      console.log(element);


                    element.addEventListener('change',function(evt) {
                //        console.log(element);
                      scope.$apply(function() {
                          ngModel.$setViewValue(element.checked);
                        })
                    })
                  }, 0);
                }
                initializeSwitch();
              }
      }
  }]);
