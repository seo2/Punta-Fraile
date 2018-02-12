/* esta pieza de codigo debe ir en algún main.js */
var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    mobile = true;
}
// ajustes generales
var controller,
	animation = false,
	page = 'home';

// swipe
function addHammer(el) {
    var mc = new Hammer(el, { multiUser: true });
    var div = $(el).children('div');
    var current = 0;
    mc.on( "swipeleft", function( e ) {
    	e.preventDefault();
     	if ( div[ current + 1 ] ) {
     		var element = $('.ball[data-slide="'+div.eq( ++current ).attr('id')+'"]');
     		element.trigger('click');
       		//div.removeClass( "active" );
       		//div.eq( ++current ).addClass( "active" );
       	}
    });
    mc.on( "swiperight", function( e ) {
    	e.preventDefault();
     	if ( div[ current - 1 ] ) {
       		var element = $('.ball[data-slide="'+div.eq( --current ).attr('id')+'"]');
     		element.trigger('click');
       	}
    });
}

//addHammer(document.querySelector("#slide-detalle"));
//var urlSite = 'http://iactivsense.do/';
var urlSite = window.location.origin+window.location.pathname;

/* cargar todos los slide por este medio */
function preload(donde,imageArray, index) {
	
	if(!galfotos[donde].load){
		index = index || 0;
	    if (imageArray && imageArray.length > index) {
	        var img = new Image();
	        	img.src = imageArray[index];
	        
	        img.onload = function() {
	        	var d = document.createElement('div');
				if(index == 0){
	    			d.className = 'imagen-slide activo-slide s-'+donde+'-'+(index+1);
	    		} else {
	    			d.className = 'imagen-slide s-'+donde+'-'+(index+1);
	    		}
	        	d.style.backgroundImage = 'url('+imageArray[index]+')';
				document.querySelector('.galeria-'+donde+' .imagenes').appendChild(d);
	            preload(donde,imageArray, index + 1);
	        }
	        
		} else {
			galfotos[donde].load = true;
			TweenMax.to($('.page-loader'), .3, {opacity: 0, ease: Quad.easeOut, 
				onComplete: function(){
					$('.page-loader').remove();
				} 
			});
		}	
	}
}

var ScrollAnims = {
	"home": {
		time: .6,
		timeline: null,
		returnTo: 'cx5',
		h: { from: {y:-100,opacity:0},to: {y:0,opacity:1,ease: Quad.easeOut}},
		p: { from: {x:100,opacity:0},to: {x:0,opacity:1,ease: Quad.easeOut}	}
	}
};

var depto = {
	activo: 107,
	"107": {
		titulo: 'Exquisito departamento  con espacios pensados para compartir en familia.',
		items: ['3 dormitorios','2 baños','walk in closet','terraza'],
		descripcion: 'Living comedor con piso PVC, agradable terraza,  cocina con muebles con cubierta de cuarzo y piso de porcelanto y calefacción independiente con radiadores.'
	},
	"138": {
		titulo: 'Exquisito departamento  con espacios pensados para compartir en familia.',
		items: ['4 dormitorios','3 baños','walk in closet','2 terrazas'],
		descripcion: 'Living comedor con piso PVC, agradable terraza,  cocina con muebles con cubierta de cuarzo y piso de porcelanto y calefacción independiente con radiadores.'
	}
};

var scrollDown = false,
	scrollend = true;

