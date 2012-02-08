// Colby Viola
// Project 1
// Advanced Scalable Data Infrastructures
// Mobile Development
// Full Sail University

var callJSON = function(){
	$("#jsonInput").empty();
	$(function(){
		$.ajax({
			async: false,
			url: "xhr/list.json",
			type: "GET",
			dataType: "json",
			success: function(response){
				for(var i=0, j=response.movieInfo.length; i<j; i++){
					var p = response.movieInfo[i];
					$("#jsonInput").append("<li>"+ 
						"<p>"+ p.fname +"</p>"+
						"<p>"+ "Group: " +  p.group +"</p>"+
						"<p>"+ "Release Date: " +  p.rdate +"</p>"+
						"<p>"+ "Previously Viewed: " +  p.pview +"</p>"+
						"<p>"+ "Genre: " + p.genre +"</p>"+
						"<p>"+ "Range: " + p.range +"</p>"+
						"<p>"+ "Trailer Link: " + p.tlink +"</p>"+
						"<p>"+ "Comments: " + p.comments +"</p>"+
					"</li><hr />"
					);
				};
			}
		});
		$("#jsonInput").listview();
	});
};
											// Call XML***************
$("#xmllist").bind("click", function(){
	$("#xmlInput").empty();
	$.ajax({
		url: "xhr/data.xml",
		type: "GET",
		dataType: "xml",
		success: function(xmllist){
			$(xmllist).find("film").each(function(){
				var group = $(this).find("group").text();
				var fname = $(this).find("fname").text();
				var rdate = $(this).find("rdate").text();
				var pview = $(this).find("pview").text();
				var genre = $(this).find("genre").text();
				var range = $(this).find("range").text();
				var tlink = $(this).find("tlink").text();
				var comments = $(this).find("comments").text();
				$(""+
					"<li class='film'>"+
						"<p>"+ fname +"</p>"+
						"<p>"+ "Group: " + group +"</p>"+
						"<p>"+ "Release Date: " + rdate +"</p>"+
						"<p>"+ "Previously Viewed: " + pview +"</p>"+
						"<p>"+ "Genre: " + genre +"</p>"+
						"<p>"+ "Range: " + range +"</p>"+
						"<p>"+ "Trailer Link: " + tlink +"</p>"+
						"<p>"+ "Comments: " + comments +"</p>"+
					"</li><hr />"
				).appendTo("#xmlInput");
			});
		}
	});
	return false;
});
											// End Call XML ************
											//Start Call CSV ***********
																						// Start csv call**********
$("#csvlist").bind("click", function(){
	$("#csvInput").empty();
	 $.ajax({
        type: "GET",
        url: "xhr/data.csv",
        dataType: "text",
        success: function(data){
        	var alldata = data.split(/\r\n|\n/);
    		var splitdata = alldata[0].split(",");
    		var lines = []; 
			for (var i=1; i<alldata.length; i++){
				var data = alldata[i].split(",");
				if (data.length == splitdata.length){
					var movies= []; 
					for (var j=0; j<splitdata.length; j++){
						movies.push(data[j]);
					}
					lines.push(movies); 
				}
			}
			for (var m=0; m<lines.length; m++){
				var movie = lines[m];
			$(""+
				"<li class='movie'>"+
					"<p>"+ movie[0] +"<p>"+
					"<p>"+ "Group: " + movie[1] +"<p>"+
					"<p>"+ "Release Date: " + movie[2] +"<p>"+
					"<p>"+ "Previously Viewed: " + movie[3] +"<p>"+
					"<p>"+ "Genre: " + movie[4] +"<p>"+
					"<p>"+ "Range: " + movie[5] +"<p>"+
					"<p>"+ "Tralier Link: " + movie[6] +"<p>"+
					"<p>"+ "Comments: " + movie[7] +"<p>"+
				"</li><hr />"
			).appendTo("#csvInput");
			}
        }
	});
	return false;
});
												//End Call CSV *********
												//Start Data Collection*
