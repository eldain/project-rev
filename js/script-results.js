$(document).ready(function(){
	var location = sessionStorage.getItem('location');
	var imageSource = 'https://maps.googleapis.com/maps/api/staticmap?center=${location}&zoom=4&size=640x640&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA';
	$(".third-panel img").attr("src", imageSource);
});
