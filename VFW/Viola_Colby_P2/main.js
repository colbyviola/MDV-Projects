// Colby Viola
// Activity 2
// Visual Frameworks (VFW)
// Mobile Development
// Full Sail University

window.addEventlistener("DOMContentLoaded", function(){
	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}
	
	//Create select field element and populate with options.
	function makeCats(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectLi = $("select"),
			makeSelect = document.createElement("select");
			makeSelect.setAttribute("id", "groups"); //makeSelect has an "id" of groups
		for(var i=0, j=contactGroups.length; i<j; i++){
			var makeOption = document.createElement ("option");
			var optText = movieList[i];
			makeOption.setAttribute("value", optText); // setAttribute has a "value" of optText
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	//Variable defaults
	var movieList = ["--Choose A Group--", "DVD", "Theaters", "Unknown"];
	makeCats();

//Set link & submit click events
	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);
	}
);