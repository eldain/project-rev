$(document).ready(function(){
	var submitRouteButton = document.querySelector('.check-route-button');
	var startInput = document.querySelector('.start-input');
	var destinationInput = document.querySelector('.destination-input');

	new google.maps.places.Autocomplete(startInput);
	new google.maps.places.Autocomplete(destinationInput);

	// This would grab mid point and pass it along for background image on next page, probably not worth the time and energy though
	// function setLocation(e){
	// 	e.preventDefault();
	// 	sessionStorage.setItem('location', 'University+of+California+Irvine');
	// }

	function setAddresses(e){
		e.preventDefault();
		var startAddress = startInput.value.split(", ").join("+");
		var destinationAddress = destinationInput.value.split(", ").join("+");
		sessionStorage.setItem('startAddress', startAddress);
		sessionStorage.setItem('destinationAddress', destinationAddress);
	}

	function nextPageCheck(){
		if(startInput.value === "" || destinationInput.value === ""){
			submitRouteButton.classList.remove("bg-green");
			submitRouteButton.classList.add("bg-red");
		} else window.location.href = "/savings.html";
	}

	submitRouteButton.addEventListener('click', () => {
		setAddresses(event);
		nextPageCheck();
	});
});