var Fraile = {
	firstAdjust: false,
	adjust: function(){
		if(Fraile.firstAdjust) return false;
		this.windowWidth = $(window).innerWidth();
		this.windowHeight = $(window).innerHeight();
		var secciones = $(".seccion").length;
		$(".seccion").css({ "width": this.windowWidth+"px", "height": this.windowHeight+"px"});
		$("#content").css({ "width": this.windowWidth+"px", "height": (this.windowHeight*secciones)+"px" });
		if(mobile) Fraile.firstAdjust = true;
	},
	init: function(){
		Fraile.adjust();
		/*
		var slide = new SlideController({
			id: '#home',
			container: '.slide',
			childrens: '.slide-item',
			autoslide: true,
			callback: Fraile.animslide
		});
		*/
		/*
		var slideProyecto = new SlideController({
			id: '#proyecto',
			container: '.slide',
			childrens: '.slide-item',
			autoslide: true,
			callback: Fraile.animslide
		});
		*/
		if(!mobile){
			$(window).on('resize', function(){
				Fraile.adjust();
			});	
			
			/*
			window.addEventListener('wheel', function(e){
				e.preventDefault();
				if(!scrollDown){
					var wDelta = e.deltaY < 0 ? 'up' : 'down';
					setTimeout(function(){
						//Fraile.scrollTo('#proyecto');
					}, 250);
				}
			});
			*/
		}
		
		/*
		$.each(ScrollAnims, function(v,i){
			TweenMax.set($("#"+v+" .content-seccion h3"), i.h.from);
			TweenMax.set($("#"+v+" .content-seccion p"), i.p.from);

			var scene = new ScrollMagic.Scene({
					triggerElement: '#'+v,
					offset: (mobile) ? -($(window).innerHeight()*0.1) : -($(window).innerWidth()*0.1),
					duration: (mobile) ? $("#"+v).innerHeight()+(($(window).innerHeight()*0.2)) : $(window).innerWidth()
				})
				.on('enter', function(){
					if(!mobile){
						Fraile.playSeccionVideo(v);
						Fraile.marcamenu(v);	
					}
					
					if(!i.timeline){
						i.timeline = new TimelineMax();
						i.timeline.fromTo($("#"+v+" .content-seccion h3"), i.time, i.h.from,i.h.to);
						i.timeline.fromTo($("#"+v+" .content-seccion p"), i.time, i.p.from,i.p.to,"-=.3");
						i.timeline.staggerFromTo([$("#"+v+" .box-video"),$("#"+v+" .box-imagen")], i.time, {scale: .8, opacity: 0},{scale: 1, opacity: 1, transformOrigin: "center center", ease: Quad.easeOut},.2, "-=.4");
					} else {
						i.timeline.play();
					}
				})
				.on("leave", function (event) {
					i.timeline.reverse();
					if(!mobile){
						if(i.returnTo != 'cx5'){
							Fraile.reverseVideo(i.returnTo);	
						}
						Fraile.marcamenu(i.returnTo);	
					}
				})
				//.addIndicators(v)
				.addTo(controller);
		});
		*/

	},
	tlmenu: false,
	toogleMenu: function(){
		var menu = $(".menu");
		var state = menu.attr("data-toogle");
		if(!Fraile.tlmenu){
			Fraile.tlmenu = new TimelineMax({
				onStart: function(){
					$(".menu .icon-hambur").addClass("hide");
					$(".menu .icon-close").removeClass("hide");
				},
				onComplete: function(){
					if(state == 'close'){
						menu.attr({"data-toogle":"open"});
					} else {
						menu.attr({"data-toogle":"close"});
					}
				},onReverseComplete: function(){
					menu.attr({"data-toogle":"close"});
					$(".menu .icon-hambur").removeClass("hide");
					$(".menu .icon-close").addClass("hide");
				}
			});	
			if(state == 'close'){
				Fraile.tlmenu.to(menu, .4,{right: 0, ease: Quad.easeOut });
			} else {
				Fraile.tlmenu.reverse();
			}
		} else {
			if(state == 'close'){
				Fraile.tlmenu.play();
			} else {
				Fraile.tlmenu.reverse();
			}
		}
	},
	animslide: function(activo,nextslide){
		console.log(activo,nextslide);
		if(activo != null && nextslide != null){
			var tl = new TimelineMax({
				onStart: function(){
					$(activo).removeClass("activo");
				},
				onComplete: function(){
					$(nextslide).addClass("activo");
				}
			});
			tl.fromTo(activo,2,{opacity:1},{opacity: 0, ease: Quad.easeOut });
			tl.fromTo(nextslide,2,{opacity:0},{opacity: 1, ease: Quad.easeOut },"-=1");
		}
	},
	cargarGaleria: function(c){
		/* images is an array with image metadata */
		$('.galeria-'+c).append('<div class="page-loader">\
			        <div class="loading">\
			            <div class="bullet"></div>\
			            <div class="bullet"></div>\
			            <div class="bullet"></div>\
			            <div class="bullet"></div>\
			        </div>\
			    </div>');

		var images = new Array();
		for(var i = 0; i < galfotos[c].cant; i++){
			images.push("img/galeria/"+c+"/"+(i+1)+".jpg");
		}
		preload(c,images);

	},
	openmodal: function(cual,objeto){
		TweenMax.fromTo($("."+cual),.3,{scale: .7, opacity: 0},{opacity: 1, scale: 1, zIndex: 9, transformOrigin: "center center", ease: Quad.easeOut });
		if(cual == 'interior'){
			Fraile.cargaInfo(objeto);
		}
	},
	closemodal: function(cual,objeto){
		TweenMax.to($("."+cual),.3,{opacity: 0, scale: .7, zIndex: -1, ease: Quad.easeOut });
		if(cual == 'planta'){
			$(".planta img").addClass('hide');
		}
	},
	cargaInfo: function(objeto){
		depto.activo = objeto;
		$(".interior .metros").html(objeto+" M<span>2</span><div class='separador'></div>");
		$(".interior .descripcion h4").html(depto[objeto].titulo);
		$(".interior .box-detalle").html('');
		$(".interior .box-detalle").html('');
		$.each(depto[objeto].items, function(i,v){
			var d = '<div class="item-detalle">'+v+'</div>';
			$(".interior .box-detalle").append(d);
		});
		$(".interior .descripcion p").html(depto[objeto].descripcion);
		$(".planta img[data-proyecto='"+objeto+"']").removeClass('hide');
	},
	tlficha: false,
	verFicha: function(){
		var bg = 'rgb(240,228,174)';
		var interior = $(".interior");
		var interiordetalle = $(".interior .interior-detalle");
		var ficha = $(".interior .ficha");

		if(!Fraile.tlficha){
			Fraile.tlficha = new TimelineMax({
				onStart: function(){
					$(".descargarficha").attr({'href':urlSite+'img/ficha-'+depto.activo+".jpg"});
					TweenMax.set(interiordetalle,{opacity:1,zIndex:1});
					TweenMax.set(ficha,{opacity:0,zIndex:1});
				},
				onReverseComplete: function(){
					TweenMax.set(interiordetalle,{zIndex:1});
					TweenMax.set(ficha,{zIndex:-1});
				}
			});
			Fraile.tlficha.to(interior,.5,{backgroundColor: bg, ease: Quad.easeOut })
				.to(interiordetalle,.5,{opacity:0, ease: Quad.easeOut },"-=.3")
				.to(ficha,.5,{opacity:1, ease: Quad.easeOut },"-=.5");
		} else {
			Fraile.tlficha.play();
		}
		
	},
	closeficha: function(){
		Fraile.tlficha.reverse();
	},
	gotocotizar: function(){
		Fraile.closemodal('interior');
		//$(".menu .list-menu a:nth-child(3)").trigger("click");
		$(window).scrollTop(window.innerHeight*3);
		$("input[name='cot_depa[]']").attr("checked",false);
		$("input[name='cot_depa[]'][value='"+depto.activo+"']").attr("checked",true);
	},
	goto: function(number){
		if(scrollend){
    		scrollend = false;
    		var content = $('#content');
    		if(!mobile){
    			var top = -($(".seccion").innerWidth() * number);
    			window.scrollTo(top, 0);
    			/*
				TweenMax.to(window,1,{scrollTo: top, ease: Linear.easeOut,
					onComplete: function(){
						scrollend = true;
					}
				});	
				*/
    		}else{
    			Fraile.toogleMenu();
    			var seccions = $(".seccion");
    			var top = 0;
    			$.each(seccions, function(v,i){
    				if(v == number){
    					return false;
    				}
    				top = top + $(i)[0].clientHeight;
    			});
    			TweenMax.to(window,1,{y: {y:top}, ease:Power2.easeInOut,
					onComplete: function(){
						scrollend = true;
					}
				});	
				
    		}
    		
    	}
	},
	onError: function(form,mensaje){
		var box = $(form+" .mensaje_error");
		box.html(mensaje);
		TweenMax.to(box,.3,{opacity: 1,ease: Quad.easeOut});
		setTimeout(function(){
			TweenMax.to(box,.3,{opacity: 0,ease: Quad.easeOut});
		},2000);
	}
};

