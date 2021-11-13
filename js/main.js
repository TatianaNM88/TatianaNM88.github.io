$(document).ready(function(){

	var banner = {
		padre: $('#banner')
	};

	var info = {
		padre: $('#info'),
		numeroSlides: $('#info').children('.slide').length,
		posicion: 1
	}

	banner.padre.children('.slide').css({
		'left': 0
	});

	info.padre.children('.slide').first().css({
		'left': 0
	});	
	
	var altoBanner = function(){
		var alto = banner.padre.children('.slide').outerHeight();
		banner.padre.css({
			'height': alto + 'px'
		});
	}

	var altoInfo = function(){
		var alto = info.padre.children('.active').outerHeight();
		info.padre.animate({
			'height': alto + 'px'
		});
	}

	var altoContenedor = function(){
		var altoVentana = $(window).height();

		if (altoVentana <= $('.contenedor').outerHeight() + 200) {
			$('#contenedor').css({'height': ''});
		} else {
			$('#contenedor').css({'height': altoVentana + 'px'});
		}
	}

	altoBanner();
	altoContenedor();
	altoInfo();

	$(window).resize(function(){
		altoBanner();
		altoContenedor();
	});

	$('#info').children('.slide').each(function(){
		$('#botones').append('<span>');
	});

	$('#botones').children('span').first().addClass('active');

	$('#info-next').on('click', function(e){
		e.preventDefault();

		if (info.posicion < info.numeroSlides){

			info.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#info .active').removeClass('active').next().addClass('active').animate({
				'left': 0
			});

			$('#info .active').prev().animate({
				'left': '-100%'
			});

			$('.botones').children('.active').removeClass('active').next().addClass('active');
				
			info.posicion = info.posicion + 1;
		} else {
			
			$('#info .active').animate({
				'left': '-100%'
			});

			info.padre.children().not('.active').css({
				'left': '100%'
			});

			$('#info .active').removeClass('active');
			info.padre.children().first().addClass('active').animate({
				'left': 0
			});

			$('.botones').children('.active').removeClass('active');
			$('.botones').children('span').first().addClass('active');

			info.posicion = 1;
		}

		altoInfo();
	});

		$('#info-prev').on('click', function(e){
			e.preventDefault();

			if (info.posicion > 1){

				info.padre.children().not('.active').css({
					'left': '-100%'
				});

				$('#info .active').animate({
					'left': '100%'
				});

				$('#info .active').removeClass('active').prev().addClass('active').animate({
					'left': 0
				});

				$('#botones').children('.active').removeClass('active').prev().addClass('active');

				info.posicion = info.posicion - 1;
			} else {

				info.padre.children().not('.active').css({
					'left': '-100%'
				});

				$('#info .active').animate({
					'left': '100%'
				});

				$('#info .active').removeClass('active');
				info.padre.children().last().addClass('active').animate({
					'left': 0
				});

				$('#botones').children('.active').removeClass('active');
				$('#botones').children('span').last().addClass('active');

				info.posicion = info.numeroSlides;
			}

			altoInfo();
		});
});