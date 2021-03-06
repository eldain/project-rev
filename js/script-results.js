// Hard coded car data. In ideal world, would pull car data from a live source, but is outside the scope of this project (and class) for the time being
var gasVehicles = [
	{
	"manufacturer": "Honda",
	"model": "Accord",
	"msrp": 23000,
    "monthlylease": 575,
	"mpg": 32,
    "range": 396, //12.4G tank capacity x 32MPG = 396.8 miles
		"tankcapacity": 12.4,
    "link": 'http://automobiles.honda.com/civic-sedan',
	"notes": "sedan"
	}
];
var electricVehicles = [
	{
		"manufacturer": 'BMW',
		"model": 'i3',
		"msrp": 48000,
        "monthlylease": 575,
		"mpge": 117,
        "range": 80, //mi
        "batterycapacity": 33, //kWh
        "link": 'https://www.bmwusa.com/vehicles/bmwi.html',
		"notes": 'SUV'
	},
	{
		"manufacturer": 'Ford',
		"model": 'Focus Electric',
		"msrp": 29100,
        "monthlylease": 423,
		"mpge": 107,
        "range": 100, //mi
        "batterycapacity": 33.5, //kWh
        "link": 'http://www.ford.com/cars/focus/2017/models/focus-electric/',
		"notes": 'this is the baseline EV, hatchback'
	},
	{
		"manufacturer": 'Fiat',
		"model": '500E',
		"msrp": 33900,
        "monthlylease": 444,
		"mpge": 115,
        "range": 87, //mi
        "batterycapacity": 24, //kWh
        "link": 'http://www.fiatusa.com/en/500e/',
		"notes": '(really) compact car'
	},
	{
		"manufacturer": 'Nissan',
		"model": 'Leaf',
		"msrp": 36000,
        "monthlylease": 273,
		"mpge": 113,
        "range": 107, //mi
        "batterycapacity": 30, //kWh
        "link": 'https://www.nissanusa.com/electric-cars/leaf/',
		"notes": 'sedan'
	},
	{
		"manufacturer": 'Tesla',
		"model": 'Model S',
		"msrp": 69200,
        "monthlylease": 974,
		"mpge": 94,
        "range": 210, //mi
        "batterycapacity": 85, //kWh
        "link": 'https://www.tesla.com/models',
		"notes": 'luxury sedan'
	}
];
// var prices = [
// 	{
// 		"gasPrice": 2.284, // National Average Gas Price as of 2/15/2017
// 		"electricityPrice": 0.12 // kWH - National average of 12 cents that the EPA uses on its fuel economy label for EVs
// 	}
// ];

