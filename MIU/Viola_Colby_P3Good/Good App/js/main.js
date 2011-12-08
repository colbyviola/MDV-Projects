// Colby Viola
// Project 3
// Mobile Interfaces and Usability (MIU)
// Mobile Development
// Full Sail University
var parseMovieForm = function (data){
	// uses form data here;
	console.log(data);
};

$(document).ready(function(){
	
	var rbform = $("#addmovieform");
	
	rbform.validate({
		invalidHandler: function(form, validator){},
		submitHandler: function(){
			var data = rbform.serializeArray();
			parseMovieForm(data);
		}
	});
});