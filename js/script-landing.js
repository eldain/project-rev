$(document).ready(function(){
	var submitRouteButton = document.querySelector('.check-route-button');
	var startInput = document.querySelector('.start-input');
	var destinationInput = document.querySelector('.destination-input');

	new google.maps.places.Autocomplete(startInput);
	new google.maps.places.Autocomplete(destinationInput);

	function setLocation(e){
		e.preventDefault();
		sessionStorage.setItem('location', 'University+of+California+Irvine');
		window.location.href = "/savings.html";
	}

	function setAddresses(){
		var startAddress = startInput.value.split(", ").join("+");
		var destinationAddress = destinationInput.value.split(", ").join("+");
		sessionStorage.setItem('startAddress', startAddress);
		sessionStorage.setItem('destinationAddress', destinationAddress);
	}

	submitRouteButton.addEventListener('click', () => {
		setLocation(event);
		setAddresses();
	});
});
