$(document).on('ready', site);

// Funciones mágicas
function site() {
	
	// variablesitas :D
	var Destino, scrollElement = 'html, body';
	
	// Obtenemos las medidas actuales 
	MedidasMagicas();
	
	// Si redimensionan la ventana
	$(window).resize(function(){
		MedidasMagicas();
	});
	
	// Navegación de la página (scrolleo a distintos divs mediante links)
	$('html, body').each(function () {
		var initScrollTop = $(this).attr('scrollTop');
		$(this).attr('scrollTop', initScrollTop + 1);
		if ($(this).attr('scrollTop') == initScrollTop + 1) {
			scrollElement = this.nodeName.toLowerCase();
			$(this).attr('scrollTop', initScrollTop);
			return false;
		}
	});
	
	// Si ponen un hash en la URL, que sean dirigidos a donde corresponde
	if (window.location.hash) {
		Destino = window.location.hash.replace('#!/', '');
		$(scrollElement).stop(true, true).animate({
			'scrollTop': $('section#'+ Destino).offset().top
		}, 1000, 'easeInOutBack', function() {
			// window.location.hash = '#'+ Destino;
		});
	}
	
	$("a[href^='#!/']").click(function(e) {
		e.preventDefault();
		
		Destino = this.hash.replace('#!/', '');
		$(scrollElement).stop(true, true).animate({
			'scrollTop': $('section#'+ Destino).offset().top
		}, 1000, 'easeInOutBack', function() {
			window.location.hash = '#!/'+ Destino;
		});
		
	});

	$(window).scroll(function () {
		$('#wrapper').find('section').each(function(e) {
			if ($(this).position().top <= $(window).scrollTop() && $(this).next().position().top > $(window).scrollTop()) {
				Destino = $(this).attr('id');
				window.location.hash = '#!/'+ Destino;
			}
		});
	});
}
function MedidasMagicas() {
	$('#wrapper').find('section').css({'height' : $(window).height()}).promise().done(function() {
		$('#wrapper').find('section').css({'height' : $(window).height(), 'width' : $(window).width()});
	});
	$('#Home .logo').css({'margin-top':  $('#wrapper').find('section').height()/2-$('#Home .logo').height()/2});
}