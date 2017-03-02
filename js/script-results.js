// Hard coded car data. In ideal world, would pull car data from a live source, but is outside the scope of this project (and class) for the time being
var gasVehicles = [
	{
	"manufacturer": "Honda",
	"model": "Accord",
	"msrp": 23000,
	"mpg": 32,
	"notes": "sedan"
	}
];
var electricVehicles = [
	{
		"manufacturer": 'BMW',
		"model": 'i3',
		"msrp": 48000,
		"mpg": 117,
		"notes": 'SUV'
	},
	{
		"manufacturer": 'Ford',
		"model": 'Focus Electric',
		"msrp": 29100,
		"mpg": 107,
		"notes": 'hatchback'
	},
	{
		"manufacturer": 'Fiat',
		"model": '500E',
		"msrp": 33900,
		"mpg": 115,
		"notes": '(really) compact car'
	},
	{
		"manufacturer": 'Nissan',
		"model": 'Leaf',
		"msrp": 36000,
		"mpg": 113,
		"notes": 'sedan'
	},
	{
		"manufacturer": 'Tesla',
		"model": 'S',
		"msrp": 69200,
		"mpg": 94,
		"notes": 'luxury sedan'
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
	// new google.maps.places.Autocomplete(startInputSavings);
	// new google.maps.places.Autocomplete(destinationInputSavings);

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
	function calculateSavings(){
		// distance * 2 (back and forth once a day) * X (number of times per week) * 52 weeks in a year * Y (number of years)
		// cent per mile for gas vehicles * distance calculation from above
		// cent per mile for eletric vehicle * distance calculation from above
		// subtract
	}
	// ------End Functions------


	// ------Start Function Calls and Event Listeners------
	var distance = getDistance();

	document.styleSheets[1].insertRule(`.first-panel-savings::after { background-image: url("${imageSource}"); }`, 0);

	commutesPerWeekInput.onchange=commutesPerWeekHandler;
	fullTankCostInput.onchange=fullTankCostHandler;
	// ------End Function Calls and Event Listeners------
});
