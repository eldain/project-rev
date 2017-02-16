$(document).ready(function(){
	var location = sessionStorage.getItem('location');

	var imageSource = `https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=11&size=960x960&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA`;
	
	document.styleSheets[1].insertRule(`.first-panel-savings::after { background-image: url("${imageSource}"); }`, 0);
});
