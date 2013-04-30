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
			
				validation_promise.rejectWith( this, [ 'mandatory' ] );
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
				
				console.log( 'No validator registered' );
			} else {
			
				validation_pending = true;
				PROFORM.validators[ validator ]( value, function( error ) {
				
					if( error ) {
					
						validation_promise.rejectWith( this, [ error ] );
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
				
					validation_promise.rejectWith( this, [ 'unspecified' ] );
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

	
	function dom_obj_handle_states( $this, $dob_obj, instant ) {

		var state_set = $dob_obj.attr( 'data-pf-state-set' );
		var state_unset = $dob_obj.attr( 'data-pf-state-unset' );
		
		if( instant ) {
		
			$this.find( "[data-pf-state-display~=\"" + state_set + "\"]" ).show();
			$this.find( "[data-pf-state-display~=\"" + state_unset + "\"]" ).hide();
		} else {
		
			$this.find( "[data-pf-state-display~=\"" + state_set + "\"]" ).slideDown();
			$this.find( "[data-pf-state-display~=\"" + state_unset + "\"]" ).slideUp();
		}
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
				var data = $this.data( 'proform' );
				$.when( input_validate( $input ) )
					.done( function() {
				
						data.settings.input_on_change( $input, null, '' );
					})
					.fail( function( error ) {

						data.settings.input_on_change( $input, error, lang_get( 'invalid-input_' + error ) );
					});
			});


		// State management...

		// Get initial states
		// TODO- checkboxes and radio
			$this.find( 'select option:selected' ).each( function() {
			
				dom_obj_handle_states( $this, $( this ), true );
			});
			
			
			$this.on( 'change', 'select', function() {
					
				dom_obj_handle_states( $this, $( this ).find( 'option:selected' ), false );
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