$(document).ready(function(){

	var getData = function (){
		
		for(var i=0, len = localStorage.length; i < len; i++){
			var key = localStorage.key(i);
			var num = localStorage.getData(key);
				num = num.split(",");
			var group = num[0];
			var fname = num[1];
			var rdate = num[2];
			var pview = num[3];
			var genre = num[4];
			var range = num[5];
			var tlink = num[6];
			var comments = num[7];
			var groupImage = "Unknown.png";
				if(group == "DVD"){groupImage = "DVD.png";}
				if(group == "Theater"){groupImage = "Theater.png";}
			
			$("#newMovies").append($("<img>").attr("src", "images/"+groupImage).attr("alt", ""));
			$("#newMovies").append($("<p>").html("<strong>Film Name:</strong>" + num[1]));
			$("#newMovies").append($("<br>").html("<strong>Group:</strong>" + num[0]));
			$("#newMovies").append($("<br>").html("<strong>Release Date:</strong>" + num[2]));
			$("#newMovies").append($("<br>").html("<strong>Previously Viewed:</strong>" + num[3]));
			$("#newMovies").append($("<br>").html("<strong>Genre:</strong>" + num[4]));
			$("#newMovies").append($("<br>").html("<strong>Range:</strong>" + num[5]));
			$("#newMovies").append($("<br>").html("<strong>Trailer Link:</strong>" + num[6]));
			$("#newMovies").append($("<br>").html("<strong>Comments:</strong>" + num[7]));
			
									//************EDIT/DELETE BUTTONS BELOW**************
			
			$("#newMovies").append($("<a>").attr( "href", "#").attr("onclick", "deleteItem("+ key +");").attr("data-role", "button").attr("data-icon", "delete").text("Delete").attr("data-theme", "a").attr("data-inline", "true"));
			$("#newMovies").append($("<a>").attr( "href", "#").attr("onclick", "editItem("+ key +");").attr("data-role", "button").attr("data-icon", "edit").text("Edit").attr("data-theme", "a").attr("data-inline", "true"));
		}
	
		if(localStorage.getData("apptitle")){
			var clearLink = $("#clear").css("display", "block"); 
		}else{
			return;
		}
	};
	
	var storeData = function (key){
									//create unique ID***************
		if(!key){
			var id = Math.floor(Math.random()*100001);	
		}else{
			id = key;
		}							//end unique ID gen**************
									//get values of populated form*************
		var group = $("#group").val();
		var fname = $("#fname").val();
		var rdate = $("#rdate").val();
		var pview = $("#pview").val();
		if (pview == "off"){
			$("#pview").val("No");
		}else{
			$("#pview").val("Yes");
		}
		var genre = $("#genre").val();
		var range = $("#range").val();
		var tlink = $("#tlink").val();
		var comments = $("#comments").val();
		
		var allData = [
			group,
			fname,
			rdate,
			pview,
			genre,
			range,
			tlink,
			comments
		];
		
		localStorage.setItem(id, allData);
		alert("Movie Saved!");
		location.reload();
	};							//end get values of populated form, save to localStorage************
	
	//JSON OBJECT which will auto populate local storage.
	
	var editItem = function (){
								//Grab the data from our item in local storage.************
		var num = localStorage.getData(key);
			num = num.split(",");
			
		var group = num[0];
			$("#group").val(group);
		var fname = num[1];
			$("#fname").val(fname);
		var rdate = num[2];
			rdate = $("#rdate").val(rdate);
		var pview = num[3];
			if (pview == "off"){
				$("#pview").val("No");
			}else{
				$("#pview").val("Yes");
			}
		var genre = num[4];
			genre = $("#genre").val(genre);
		var range = num[5];
			range = $("#range").val(range);
		var tlink = num[6];
			tlink = $("#tlink").val(tlink);
		var comments = num[7];
			comments = $("#comments").val(comments);
			
		var editSubmit = $("submit");
								//Save the key value established in this function as a property of the editSubmit event
								//so we can use that value when edited data is saved.
		editSubmit.bind("click", "validate");
		editSubmit.key = this.key;
		
		var clearLink = $("clear");
		clearLink.bind("click", "clearLocal").css("display", "inline");
		var save = $("submit");
		save.bind("click", "validate").css("display", "none");
	}
	
	var clearLocal = function (){
		if(localStorage.length === 0){
			alert("There is no data to clear.");
		}else{
			localStorage.clear();
			alert("The entire movie list was deleted!");
			location.reload();
			return false;
		}
	}
	
	var deleteItem = function(){
		var ask = confirm("Are you sure you want to delete this movie?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Movie was deleted");
			location.reload();
		}else{
			alert("Movie was not deleted.");
		}
	}
});
	
								//e stands for event data******************
	var validate = function(e){
								//Define the elements we want to check.***************
		var getGroup = $("group");
		var getFname = $("fname");
		var errMsg = $("errors");
								//Reset Error messages.*********************
		errMsg.html("");
		getGroup.css("border","1px solid black");
		getFname.css("border","1px solid black");
								//Get error messages.
		var messageAry = [];
								//Group validation************************
		if(getGroup.value === "--Choose A Group--"){
			var groupError = "Please choose a group.";
			getGroup.css("border","1px solid red");
			messageAry.push(groupError);
		}
								//Film name validation********************
		if(getFname.value === ""){
			var fNameError = "Please enter a film name.";
			getFname.css("border","1px solid red");
			messageAry.push(fNameError);
		}
								//If there were errors, display them on the screen.************
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.append("li");
				txt.html("messageAry[i]");
				errMsg.appendChild(txt);
			}
		e.preventDefault();
		return false;
		}else{
								//If all is OK, save our data. Send the key value (orginated from editData function).***********
								//Remember this key value was passed through editSubmit event listener as a property.***********
			storeData(this.key);
		}
	}
/*
});
var parseMovieForm = function (data){
	// uses form data here;
	console.log(data);
};

//$(document).ready(function(){
	
	var amform = $("#addmovieform"),
		amerrorslink = $("amerrorslink")
	;
	
	amform.validate({
		invalidHandler: function(form, validator){
			amerrorslink.bind("click");
			var html ="";
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not("[generated]");
				var legend = label.closest("fieldset").find(".ui-controlgroup-label");
				var fieldName= legend.length ? legend.text() : label.text();
				html += "<li>"+ fieldName +"</li>";
			}
			$("#addmovieerrors ul").html(html);
		},
		submitHandler: function(){
			var data = amform.serializeArray();
			parseMovieForm(data);
		}
	});
});
*/