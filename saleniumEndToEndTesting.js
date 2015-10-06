var webdriver = require('selenium-webdriver') ;

var flow = webdriver.promise.controlFlow(),
   num = 0,
   start = Date.now();
var driver ;

flow.execute(function() {
 console.log('a');
   driver = new webdriver.Builder().
    withCapabilities(webdriver.Capabilities.chrome()).
    build();
    var  ddAppWindow = driver.get('http://10.13.65.69/DDWebAngularQA/home.html');


}).then(function() {

	 flow.execute(function() {
	   driver.findElement(webdriver.By.css(".searchBox .tt-input")).sendKeys('Verizon Investment Management Corporation');

	 }).then(function() {

	 		 	setTimeout(function(){
					driver.findElement(webdriver.By.css(".searchBox .tt-suggestion")).click();

					setTimeout(function(){
							driver.findElement(webdriver.By.css(".searchBox .tt-suggestion")).click();
				  
					 	},2000);
					 
				  
					 },2000);
					 
				 
	 			
			  
		});;
});

 