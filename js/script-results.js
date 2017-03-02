// Hard coded car data. In ideal world, would pull car data from a live source, but is outside the scope of this project (and class) for the time being
var gasVehicles = [
	{
	"manufacturer": "Honda",
	"model": "Accord",
	"msrp": 23000,
    "monthlylease": 575,
	"mpg": 32,
    "capacity": 396, //12.4G tank capacity x 32MPG = 396.8 miles
    "link": 'http://automobiles.honda.com/civic-sedan',
	"notes": "sedan"
	}
];
var electricVehicles = [
	{
		"manufacturer": 'BMW',
		"model": 'i3',
		"msrp": 48000,
        "monthlylease": 575,
		"mpge": 117,
        "range": 80,
        "link": 'https://www.bmwusa.com/vehicles/bmwi.html',
		"notes": 'SUV'
	},
	{
		"manufacturer": 'Ford',
		"model": 'Focus Electric',
		"msrp": 29100,
        "monthlylease": 423,
		"mpge": 107,
        "range": 100,
        "link": 'http://www.ford.com/cars/focus/2017/models/focus-electric/',
		"notes": 'this is the baseline EV, hatchback'
	},
	{
		"manufacturer": 'Fiat',
		"model": '500E',
		"msrp": 33900,
        "monthlylease": 444,
		"mpge": 115,
        "range": 87,
        "link": 'http://www.fiatusa.com/en/500e/',
		"notes": '(really) compact car'
	},
	{
		"manufacturer": 'Nissan',
		"model": 'Leaf',
		"msrp": 36000,
        "monthlylease": 273,
		"mpge": 113,
        "range": 107,
        "link": 'https://www.nissanusa.com/electric-cars/leaf/',
		"notes": 'sedan'
	},
	{
		"manufacturer": 'Tesla',
		"model": 'Model S',
		"msrp": 69200,
        "monthlylease": 974,
		"mpge": 94,
        "range": 210,
        "link": 'https://www.tesla.com/models',
		"notes": 'luxury sedan'
	}
];
var prices = [
	{
		"gasPrice": 2.284, // National Average Gas Price as of 2/15/2017
		"electricityPrice": 0.12 // kWH - National average of 12 cents that the EPA uses on its fuel economy label for EVs
	}
];

$(document).ready(function(){
	// ------Start Variables------
	var startInputSavings = document.querySelector('.start-input-savings');
	var destinationInputSavings = document.querySelector('.destination-input-savings');
	var commutesPerWeekInput = document.querySelector('#commutes-per-week');
	var fullTankCostInput = document.querySelector('#fill-up-cost');

	// Should probably remove the start address and destination address after plugging them into API, that way we won't run into any weird errors when reassigning session variables
	var location = sessionStorage.getItem('location');
	var startAddress = sessionStorage.getItem('startAddress');
	var destinationAddress = sessionStorage.getItem('destinationAddress');

	// Getting weird API error when trying to initialize these autocompletes
	new google.maps.places.Autocomplete(startInputSavings);
	new google.maps.places.Autocomplete(destinationInputSavings);

	var commutesPerWeek;
	var fullTankCost;

	var imageSource = `http://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=11&size=960x960&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA`;
	// ------End Variables------

	// ------Start Functions------
	function commutesPerWeekHandler(event) {
	    // You can use “this” to refer to the selected element.
	    if(!event.target.value) alert('Please Select One');
	    else commutesPerWeek = event.target.value;
	}
	function fullTankCostHandler(event){
		// You can use “this” to refer to the selected element.
		if(!event.target.value) alert('Please Select One');
		else fullTankCost = event.target.value;
	}
	function getDistance()
	  {
	     //Find the distance
	     var distanceService = new google.maps.DistanceMatrixService();
	     distanceService.getDistanceMatrix({
	        origins: [startAddress],
	        destinations: [destinationAddress],
	        travelMode: google.maps.TravelMode.DRIVING,
	        unitSystem: google.maps.UnitSystem.IMPERIAL,
	        durationInTraffic: true,
	        avoidHighways: false,
	        avoidTolls: false
	    },
	    function (response, status) {
	        if (status !== google.maps.DistanceMatrixStatus.OK) {
	            console.log('Error:', status);
	        } else {
							console.log("The distance is: " + response.rows[0].elements[0].distance.text);
							return response.rows[0].elements[0].distance.text;
	        }
	    });
	  }
		function calculateSavings(distance){
			console.log(distance);
			let gasCost = prices[0]["gasPrice"]; // per gallon
			let electricityPrice = prices[0]["electricityPrice"]; // per kWH
			let totalMiles = distance * 2  * 52 * 10; // * commutesPerWeek
			// let gasCost = totalMiles * gasVehicles[0]["capacity"]
			console.log(gasCost, electricityPrice, totalMiles);
			// distance * 2 (back and forth once a day) * X (number of times per week) * 52 weeks in a year * Y (number of years)
			// cent per mile for gas vehicles * distance calculation from above
			// cent per mile for eletric vehicle * distance calculation from above
			// subtract
			// cost of tank / range of tank * total miles
		}
	// ------End Functions------


	// ------Start Function Calls and Event Listeners------
	var distance = getDistance();

	document.styleSheets[1].insertRule(`.first-panel-savings::after { background-image: url("${imageSource}"); }`, 0);

	commutesPerWeekInput.onchange=commutesPerWeekHandler;
	fullTankCostInput.onchange=fullTankCostHandler;
	// ------End Function Calls and Event Listeners------
});
