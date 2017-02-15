$(document).ready(function(){
	console.log("test");
	var imageSource = "https://maps.googleapis.com/maps/api/staticmap?center=University+of+California+Irvine&zoom=12&size=640x640&key=AIzaSyD4u8OfeiUVGO3leigttTSnvFSgDznwZtA";
	$(".third-panel img").attr("src", imageSource);
});
