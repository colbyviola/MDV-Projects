// Colby Viola
// Activity 2
// Visual Frameworks (VFW)
// Mobile Development
// Full Sail University

window.addEventlistener("DOMContentLoaded", function(){
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	var movieList = ["--Choose A Group--", "DVD", "Theaters", "Unknown"];

	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);
	}
);