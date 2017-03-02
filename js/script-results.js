// Hard coded car data. In ideal world, would pull car data from a live source, but is outside the scope of this project (and class) for the time being
var gasVehicles = [
	{
	"manufacturer": "Honda",
	"model": "Accord",
	"msrp": 23000,
	"mpg": 32,
    "capacity": ,
	"notes": "sedan"
	}
];
var electricVehicles = [
	{
		"manufacturer": 'BMW',
		"model": 'i3',
		"msrp": 48000,
		"mpge": 117,
        "range": 80,
		"notes": 'SUV'
	},
	{
		"manufacturer": 'Ford',
		"model": 'Focus Electric',
		"msrp": 29100,
		"mpge": 107,
        "range": 100,
		"notes": 'this is the baseline EV, hatchback'
	},
	{
		"manufacturer": 'Fiat',
		"model": '500E',
		"msrp": 33900,
		"mpge": 115,
        "range": 87,
		"notes": '(really) compact car'
	},
	{
		"manufacturer": 'Nissan',
		"model": 'Leaf',
		"msrp": 36000,
		"mpge": 113,
        "range": 107,
		"notes": 'sedan'
	},
	{
		"manufacturer": 'Tesla',
		"model": 'Model S',
		"msrp": 69200,
		"mpge": 94,
        "range": 210,
		"notes": 'luxury sedan'
	}
];

$(document).ready(function(){
	var startInputSavings = document.querySelector('.start-input-savings');
	var destinationInputSavings = document.querySelector('.destination-input-savings');
	var commutesPerWeek = document.querySelector('#commutes-per-week');
	var fullTankCost = document.querySelector('#fill-up-cost');

	commutesPerWeek.onchange=changeEventHandler;
	fullTankCost.onchange=changeEventHandler;

	function changeEventHandler(event) {
	    // You can use “this” to refer to the selected element.
	    if(!event.target.value) alert('Please Select One');
	    else console.log(event.target.value + ' trips per week / cost to fill up tank');
	}

	// Getting weird API error when trying to initialize these autocompletes
	// new google.maps.places.Autocomplete(startInputSavings);
	// new google.maps.places.Autocomplete(destinationInputSavings);

	var location = sessionStorage.getItem('location');
	var startAddress = sessionStorage.getItem('startAddress');
	var destinationAddress = sessionStorage.getItem('destinationAddress');
	// Should probably remove the start address and destination address after plugging them into API, that way we won't run into any weird errors when reassigning session variables
	console.log(startAddress, destinationAddress);

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
	            // console.log(response);
							console.log("The distance is: " + response.rows[0].elements[0].distance.text);
	        }
	    });
	  }

	getDistance();

	var imageSource = `http://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=11&size=960x960&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA`;
	document.styleSheets[1].insertRule(`.first-panel-savings::after { background-image: url("${imageSource}"); }`, 0);
});
