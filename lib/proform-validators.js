PROFORM.validators[ 'uk-postcode' ] = function( value, cb ) {

	cb( ! /^[a-z]{2}[0-9]{1,2} ?[0-9]{1,2}[a-z]{2}$/i.test( value ) );
}