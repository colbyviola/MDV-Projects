// Colby Viola
// Project 4
// Mobile Interfaces and Usability (MIU)
// Mobile Development
// Full Sail University
var parseMovieForm = function (data){
	// uses form data here;
	console.log(data);
};

$(document).ready(function(){
	
	var amform = $("#addmovieform"),
		amerrorslink = $("amerrorslink")
	;
	
	amform.validate({
		invalidHandler: function(form, validator){
			amerrorslink.click();
			var html ="";
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not("[generated]");
				var legend = label.closest("fieldset").find(".ui-controlgroup-label");
				var fieldName= legend.length ? legend.text() : label.text();
				html += "<li>"+ fieldName +"</li>";
			};
			$("#addmovieerrors ul").html(html);
		},
		submitHandler: function(){
			var data = amform.serializeArray();
			parseMovieForm(data);
		}
	});
});
