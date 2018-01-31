 (function(){
                this.VideoController = function(){
                    // Create global element references
                    this.video;
                    this.customdrag;
                    this.container;
                    this.interval = false;
                    this.options = null;
                    this.selected = null, // Object of the element to be moved
                    this.x_pos = 0;
                    //this.y_pos = 0; // Stores x & y coordinates of the mouse pointer
                    this.x_elem = 0;
                    //this.y_elem = 0;

                    this.defaults = {
                        id: "video-controller",
                        video: 'video',
                        container: 'buttonbar',
                        clase: 'barslider',
                        startTime: 0,
                        endTime: 5,
                        handleclass: 'custom-handle'
                    }
                    this.options = extendDefaults(this.defaults, arguments[0]);
                    this.video = document.getElementById(this.options.video);

                    this.init();

                }

                VideoController.prototype.init = function(){
                    var _ = this, date = new Date();
                    
                    _.video.currentTime = _.options.startTime;
                    _.interval = date.getTime();

                    _.crearTimeline(function(){
                        _.customdrag.addEventListener('mousedown', function(e){
                            _.selected = _.customdrag;
                            _.x_elem = _.x_pos - _.selected.offsetLeft;
                        });
                        _.container.addEventListener('mousemove', function(e){
                            if(_.selected){
                                _.x_pos = e.layerX;
                                _.selected.style.left = (_.x_pos - _.x_elem) + 'px';

                                var date = new Date();
                                var interval2 = date.getTime();
                                //console.log(_.x_pos,(interval2-_.interval));

                                if(_.x_pos >= 0 && (interval2-_.interval)>24){
                                    _.interval = interval2;
                                    var seekto = _.options.startTime + (_.options.endTime-_.options.startTime) * (_.x_pos / (parseInt(_.container.style.width) - parseInt(_.customdrag.style.width)));
                                    _.video.currentTime = seekto;
                                }
                            }
                        });
                        _.container.addEventListener('mouseleave', function(){
                            _.selected = null;
                        });
                        _.customdrag.addEventListener('mouseup', function(e){
                            //_.x_elem = 0;
                            _.selected = null;
                        });
                    });

                    //VideoController.selected = document.getElementById(VideoController.options.id+'-custom-handle');
                    //VideoController.x_elem = VideoController.x_pos - VideoController.selected.offsetLeft;
                }
                
                VideoController.prototype.crearTimeline = function(callback){
                    var slide = document.createElement('div');
                        slide.id = this.options.id;
                        slide.style.width = '325px';
                        slide.className = this.options.clase;
                    var d = document.createElement('div');
                        d.id = this.options.id+'-custom-handle';
                        d.style.width = '11px';
                        d.className = this.options.handleclass;
                    document.getElementById(this.options.container).appendChild(slide);
                    slide.appendChild(d);
                    this.container = document.getElementById(this.options.id);
                    this.customdrag = document.getElementById(this.options.id+'-custom-handle');
                    callback();
                }

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

            var v = new VideoController({
                name: 'listo'
            });