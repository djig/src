ddApp.directive('hcCol', function() {
  return {
  		require: ['^clientAdmin'],
      restrict: 'EA',
      scope: { 
      	dataset: '=',
          series:  '=',
          totals : '=',
           
          options: '='
      },
      templateUrl: "partials/_highChartBar.html",
  
        link: function(scope, element, attr) {
        	

        	  scope.$watch( "dataset",
                        function( newValue ) {
                        	console.log(newValue);
                        	if(newValue!==undefined){
                             initilize();
                        	}

                        }
                    );




        	  function initilize(){



		        	var dseries = [];
		            var gValues = [];
		             
		           var seriesCols = scope.series ===undefined?[""]:scope.series ;
		           var dataset   = scope.dataset;
		           var totals  = scope.totals  ;
		           
		            var options  = scope.options ===undefined?["width:500,height:300"]:scope.options ;
		            var colorsPallete  = options.colorsPallete   ;
		            var cwidth=options.width;
		            var cheight=options.height;
		            
		         	var xAxisLables=[];
		         	
		            angular.forEach(seriesCols, function (elementInner, key) {
		            	var values = scope.dataset[key];
		            	
		            	

		            	var obj = {
		                     name: '<B>' + totals[key] + '</B><br>   ' + elementInner,
		                    data: values,
		                    color: colorsPallete[key],
		                     dataLabels: {
			                         
			                    
			                        style: {
			                            fontSize: '9px',
			                            fontFamily: 'Helvetica, sans-serif' 
			                        }

		                         
		             
		                }
		            }
		               // console.log(obj);
		               dseries.push(obj);
		            });
		            
		        	 var hightChart = $(element).highcharts({
		                chart: {
		                    type: 'column',
		                    width:cwidth,
		                    height:cheight,
		                    backgroundColor:'rgba(255, 255, 255, 0.1)'
		                },

		                legend: {
		                    align: 'center',
		                    verticalAlign: 'bottom',

		                    x: 0,
		                    y: 10,
		                    itemStyle: {
		                        fontSize: '9px',
		                        fontFamily: 'Helvetica, sans-serif'
		                    },
		                    enabled: true
		                },
		                colors: colorsPallete,
		                title: {
					            text: ' '
					        },
					        subtitle: {
					            text: ' '
					        },
					        xAxis: {
					           
					        },
					        yAxis: {
					            min: 0,
					            title: {
					                text: ''
					            }
					        },

		                plotOptions: {
		                    column: {
		                        pointPadding: 0.1,
		                        borderRadius: 2,
		                        //borderColor: "blue",
		                        shadow: true,
		                        borderWidth: 0
		                    },
		                    series: {
		                        cursor: 'pointer',

		                        point: {
		                            events: {

		                                click: function() {
		                                     console.log('Category: ' + this.category + ', value: ' + this.y);
		                                    //PopulateCashFlowPopup(this.category, dataInput,modeofload);
		                                }
		                           
		                            }
		                        },
		                       
		                    }
		                },
		                tooltip: {
		                    enabled: false
		                },

		                series: dseries

		            //      [{
						        //     name: 'Tokyo',
						        //     data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

						        // }, {
						        //     name: 'New York',
						        //     data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

						        // }, {
						        //     name: 'London',
						        //     data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

						        // }, {
						        //     name: 'Berlin',
						        //     data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

						        // }]
		            });

 
       		 	} //Function Initilize
		}  //link


	 };
});//Directive