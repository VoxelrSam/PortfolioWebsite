var currentPage = "home";   // Global variable declared for the nav function to keep track of current page
var lastPage = "home";

$(document).ready(function(){

	// removes javascript notice
	$('#javascriptNotice').css('display','none');
	
	setCss();

});

//sets css to accomodate for different resolutions and such
function setCss(){

	// margin left (used for horizontal alignment) is calculated based on width of the element
	$('#innerLoad').css('margin-left',"-" + $('#innerLoad').width() / 2 + "px");
	
	// checks to determine if the ratio of the window is greater than the background. if it is, the css height and width properties need to be switched. in short: keeps the background fullscreen and centered.
	setInterval(function(){
		if (window.innerHeight / window.innerWidth > $('#background').height() / $('#background').width()){
		
			$('#background, #backgroundOverlay').css({
				"width": "auto",
				"height": "105%"
			});
		} else {
			$('#background, #backgroundOverlay').css({
				"width": "105%",
				"height": "auto"
			});
		}
		
		$('#background, #backgroundOverlay').css("margin-left", "-" + ($('#background').width() / 2).toString() + "px");
		
		$('#HWContent').css("margin-top", ($('#cloudbuffer').height()/1.5 * -1) + "px");
	},1);
}

// Removes the loading screen when the website has loaded
function loaded(){

	// bounces screen out of view
	$('#load').addClass("animated bounceOutUp");
	
	// animates in the header and footer after the loading screen has finished bouncing out
	$('#load').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
		$("#headerContainer").addClass("animated slideInDown");
		$("#footer").addClass("animated slideInUp");
	});
	
}

// function used to dynamically switch "pages" (.content elements)
function changePage(page) {

	// tests to make sure the user is not already on the page selected
	if (currentPage !== page){
	
		// if the user is at the top of the screen, the animation time is negated. 
		if ($(window).scrollTop() === 0) {
			var scrollSpeed = 0;
		} else {
			var scrollSpeed = 300;
		}
	
		// scrolls the user to the top of the page before changing to the next one
		$("body").animate({ scrollTop: 0 }, scrollSpeed, function() {
		
			/* animates pages in/out and sets the needed properties
			
			The switch from fixed to absolute is needed so that the scroll length is equal to the page
			that the user is currently on. If .content elements were just set to absolute, the scroll
			length on all the pages would be equal to the longest .content element no matter if that 
			one is visible or not at the time. This means that on a shorter page like the contact, it 
			would still scroll because the other pages are much longer. In a tall browser window, this
			is not a problem, but if the browser is not tall enough, some of the pages may need to scroll.
			Switching unused pages to fixed negates their affect on the scroll length. Hopefully that makes sense.
			
			*/
			$('#' + currentPage).removeClass("animated fadeIn");
			$('#' + currentPage).addClass("animated fadeOut");
			$('#' + currentPage).css({"position": "fixed", "z-index": "0"});
			$('#' + page).removeClass("animated fadeOut");
			$('#' + page).addClass("animated fadeIn");
			$('#' + page).css({"position": "absolute", "z-index": "3", "top":"0px"});
			
			$('#' + currentPage).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$('#' + lastPage).css("top", window.innerHeight + "px");
			});
			
			// determines if the background needs to be changed depending on the page the user is going to
			if (page === "home"){
				$('#background').css({
					filter: 'grayscale(0%)',
					'-webkit-filter': 'grayscale(0%)'
				});
				
				$('#backgroundOverlay').animate({'opacity':"0"});
			} else {
				$('#background').css({
					'filter': 'grayscale(50%)',
					'-webkit-filter': 'grayscale(50%) blur(1px)'
				});
				
				$('#backgroundOverlay').animate({'opacity':".8"});
			}
			
			// sets the global variable to the page that the website just switched to.
			lastPage = currentPage;
			currentPage = page;
		});
	}
}