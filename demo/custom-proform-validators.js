PROFORM.validators[ 'username' ] = function( value, cb ) {

	$.ajax({
		url: 'async_long.php',
		data: { value: value },
		success: function( data, textStatus, jqXHR ) {
		
			if( data ) {
			
				cb( null );
			} else {
			
				cb( 'invalid' );
			}
		},
		dataType: 'json'
	});
}
