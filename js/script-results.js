$(document).ready(function(){
	var startInputSavings = document.querySelector('.start-input-savings');
	var destinationInputSavings = document.querySelector('.destination-input-savings');

	console.log(startInputSavings, destinationInputSavings);

	new google.maps.places.Autocomplete(startInputSavings);
	new google.maps.places.Autocomplete(destinationInputSavings);

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

		// getDistance();

	var imageSource = `http://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=11&size=960x960&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA`;

	document.styleSheets[1].insertRule(`.first-panel-savings::after { background-image: url("${imageSource}"); }`, 0);
});
