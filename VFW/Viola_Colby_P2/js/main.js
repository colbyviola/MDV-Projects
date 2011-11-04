// Colby Viola
// Activity 2
// Visual Frameworks (VFW)
// Mobile Development
// Full Sail University

window.addEventListener("DOMContentLoaded", function(){
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
		for(var i=0, j=movieGroup.length; i<j; i++){
			var makeOption = document.createElement ("option");
			var optText = movieGroup[i];
			makeOption.setAttribute("value", optText); // setAttribute has a "value" of optText
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find value of selected radio button.
	function getSelectedRadio(){
		var radios = document.forms[0].genre;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
				genreValue = radios[i].value;
			}
		}
	}
	
	function getCheckedBox(){
		if($("yes").checked){
			pviewValue = $("pview").value;
		}else{
			pviewValue= "No"
		}
	}
	
	function toggleControls(n){
		switch(n){
			case "on":
				$("movieForm").style.display = "none";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "none";
				$("addNew").style.display = "inline";
				break;
			case "off":
			$("movieForm").style.display = "block";
				$("clear").style.display = "inline";
				$("displayLink").style.display = "inline";
				$("addNew").style.display = "none";
				$("items").style.display = "none";
				break;
			default:
				return false;
		}
	}
	
	function storeData(){
		var id			= Math.floor(Math.random()*100001);
		//Gather up all our form field values and store in an object.
		//Object properties contain array with the form label and input value.
		getSelectedRadio();
		getCheckedBox();
		var item			= {};
			item.group		= ["Group", $("groups").value];
			item.fname 		= ["Film Name:", $("fname").value];
			item.rdate 		= ["Release Date:", $("rdate").value];
			item.pview		= ["Previously Viewed:", pviewValue];
			item.genre 		= ["Genre:", genreValue];
			item.range		= ["Rating", $("range").value];
			item.tlink		= ["Trailer Link", $("tlink").value];
			item.comments	= ["Comments", $("comments").value];
		//Save data into Local Storage: Use Stringify to convert our object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Movie Saved!");
	}
	
	function getData(){
	toggleControls("on");
	if(localStorage.length === 0){
		alert("There is no data to display.");
	}
		//Write Data from Local Storage to the browser.
		var makeDiv = document.createElement("div");
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement("ul");
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$("items").style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement("li");
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert sting from local storage value back to an object by using JSON.parse()
			var obj = JSON.parse(value);
			var makeSubList = document.createElement("ul");
			makeli.appendChild(makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement("li");
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				
			}
		}
	}
	
	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no data to clear.")
		}else{
			localStorage.clear();
			alert("The entire movie list is deleted!");
			window.location.reload();
			return false;
		}
	}
	
	//Variable defaults
	var movieGroup = ["--Choose A Group--", "DVD", "Theaters", "Unknown"],
		genreValue,
		pviewValue
	;
	makeCats();

//Set link & submit click events

	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", storeData);
	

});