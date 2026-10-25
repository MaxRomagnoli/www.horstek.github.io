var language = 'en';

const swiperElements = [];

function carDetails(thisEl) {

	// Hide other cars and sections
	$("section").hide();
	$("section.cars").show();
	$("section.cars .card").parent().hide();
	$(thisEl).parent().parent().parent().show();
	$("#buttonLoadMore").hide();

	// Show details, button to close
	$(thisEl).siblings(".details").show();
	$(thisEl).siblings(".close-details-button").show();

	// Hide img or swiper
	$(thisEl).parent().siblings(".card-img").hide();

	// To set to fullscreen
	$(thisEl).parent().parent().parent().addClass("col-12");
	$(thisEl).parent().parent().parent().removeClass("col-md-6");
	$(thisEl).parent().parent().parent().removeClass("col-lg-4");

	// Hide button
	thisEl.hide();
}

function showFirstCarDetails(showAll = false) {
	$(".details-button").show();
	$("#buttonLoadMore").show();
	$("section").hide();
	$("section.cars").show();
	//$("section.cars .card").parent().show();
	$("section.cars .card").parent().each(function(index, element) {
		if (showAll || index < 6) { $(this).show(); }
		else { $(this).hide(); }
	});
}
showFirstCarDetails();

function loadMore() {
	showFirstCarDetails(true);
	$("#buttonLoadMore").hide();
}

function closeCarDetails(thisEl, scrollAnimation = false) {

	// Show all cars and sections
	showFirstCarDetails();
	$("#buttonLoadMore").show();

	// Hide details, show button to details
	$(thisEl).siblings(".details").hide();
	$(thisEl).siblings(".details-button").show();

	// Show img or swiper
	$(thisEl).parent().siblings(".card-img").show();

	// To set to fullscreen
	$(thisEl).parent().parent().parent().removeClass("col-12");
	$(thisEl).parent().parent().parent().addClass("col-md-6");
	$(thisEl).parent().parent().parent().addClass("col-lg-4");

	// Hide button
	thisEl.hide();

	// Scroll animation
	if(scrollAnimation) {
		$('html, body').animate({
	        scrollTop: $(thisEl).parent().parent().parent().offset().top
	    }, 0);
	}
}

function openEngines() {

	$(".close-details-button").each(function() {
		closeCarDetails($(this), false);
	});

	showFirstCarDetails();

	//nav links
	$(".nav-link").removeClass("active");
	$(".nav-link.engines").addClass("active");
}

function openAbout() {
	$("section").hide();
	$("section.presentation").show();
	$("section.services").show();
	//$("section.location").show();
	$("section.programmer").show();

	//nav links
	$(".nav-link").removeClass("active");
	$(".nav-link.about").addClass("active");
}

function search(search_val = null) {
	
	// Get search val from input (if not passed from function)
	if(search_val == '' || search_val == null) {
		search_val = $("nav input[type=search]").val().toLowerCase();
	}

	// If value is empty, reset page
	if(search_val == '' || search_val == null) {
		$("h2").show();
		$(".search-label").hide();
		$(".img-404").hide();
		$(".card").parent("div").show();
		swiperElements.forEach(resetSwiperElements);
		return;
	}

	if(assistenza_active) { closeAssistenzaTecnica(); }
	$("h2").hide();
	$(".img-404").hide();

	var finds = 0;
	var single_find = "";
	$(".card").each(function() {
		var card_content = $(this).text().trim().replace(/^\s+|\s+$/gm,'').toLowerCase();
		if(card_content.indexOf(search_val) >= 0) {
			$(this).parent("div").show();
			finds++;
			single_find = $(this).find("h3").html();
			// $(this).parent().parent().siblings("h2").show();
		} else {
			$(this).parent("div").hide();
		}
  	});

  	swiperElements.forEach(resetSwiperElements);

	var search_label = $(".search-label");
	if(finds == 0) {
		search_label.html(language = 'it' ? ' Nessun risultato' : ' No results');
		$(".img-404").show();
	} else if (finds == 1) {
		search_label.html(single_find);
	} else if (finds > 1) {
		search_label.html(finds + (language = 'it' ? ' risultati' : ' finds'));
	}
	search_label.show();
}

function resetSwiperElements(item, index, arr) {
	item.update();
}

function setIta() {
	language = 'it';
	$("html").attr("lang", language);
	$("html [lang=en]").hide();
	$("html [lang=it]").css("display", ""); //.show();
	$("nav input[type=search]").attr("placeholder", "Cerca");
}

function setEng() {
	language = 'en';
	$("html").attr("lang", language);
	$("html [lang=en]").css("display", "inline"); //.show();
	$("html [lang=it]").hide();
	$("nav input[type=search]").attr("placeholder", "Search");
}

/*function setUrlLang(lang = 'en') {
	const urlParams = new URLSearchParams(window.location.search);
	urlParams.set('lang', lang);
	window.location.search = urlParams;
}*/

$(document).ready(function() {

	// Search by default if provided by url
	const urlParams = new URLSearchParams(window.location.search);
	var search_val = urlParams.get('search');
	if(search_val != '' && search_val != null) {
		search(search_val.toLowerCase());
	}

	/*language = urlParams.get('lang');
	if(language == 'it') {
		setIta();
	}
	else*/ if(window.navigator.userLanguage || window.navigator.language != 'it-IT') { setEng(); /*setUrlLang('it');*/ }
	// else { setEng(); }
	/*$(".assistenzaTecnica input.question").attr("disabled", true);
	insertAnswer();*/
	/* TODO (maybe) if(localStorage.getItem('max-dark-mode') == 1) {
		darkMode();
	}*/
	$("nav input[type=search]").keyup(function() { search(); });

	// Swiper
	const swiper_parameters = {
	 	loop: true,
		pagination: {
			el: ".swiper-pagination",
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		/*autoplay: {
	   		delay: 3000,
	 	},*/
	};
	swiperElements.push(new Swiper(".swiperPanda", swiper_parameters));
	swiperElements.push(new Swiper(".swiperHarley", swiper_parameters));
	swiperElements.push(new Swiper(".swiperS13", swiper_parameters));
	swiperElements.push(new Swiper(".swiperAntigravityTrees", swiper_parameters));
	swiperElements.push(new Swiper(".swiperLostAirlines", swiper_parameters));
	swiperElements.push(new Swiper(".swiperZipTime", swiper_parameters));
	swiperElements.push(new Swiper(".swiperMomtitasking", swiper_parameters));
	swiperElements.push(new Swiper(".swiperUfoTransmitter", swiper_parameters));
	swiperElements.push(new Swiper(".swiperTheBottle", swiper_parameters));
	swiperElements.push(new Swiper(".swiperAddiction", swiper_parameters));
	swiperElements.push(new Swiper(".swiperRoyPizzaRush", swiper_parameters));
	swiperElements.push(new Swiper(".swiperGalaxyGuts", swiper_parameters));
});