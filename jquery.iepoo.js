"use strict";

;(function ( $, window, document, undefined ) {

		    // undefined is used here as the undefined global
		    // variable in ECMAScript 3 and is mutable (i.e. it can
		    // be changed by someone else). undefined isn't really
		    // being passed in so we can ensure that its value is
		    // truly undefined. In ES5, undefined can no longer be
		    // modified.

		    // window and document are passed through as local
		    // variables rather than as globals, because this (slightly)
		    // quickens the resolution process and can be more
		    // efficiently minified (especially when both are
		    // regularly referenced in your plugin).

		    // Create the defaults once
		    var pluginName = 'iepoo',
		        defaults = {
		           message : '',
		        };

		        var template = '<div id="ie-turd-storm-container">' +
									'<div id="butt-box">'+
										'<div id="butt-inner"></div>'+
									'</div>'+
									'<div id="poo-box">'+
										'<div id="inner-poo-container">'+
											'<div id="poo-cap"></div>'+
											'<div id="poo-log"></div>'+
										'</div>'+
									'</div>'+
									'<div id="poo-wall">'+
										'<div id="turd-message-container">'+
											
										'</div>'+
									'</div>'+
								'</div>';

		    // The actual plugin constructor
		    function IEPoo( element, options ) {
		        this.element = element;

		        // jQuery has an extend method that merges the
		        // contents of two or more objects, storing the
		        // result in the first object. The first object
		        // is generally empty because we don't want to alter
		        // the default options for future instances of the plugin
		        this.options = $.extend( {}, defaults, options) ;

		        this._defaults = defaults;
		        this._name = pluginName;

		        if(this.options.message)
		        	this.$message = $(this.options.message).hide();

		        this.init();
		    }

		    IEPoo.prototype.init = function () {
		        $(template).appendTo('body');

		        var message = (this.options.message) ? this.$message.html() : '';

		        $(this.element).click(function(e) {
		        	e.preventDefault();
		        	turdStorm(message);
		        });

		        $(document).on('click', '#turd-message-container', function(e) {
		        		e.stopPropagation();
		        });

		        $(document).on('click', '#poo-wall', function() {
		            if ($('body').hasClass('ie-turd-storm')) {
		                turdStorm(message);
		            }
		        });

		         $(document).on('keyup', function(event) {
			        if (event.keyCode == 27) {
			            if ($('body').hasClass('ie-turd-storm')) {
			                turdStorm(message);
			            }
			        } // esc
			    });
		    };

		    var turdStorm = function (message) {

		        $('body').toggleClass('ie-turd-storm');
		        $('#butt-inner').stop().attr('style', '');
		        $('#poo-box').stop().attr('style', '');
		        $('#poo-wall').stop().attr('style', '');
		        $('#turd-message-container').stop().css('display', 'none');


		        if ($('body').hasClass('ie-turd-storm')) {

		            $('#butt-inner').animate({top: '0%'}, 800, 'swing', function() {

		                $('#butt-inner').animate({
		                    top: '-3%'
		                },
		                300, 'swing', function() {
		                    $('#butt-inner').animate({
		                        top: '0%'
		                    },
		                    600, 'swing');
		                });

		                $('#poo-box').animate({
		                    bottom: '-400%'
		                },
		                8000, 'linear');
		            });

		            setTimeout(function() {
		                $('#poo-wall').css('bottom', '0%');
		            }, 2500);

		            setTimeout(function() {
		            	$('#turd-message-container').html(message);
		                $('#turd-message-container').fadeIn();
		            }, 5500);
		        }

		    }

		    // A really lightweight plugin wrapper around the constructor,
		    // preventing against multiple instantiations
		    $.fn[pluginName] = function ( options ) {
		        return this.each(function () {
		            if (!$.data(this, 'plugin_' + pluginName)) {
		                $.data(this, 'plugin_' + pluginName,
		                new IEPoo( this, options ));
		            }
		        });
		    }

		})( jQuery, window, document );