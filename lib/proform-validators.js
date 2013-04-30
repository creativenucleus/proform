PROFORM.validators[ 'uk-postcode' ] = function( value, cb ) {

	cb( /^[a-z]{2}[0-9]{1,2} ?[0-9]{1,2}[a-z]{2}$/i.test( value ) ? null : 'uk-postcode' );
}

PROFORM.validators[ 'uk-telephone' ] = function( value, cb ) {

	cb( /^\+?[0-9 ()]{7,12}$/i.test( value ) ? null : 'telephone' );
}
