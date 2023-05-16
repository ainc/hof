var shadowBoxInitialized = false;

var lastFiltered, initFilter = false;

$(function(){

	$('.2020-tip').tooltip();

	$(document).on('pjax:send', function(){
		toggleContentOpacity();
	});

	$(document).on('pjax:complete', function(){
		toggleContentOpacity();
		pageLoad(false);
		$('.nav-collapse').collapse('hide');
	});

	$('#navbar li a').click(function(){
		$('.nav-collapse').collapse();
	});

	$('a.menu-btn').click(function(){
		$('.nav-collapse').collapse();
	});

	pageLoad(true);

	console.log("DOM Loaded");


});

function pageLoad(fullRefresh){
	var file = window.location.pathname.split('/')[1];
	
	toggleNavbarLink(file);

	if (!fullRefresh){
		toggleBillboard(file);
	}

	if (isHomePage(file)){
		console.log("this is the file ", file);
		$('#gallery').imagesLoaded(function(){
			initGallery();
		});
		$('#galleryEE').imagesLoaded(function(){
			initGalleryEE();
		});
		initPhotosAbout();
	}

	if (isFoundersSeries(file)){
		$('#founders').imagesLoaded(function(){
			initVideos();
		});
	}

	if (isAbout(file)){
		// initPhotosAbout();
	}

	if (isMedia(file)){
		initPhotosMedia();
	}

	if (!shadowBoxInitialized){
			Shadowbox.init();
			shadowBoxInitialized = true;
	}
	else{
			Shadowbox.setup('.foundersVideo a, .bio-video a');
		}
}

function toggleContentOpacity(){
	$('#pjax-container').toggleClass('show hide');
}

function toggleNavbarLink(file){
	$('#navbar li a').each(function(){
		var href = $(this).attr('href');
		if ((href == '/' && file == '') || (file != '' && file.indexOf(href) >= 0)){
			$(this).parent().addClass('active');
		}
		else{
			$(this).parent().removeClass('active');
		}
	});
}

function toggleBillboard(file){
	if (isHomePage(file)){
		// home page
		$('.billboard').css('max-height', '500px');
		$('.billboard').css('opacity', '1');
	}
	else{
		// any other page
		$('.billboard').css('max-height', '0px');
		$('.billboard').css('opacity', '0');
	}
}

function initGallery(){
	// isotope
	var $inductees = $('.inductees');
	console.log(inductees);

	$inductees.isotope({
	  itemSelector : '.inductee',
	  layoutMode : 'fitRows'
	});

	//default filter when page loads 2022
	$inductees.isotope({ filter: ".twenty-twenty-two" });
	$('#filters a[data-filter=".twenty-twenty-two"]').css({"color": "#af0a09", "font-size": "26px"});

	$('#filters a').on("click", function(){
	  var selector = $(this).attr('data-filter');
		console.log(selector);
	  $inductees.isotope({ filter: selector });

	  //set all other filters to inactive
	  $('#filters a').css({"color": "#666", "font-size": "18px"});

      //set selected filter to active
	  $(this).css({"color": "#af0a09", "font-size": "26px"});
	  return false;
	});

	$('select.filter').change(function(){
		$("select option:selected").each(function () {
			var selector = $(this).attr('data-filter');

			$inductees.isotope({ filter: selector });
			return false;
		});
	});

	// hoverdir
	$('#inductees > li').each(function(){
		$(this).hoverdir();
	});
}