$(document).ready(function(){
	// ------Start Variables------
	var milesPerYearIndicator = document.querySelector('.miles-per-year');
	var spentPerYearIndicator = document.querySelector('.spent-per-year');
	var savingsIndicatorFirstPanel = document.querySelector('.savings-first-panel');
	var commutesPerWeekInput = document.querySelector('#commutes-per-week');
	var fullTankCostInput = document.querySelector('#fill-up-cost');
	var gasPriceIndicator = document.querySelector(".gas-price-indicator");
	var leaseButton = document.querySelector(".lease-button");
	var upfrontButton = document.querySelector(".upfront-button");

	// Should probably remove the start address and destination address after plugging them into API, that way we won't run into any weird errors when reassigning session variables
	var location = sessionStorage.getItem('location');
	var startAddress = sessionStorage.getItem('startAddress');
	var destinationAddress = sessionStorage.getItem('destinationAddress');

	var numberOfMiles;
	var commutesPerWeek = 5;
	var timeFrame = 3;
	var gasPrice = 2.284;
	var electricityPrice = 0.12;
	// ------End Variables------

	// ------Start Functions------
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	function loadAddressCard(start, end){
		var startAddress = document.querySelector(".start-address");
		var destinationAddress = document.querySelector(".destination-address");
		startAddress.innerHTML = start.split("+").join(" ");
		destinationAddress.innerHTML = end;
	}
	function commutesPerWeekHandler(event) {
	    // You can use “this” to refer to the selected element.
	    if(!event.target.value) alert('Please Select One');
	    else commutesPerWeek = event.target.value;
			allTogether(numberOfMiles);
	}
	function fullTankCostHandler(event){
		// You can use “this” to refer to the selected element.
		if(!event.target.value) alert('Please Select One');
		else gasPrice = event.target.value;
		if(gasPrice % 1 != 0){
			gasPriceIndicator.innerHTML = "$" + gasPrice + "0"
		}else{
			gasPriceIndicator.innerHTML = "$" + gasPrice + ".00"
		}
		allTogether(numberOfMiles);
	}
	function getDistance(){
   	//Find the distance
   	var distanceService = new google.maps.DistanceMatrixService();
   	distanceService.getDistanceMatrix({
      origins: [startAddress.split(", ").join("+")],
      destinations: [destinationAddress.split(", ").join("+")],
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
				console.log("The distance is: " + response.rows[0].elements[0].distance.text);
				var distance =  response.rows[0].elements[0].distance.text;
				numberOfMiles = Number(distance.split(" ")[0]);
				allTogether(numberOfMiles);
      }
	  });
  }
	function MilesPerYear(distance){
		return distance * 2 * commutesPerWeek * 52 * timeFrame; // * commutesPerWeek
		// distance * 2 (back and forth once a day) * X (number of times per week) * 52 weeks in a year * Y (number of years)
	}
	function calculateYearlyGasCost(totalMiles, index){
		// let thisGasPrice = gasPrice; // per gallon
		let tankCost = gasPrice * gasVehicles[0]["tankcapacity"];
		let pricePerMileGas = tankCost / gasVehicles[0]["range"];
		let gasCost = totalMiles * pricePerMileGas;
		return +(gasCost).toFixed(2);
	}
	function calculateYearlyECost(totalMiles, index){
		// let thisElectricityPrice = electricityPrice; // per kWH
		let eTankCost = electricityPrice * electricVehicles[index]["batterycapacity"];
		let pricePerMileE = eTankCost / electricVehicles[index]["range"];
		let electricityCost = totalMiles * pricePerMileE;
		return +(electricityCost).toFixed(2);
	}
	function populateFirstPanel(miles, gasCost, savings){
		var firstYearIndicator = document.querySelector(".first-year-indicator");
		var secondYearIndicator = document.querySelector(".second-year-indicator");
		milesPerYearIndicator.innerHTML = numberWithCommas(miles);
		firstYearIndicator.innerHTML = timeFrame;
		spentPerYearIndicator.innerHTML = numberWithCommas(gasCost);
		savingsIndicatorFirstPanel.innerHTML = numberWithCommas(savings);
		secondYearIndicator.innerHTML = timeFrame;
	}
	function populateThirdPanel(distance, gasCost){
		var fordSavings = document.querySelector('.ford-savings');
		var fiatSavings = document.querySelector('.fiat-savings');
		var nissanSavings = document.querySelector('.nissan-savings');
		var bmwSavings = document.querySelector('.bmw-savings');
		var teslaSavings = document.querySelector('.tesla-savings');

		var fordDifference = +(gasCost - calculateYearlyECost(distance, 1)).toFixed(2);
		var fiatDifference = +(gasCost - calculateYearlyECost(distance, 2)).toFixed(2);
		var nissanDifference = +(gasCost - calculateYearlyECost(distance, 3)).toFixed(2);
		var bmwDifference = +(gasCost - calculateYearlyECost(distance, 0)).toFixed(2);
		var teslaDifference = +(gasCost - calculateYearlyECost(distance, 4)).toFixed(2);

		fordSavings.innerHTML = `$${numberWithCommas(fordDifference)}`;
		fiatSavings.innerHTML = `$${numberWithCommas(fiatDifference)}`;
		nissanSavings.innerHTML = `$${numberWithCommas(nissanDifference)}`;
		bmwSavings.innerHTML = `$${numberWithCommas(bmwDifference)}`;
		teslaSavings.innerHTML = `$${numberWithCommas(teslaDifference)}`;
	}
	function allTogether(distance){
		var totalMiles = MilesPerYear(distance).toFixed(2);
		var gasCost = calculateYearlyGasCost(totalMiles, 0);
		var eCost = calculateYearlyECost(totalMiles, 1);
		var savings = +(gasCost - eCost).toFixed(2);
		populateFirstPanel(totalMiles, gasCost, savings);
		populateThirdPanel(totalMiles, gasCost);
	}
	// ------End Functions------


	// ------Start Function Calls and Event Listeners------
	var distance = getDistance();
	loadAddressCard(startAddress, destinationAddress);

	commutesPerWeekInput.onchange=commutesPerWeekHandler;
	fullTankCostInput.oninput=fullTankCostHandler;
	leaseButton.addEventListener("click", (e) => {
		timeFrame = 3;
		upfrontButton.querySelector("label").classList.remove("bg-blue");
		e.target.classList.remove("bg-blue");
		e.target.classList.add("bg-blue");
		allTogether(numberOfMiles);
	});
	upfrontButton.addEventListener("click", (e) => {
		timeFrame = 10;
		leaseButton.querySelector("label").classList.remove("bg-blue");
		e.target.classList.remove("bg-blue");
		e.target.classList.add("bg-blue");
		allTogether(numberOfMiles);
	});
	$('#ford').on('click', function() {
		window.location = "http://www.ford.com/cars/focus/2017/models/focus-electric/"
	});
	$('#fiat').on('click', function() {
		window.location = "http://www.fiatusa.com/en/500e/"
	});
	$('#nissan').on('click', function() {
		window.location = "https://www.nissanusa.com/electric-cars/leaf/"
	});
	$('#bmw').on('click', function() {
		window.location = "https://www.bmwusa.com/vehicles/bmwi.html"
	});
	$('#tesla').on('click', function() {
		window.location = "https://www.tesla.com/models"
	});
	// ------End Function Calls and Event Listeners------
});
