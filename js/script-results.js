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
	console.log(electricVehicles[0].model);

	var startInputSavings = document.querySelector('.start-input-savings');
	var destinationInputSavings = document.querySelector('.destination-input-savings');

	// console.log(startInputSavings, destinationInputSavings);

	new google.maps.places.Autocomplete(startInputSavings);
	new google.maps.places.Autocomplete(destinationInputSavings);

	var location = sessionStorage.getItem('location');
	var startAddress = sessionStorage.getItem('startAddress');
	var destinationAddress = sessionStorage.getItem('destinationAddress');
	// Should probably remove the start address and destination address after plugging them into API, that way we won't run into any weird errors when reassigning session variables
	// console.log(startAddress, destinationAddress);

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

		// getDistance();

	var imageSource = `http://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=11&size=960x960&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA`;

	document.styleSheets[1].insertRule(`.first-panel-savings::after { background-image: url("${imageSource}"); }`, 0);
});