function initGalleryEE(){
	// jquery grabs induceesEE element and its inner html
	var $inducteesEE = $('.inducteeEE');
	console.log(inducteesEE);
	//filters a specific item by class name i.e -> "inducteeEE"
	$inducteesEE.isotope({
	  itemSelector : '.emergingE',
	  layoutMode : 'fitRows'
	});

	//default filter when page loads
	$inducteesEE.isotope({ filter: ".twenty-twenty-two-ee" });
	$('#filtersEE a[data-filter=".twenty-twenty-two-ee"]').css({"color": "#af0a09", "font-size": "26px"});

	//filters on click
	$('#filtersEE a').click(function(){
	  var selector = $(this).attr('data-filter');
		console.log(selector);

		if(initFilter === false){
				initFilter = true;
				$inducteesEE.isotope({ filter: selector });
		}
		else{
			$inducteesEE.isotope({ filter: selector });
		}

		//set all other filters to inactive
		$('#filtersEE a').css({"color": "#666", "font-size": "18px"});

		//set selected filter to active
		$(this).css({"color": "#af0a09", "font-size": "26px"});

		//test scroll for jquery
		//seems to not work due to jQuery isotope plugin

	  return false;
	});


	$('select.filterEE').change(function(){
		$("select option:selected").each(function () {
			var selector = $(this).attr('data-filter');
			console.log(selector);
			$inducteesEE.isotope({ filter: selector });
			return false;
		});
	});

	// hoverdir
	$('#inducteesEE > li').each(function(){
		$(this).hoverdir();
	});

}

function initVideos(){
	// isotope
	var $foundersVideo = $('.foundersVideos');

	$foundersVideo.isotope({
	  itemSelector : '.foundersVideo',
	  layoutMode : 'fitRows'
	});

	$('#filters a').click(function(){
	  var selector = $(this).attr('data-filter');

	  $foundersVideo.isotope({ filter: selector });
	  return false;
	});
	$('select.filter').change(function(){
		$("select option:selected").each(function () {
			var selector = $(this).attr('data-filter');
			$foundersVideo.isotope({ filter: selector });
			return false;
		});
	});
}

function isHomePage(file){
	return (file == "");
}

function isFoundersSeries(file){
	return (file.indexOf('founders') >= 0);
}

function isAbout(file){
	return (file.indexOf('about') >= 0);
}

function isMedia(file){
	return (file.indexOf('media') >= 0);
}

function moveTo(){
	console.log("MoveTo");
}

// TWITTER PLUGIN
jQuery(function($){
	$(".tweet").tweet({
	  join_text: "auto",
	  username: "entrepreneurhof",
	  avatar_size: 48,
	  count: 3,
	  filter: function(t){ return ! /^@\w+/.test(t.tweet_raw_text); },
	  loading_text: "loading tweets...",
	  template: "{text}"
	});
});

// FLICKR PLUGIN

// function initPhotosAbout(){

// 	$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=be58a8e94257fd0384521f22e4759fcb&user_id=40598240@N02&photoset_id=72157632009763509&per_page=6&format=json&jsoncallback=?", function(data){
// 		console.log(this);
// 			var list = $("<ul></ul>");
// 	        $.each(data.photoset.photo, function(i,photo){
// 		        var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "q.jpg";
// 		        var a_href = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "b.jpg";
// 		         var img = ("<a rel='shadowbox[Hall of Fame]' href='"+a_href+"'><img src='" + img_src + "'/></a>");
// 		        var li = $("<li/>").append(img);
// 		        $(list).append(li);
//       		});
//       		$(".photos").append(list);
//       		Shadowbox.setup('.photos-about li a');
//     });

// }

// function initPhotosMedia(){

// 	$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=be58a8e94257fd0384521f22e4759fcb&user_id=40598240@N02&photoset_id=72157632009763509&per_page=8&format=json&jsoncallback=?", function(data){
// 			var list = $("<ul></ul>");
// 	        $.each(data.photoset.photo, function(i,photo){
// 		        var img_src = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "q.jpg";
// 		        var a_href = "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_" + "b.jpg";
// 		         var img = ("<a rel='shadowbox[Hall of Fame]' href='"+a_href+"'><img src='" + img_src + "'/></a>");
// 		        var li = $("<li/>").append(img);
// 		        $(list).append(li);
//       		});
//       		$(".photos").append(list);
//       		Shadowbox.setup('.photos-media li a');
//     });

// }
