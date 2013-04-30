var PROFORM = PROFORM || {};
PROFORM.languages = PROFORM.languages || {};
PROFORM.validators = PROFORM.validators || {};

(function( $ ){

	var methods = {};
	var options = {
	
		language: 'en-gb'
	};


// Bootstrap global functions / options
	$.proform = {};
	$.proform.option = function( key, value ) {
	
		options[ key ] = value;
	}	


	// Returns a promise...
	var input_validate = function( $input ) {

		var value = $input.val();
		
		var validation_promise = new $.Deferred();
		var validation_pending = false;
		
	// Is mandatory?
		if( value == '' ) {
		
			if( typeof $input.attr( 'data-pf-mandatory' ) != 'undefined' ) {
			
				validation_promise.reject();
				return validation_promise;
			}
			
			// Not mandatory and empty- so acceptable
			validation_promise.resolve();
			return validation_promise;
		}

	// Do validator...
		var validator = $input.attr( 'data-pf-validator' );
		if( validator ) {

			if( typeof PROFORM.validators[ validator ] == 'undefined' ) {
				
				console.log( 'This is a registered validator' );
			} else {
			
				validation_pending = true;
				PROFORM.validators[ validator ]( value, function( error ) {
				
					if( error ) {
					
						validation_promise.reject();
					} else {
					
						validation_promise.resolve();
					}
				});
			}
		}

	// Do regex pattern...
		var pf_pattern = $input.attr( 'data-pf-pattern' );
		if( typeof pf_pattern != 'undefined' ) {
		
		// Pick apart regex...
			var regex_parsed = /^\/(.+)\/([a-z]?)$/i.exec( pf_pattern );
			if( ! regex_parsed ) {
			
				console.log( 'Unable to parse pf-pattern' );
			} else {
			
				var regex = new RegExp( regex_parsed[ 1 ], regex_parsed[ 2 ] );
				if( regex.test( value ) ) {
				
					validation_promise.resolve();
				} else {
				
					validation_promise.reject();
				}

				return validation_promise;
			}
		}

		if( ! validation_pending ) {

			validation_promise.resolve();
		}
		
		return validation_promise;
	}

	
	function lang_get( string_id ) {
	
		return PROFORM.languages[ options.language ][ string_id ];
	}

		
	methods.init = function( options ) {

		return this.each( function() {
	
			var $this = $( this );
			var data = $this.data( 'proform' );
			if ( ! data ) {		// Plugin Initialisation

				$this.data( 'proform', {
				
					settings: $.extend({
						input_on_change: function() {}
					}, options || {})
				});
			}

			
			$this.on( 'keyup', 'input', function() {
/* Every key press...			
				var $input = $( this );
				var value = $input.val();
				if( input_validate( $input ) ) {

					methods.input_valid( $this, $input, value );
				} else {
				
					methods.input_invalid( $this, $input, value );
				}
*/
			});

			
		// Validate the input on blur- validation is asynchronous...
			$this.on( 'blur', 'input', function() {
		
				var $input = $( this );
				$.when( input_validate( $input ) )
					.done( function() {
				
						methods.input_valid( $this, $input );
					})
					.fail( function() {

						methods.input_invalid( $this, $input );
					});
			});

			
			$this.on( 'change', 'select', function() {
					
				var state_set = $( this ).find( 'option:selected' ).attr( 'data-pf-state-set' );
//				alert( state_set );
				
				$this.find( "[data-pf-state-watch=\"" + state_set + "\"]" ).css( 'background-color', '#ff0000' );
			});

			$this.on( 'submit', function( e ) {

				e.preventDefault();
				
			// Validate everything that hasn't been validated...
				$this.find( 'input' ).each( function( index, input ) {

					// TODO
				});
			});
		});
	};

	
	
	methods.destroy = function() {

		return this.each( function() {

			var $this = $( this ),
			data = $this.data( 'proform' );

			$( window ).unbind( '.proform' );
			data.proform.remove();
			$this.removeData( 'proform' );
		})
	};
	
	
	methods.option = function( key, value ) {

		options[ key ] = value;
	};
	
	
	methods.input_valid = function( proform, $input ) {

		var data = proform.data( 'proform' );
		data.settings.input_on_change( $input, true );
	};
	
	
	methods.input_invalid = function( proform, $input ) {

		var data = proform.data( 'proform' );
		data.settings.input_on_change( $input, false );
	};
		
	
// Bootstrap local objects
	$.fn.proform = function( method ) {

		if( methods[ method ] ) {

			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {

			return methods.init.apply( this, arguments );
		} else {

			$.error( 'Method ' +  method + ' does not exist on jQuery.proform' );
		}    
	};
})( jQuery );