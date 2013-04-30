(function( $ ){

	var input_validate = function( $input ) {

		var pf_pattern = $input.attr( 'data-pf-pattern' );
		if( typeof pf_pattern == 'undefined' ) {
		
			return true;
		}
		
	// Pick apart regex...
		var regex_parsed = /^\/(.+)\/([a-z]?)$/i.exec( pf_pattern );
		if( ! regex_parsed ) {
		
			return true;
		}
		
		var regex = new RegExp( regex_parsed[ 1 ], regex_parsed[ 2 ] );
		return regex.test( $input.val() );
	}


	var methods = {};

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

			
			$this.on( 'change', 'input', function() {

				var $input = $( this );
				var value = $input.val();
				if( input_validate( $input ) ) {

					methods.input_valid( $this, $input, value );
				} else {
				
					methods.input_invalid( $this, $input, value );
				}
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
		
	
	
	methods.input_valid = function( proform, $input, value ) {

		var data = proform.data( 'proform' );
		data.settings.input_on_change( $input, true, value );
	};
	
	
	
	methods.input_invalid = function( proform, $input, value ) {

		var data = proform.data( 'proform' );
		data.settings.input_on_change( $input, false, value );
	};
	
	
	
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