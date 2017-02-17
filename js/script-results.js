$(document).ready(function(){
	var location = sessionStorage.getItem('location');
	var startAddress = sessionStorage.getItem('startAddress');
	var destinationAddress = sessionStorage.getItem('destinationAddress');
	// Should probably remove the start address and destination address after plugging them into API, that way we won't run into any weird errors when reassigning session variables
	console.log(startAddress, destinationAddress);

	var distanceSource = `	http://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startAddress}&destinations=${destinationAddress}&key=AIzaSyDBBsE9Lyrdf3WeL1VST4Edc6WRauyIygA`;

	$.get( distanceSource, function( data ) {
		console.log(data);
	});

	var imageSource = `http://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=11&size=960x960&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA`;

	document.styleSheets[1].insertRule(`.first-panel-savings::after { background-image: url("${imageSource}"); }`, 0);
});