$("#form-cotizador").validate({
	rules: {
		cot_nombre: {
			required: true
		},
		cot_apellido: {
			required: true
		},
		cot_mail: {
			required: true,
			email: true
		},
		cot_telefono: {
			required: true
		},
		'cot_depa[]': {
			required: true
		},
	},
  	messages: {
  		cot_nombre: {
  			required: 'Ingresa tu nombre'
  		},
		cot_apellido: {
			required: 'Ingresa tu apellido'
		},
		cot_mail: {
			required: 'Ingresa tu email',
			email: 'Debes ingresar un correo valido'
		},
		cot_telefono: {
			required: 'Ingresa tu teléfono'
		},
		cot_depa: {
			required: 'Selecciona un departamento'
		}
  	},
  	errorPlacement: function(){
  		// console.log('error placemnet');
  		// console.log('error placemnet');
  	},
  	invalidHandler: function(event, validator) {
  		//console.log(event,validator);
	   	if(validator.errorList.length == validator.currentElements.length){
	    	console.log('Error 01');
	    	Fraile.onError('#form-cotizador','Todos los campos son obligatorios');
	  	} else {
	    	console.log('Error 02');
	    	Fraile.onError('#form-cotizador',validator.errorList[0].message);
	    }
	},
  	submitHandler: function(form) {
		console.log($('input[name="cot_depa"]:checked').val());
  		$.ajax({
  			method: 'POST',
  			url: urlSite+'contacto.php',
  			data: {
				tipo: 'cotizar',
				cot_nombre: $('input[name="cot_nombre"]').val(),
				cot_apellido: $('input[name="cot_apellido"]').val(),
				cot_mail: $('input[name="cot_mail"]').val(),
				cot_telefono: $('input[name="cot_telefono"]').val(),
				cot_depa: $('input[name="cot_depa"]:checked').val()
  			},
  			dataType: 'JSON',
  			success: function(r){
  				Fraile.onError('#form-cotizador','Gracias por escribirnos, pronto te contactaremos.');
  			}
  		});
	}
});

