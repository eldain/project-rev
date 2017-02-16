$(document).ready(function(){
	var submitRouteButton = document.querySelector('.check-route-button');

	function setLocation(e){
		e.preventDefault();
		sessionStorage.setItem('location', 'University+of+California+Irvine');
		window.location.href = "/savings.html";
	}

	submitRouteButton.addEventListener('click', setLocation);
});
