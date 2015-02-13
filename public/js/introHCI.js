'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})


/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);
//	$('.project').click(clickedOnProject);
	$('#colorBtn').click(randomizeColors);
	
}

function callBack(result)
{

	console.log("the id of this project is " +result.id);
	var selectedProject = $("#project"+result.id).find(".details");
	//console.log(selectedProject)
	console.log(result);
	selectedProject.html("<img src=\""+result.image+"\" class=\"detailsImage\"><h4>"+result.date+"</h4><h5>"+result.summary+"</h5>");
}
/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {
	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

	console.log("User clicked on project " + idNumber);
	$.get("/project/"+idNumber, callBack);
	
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
 function callBackColor(result)
 {
	 var colors = result.colors.hex;
	 console.log(result);
	 $('body').css('background-color', colors[0]);
$('.thumbnail').css('background-color', colors[1]);
$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
$('p').css('color', colors[3]);
$('.project img').css('opacity', .75);
 }
 
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", callBackColor);
}