$("#form-contacto").validate({
	rules: {
		con_nombre: {
			required: true
		},
		con_apellido: {
			required: true
		},
		con_email: {
			required: true,
			email: true
		},
		con_telefono: {
			required: true
		},
		con_comentario: {
			required: true
		},
	},
  	messages: {
  		con_nombre: {
  			required: 'Ingresa tu nombre'
  		},
		con_apellido: {
			required: 'Ingresa tu apellido'
		},
		con_email: {
			required: 'Ingresa tu email',
			email: 'Debes ingresar un correo valido'
		},
		con_telefono: {
			required: 'Ingresa tu teléfono'
		},
		con_comentario: {
			required: 'Selecciona un departamento'
		}
  	},
  	errorPlacement: function(){
  		//console.log('error placemnet');
  		//console.log('error placemnet');
  	},
  	invalidHandler: function(event, validator) {
  		//console.log(event,validator);
	   	if(validator.errorList.length == validator.currentElements.length){
	    	console.log('Error 01');
	    	Fraile.onError('#form-contacto','Todos los campos son obligatorios');
	  	} else {
	    	console.log('Error 02');
	    	Fraile.onError('#form-contacto',validator.errorList[0].message);
	    }
	},
  	submitHandler: function(form) {
  		$.ajax({
  			method: 'POST',
  			url: urlSite+'contacto.php',
  			data: {
				tipo: 'contacto',
				con_nombre: $('input[name="con_nombre"]').val(),
				con_apellido: $('input[name="con_apellido"]').val(),
				con_mail: $('input[name="con_email"]').val(),
				con_telefono: $('input[name="con_telefono"]').val(),
				con_comentario: $('textarea[name="con_comentario"]').val()
  			},
  			dataType: 'JSON',
  			success: function(r){
				Fraile.onError('#form-contacto','Gracias por escribirnos, pronto te contactaremos.');
  			}
  		});
	}
});

$(function(){
	//alert(window.innerWidth+" "+window.innerHeight);
    Fraile.init();
	/*
	$('body').on('mousewheel', function(event) {
    	if(scrollend){
    		scrollend = false;
    		var content = $('#content');
    		var l = content.position().left;
			var obligatoryLeft = $(".seccion").innerWidth();
    		var direction = (event.deltaY > 0) ? 1 : -1;
    		var gotoleft = l + (direction*obligatoryLeft);
			
			// esto funciona para avanzar
			if(gotoleft <= 0 && Math.abs(gotoleft) <= (content.innerWidth()-obligatoryLeft)){
				TweenMax.to(content,1,{left: gotoleft, ease: Linear.easeOut,
					onComplete: function(){
						scrollend = true;
						scrollcount = 0;
						console.log('complete: ',scrollend);
					}
				});	
			}else{
				scrollend = true;
			}
    	}
    	
    	event.preventDefault();
    });
	*/
});