$(document).ready(function(){
	var submitRouteButton = document.querySelector('.check-route-button');
	var startInput = document.querySelector('.start-input');
	var destinationInput = document.querySelector('.destination-input');

	function setLocation(e){
		e.preventDefault();
		sessionStorage.setItem('location', 'University+of+California+Irvine');
		window.location.href = "/savings.html";
	}

	submitRouteButton.addEventListener('click', setLocation);

	new google.maps.places.Autocomplete(startInput);
	new google.maps.places.Autocomplete(destinationInput);
});
