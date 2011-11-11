// Colby Viola
// Project 3
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
			pviewValue= "No";
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
	
	function storeData(key){
		//If there is no key, this means item is brand new, and new key is needed.
		if(!key){
			var id			= Math.floor(Math.random()*100001);	
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//Same key that has been passed through edit submit handler,
			//to the validate function, then passed here, into storeData function
			id = key;
		}
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
			var linksLi = document.createElement("li");
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
				makeSubList.appendChild(linksLi);
			}
			makeItemLinks(localStorage.key(i), linksLi); //Creates edit and delete buttons/links for each item in local storage.
		}
	}
	
	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(){
	//add edit single item link
		var editLink = document.createElement("a");
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Movie";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		//add line break
		var breakTag = document.createElement ("br");
		linksLi.appendChild(breakTag);	
		//add delete single item link
		var deleteLink = document.createElement("a");
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Movie";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab the data from our item in local storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		//shows the form
		toggleControls("off");
		//populate the form fields with current localStorage values.
		$("groups").value = item.group[1];
		$("fname").value = item.fname[1];
		$("rdate").value = item.rdate[1];
		var radios = document.forms[0].pview;
		for(var i=0; i<radios.length; i++){
			if (radios[i].value == "Comedy" && item.genre[1] == "Comedy"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Drama" && item.genre[1] == ("Drama"){
				radios[i].setAttribute("checked", "checked");
				}
			}else if(radios[i].value == "Action" && item.genre[1] == ("Action"){
				radios[i].setAttribute("checked", "checked");
				}
			}else if(radios[i].value == "Thriller" && item.genre[1] == ("Thriller"){
				radios[i].setAttribute("checked", "checked");
				}
			}else if(radios[i].value == "Romance" && item.genre[1] == ("Romance"){
				radios[i].setAttribute("checked", "checked");
				}
			}else if(radios[i].value == "Horror" && item.genre[1] == ("Horror"){
				radios[i].setAttribute("checked", "checked");
				}
			}else if(radios[i].value == "Documentary" && item.genre[1] == ("Documentary"){
				radios[i].setAttribute("checked", "checked");
				}
			}
		if(item.pview[1] == "Yes"){
			$("pview").setAttribute("checked", "checked");
		}
		$("range").value = item.range[1];
		$("tlink").value = item.tlink[1];
		$("comments").value = item.comments[1];	
		//Remove the initial listener from the input "save movie" button.
		save.removeEventListener("click", storeData);
		//Change submit button value to say edit button.
		$("submit").value = "Edit Movie";
		var editSubmit = $("submit");
		//Save the key value established in this function as a property of the editSubmit event
		//so we can use that value when edited data is saved.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this movie?")
		if(ask){
			localStorage.removeItem(this.key);
			alert("Movie was deleted");
			window.location.reload();
		}else{
			alert("Movie was not deleted.")
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
	
	//e stands for event data
	function validate(e){
		//Define the elements we want to check.
		var getGroup = $("groups");
		var getFname = $("fname");
		//Reset Error messages.
		errMsg.innerHTML = "";
		getGroup.style.border = "1px solid black";
		getFname.style.border = "1px solid black";
		//Get error messages.
		var messageAry = [];
		//Group validation
		if(getGroup.value === "--Choose A Group--")
			var groupError = "Please choose a group.";
			getGroup.style.border = "1px solid red";
			messageAry.push(groupError);
		}
		//Film name validation
		if(getFname.value === ""){
			var fNameError = "Please enter a film name."
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement("li");
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//If all is OK, save our data. Send the key value (orginated from editData function).
			//Remember this key value was passed through editSubmit event listener as a property.
			storeData(this.key);
		}
		
	}
	
	//Variable defaults
	var movieGroup = ["--Choose A Group--", "DVD", "Theaters", "Unknown"],
		genreValue,
		pviewValue = "No"
		errMsg = $("errors")
	;
	makeCats();

	//Set link & submit click events

	var displayLink = $("displayLink");
	displayLink.addEventListener("click", getData);
	var clearLink = $("clear");
	clearLink.addEventListener("click", clearLocal);
	var save = $("submit");
	save.addEventListener("click", validate);
	

});