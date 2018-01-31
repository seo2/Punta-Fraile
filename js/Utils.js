(function(){
	this.Utils = function(){
		this.seccion = [];
		this.slides = {
			intervals: []
		};
		this.defaults = [];
		this.options = extendDefaults(this.defaults, arguments[0]);
	};

	/* carga de todo, imagenes, css y javascript, de forma asincronica por medio de promesas */
	Utils.prototype.promiseloader = function(loadelement,success,error){
		var _ = this, promises = [];
		loadelement.forEach(function(f){
			promises.push(_.load(f[0],f[1],f[2],f[3]));
		});
		Promise.all(promises).then(success).catch(error);
	};

	Utils.prototype.load = function(tag,url,put,options){
		
		var p = new Promise(function(resolve, reject) {
			var element = document.createElement(tag);
			var parent = 'body';
			var attr = 'src';
			element.onload = function() {
				resolve(url);
			};
			element.onerror = function() {
		  		reject(url);
			};
			switch(tag) {
		  		case 'script':
					element.async = true;
				break;
		  		case 'link':
					element.type = 'text/css';
					element.rel = 'stylesheet';
					attr = 'href';
					parent = 'head';
				break;
				case 'video':
					element.type = 'video/mp4';
					element.id = 'video';
					element.muted = true;
					element.controls = false;
					element.autoplay = true;
					element.loop = true;
				break;
			}
			element[attr] = url;
			if(put){
				document.querySelector(put).appendChild(element);
			} else {
				document[parent].appendChild(element);	
			}
			
  		}).then(function(){
  			console.log(url);
  		});

		return p;
	};

	/* funcion para ajustar las secciones de un sitio a pantalla completa, sacar el menu en el home en el caso */
	Utils.prototype.ajustarSecciones = function(){
		
		this.seccion = {
			maximunWidth: 1400,
			maximunHeigth: 788,
			targets: document.getElementsByClassName(this.options.secciontarget),
			windowh: window.innerHeight,
			windoww: window.innerWidth,
		};

		for(i=0;i<this.seccion.targets.length;i++){
			var seccion = document.querySelector("#"+this.seccion.targets[i].id);
			if(this.seccion.targets[i].id == "home"){
				seccion.style.height = (this.seccion.windowh - document.getElementById("header").clientHeight)+"px";
			} else if(this.seccion.targets[i].id == "detalle"){
				if(mobile){
					console.log(window.innerHeight);
					seccion.style.height = (this.seccion.windowh*2)+"px";
				} else {
					seccion.style.height = this.seccion.windowh+"px";
				}
				
			}else{
				seccion.style.height = this.seccion.windowh+"px";
			}
			if(this.seccion.targets[i].id == 'detalle02'){
				console.log('detalle');
				if(mobile){
					seccion.style.height = this.seccion.windowh+"px";
				}
			}
		}
		
	};

	/* basic slide */
	Utils.prototype.basicslide = function(s,time,callback){
		
		var slide = document.querySelector(s);
		var list = slide.querySelector(".slide-list");
		//console.log(list.children);
		
		// calcular el tamanio de la lista
		this.slides.intervals[s] = setInterval(function(){
			var children = list.children;
			for(i=0;i<children.length;i++){
				if(children[i].classList.contains("active")){
					if(i == (children.length -1)){
						callback(children[i],children[0]);
						break;
					} else {
						callback(children[i],children[i+1]);
						break;
					}
				}
			}
		},time);
		
	};

	// function para extender las opciones del plugins
	function extendDefaults(source, properties) {
		var property;
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			}
		}
		return source;
	}
}());




