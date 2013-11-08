__incomplete, but making public to free up paid repo space__

I intend to come back to this at some point.

# proform

## Philosophy

A JavaScript library for making web forms usable.

Primarily user-centric, also attempting to be developer-centric. Ability to extend and customise is very important.

Built around asynchronous flow- async calls seem to trip up many form libraries.

### Desirables
- Easy validation
- Sensible config out of the box
- Validation markup hinting
- Fallback without JavaScript
- Work in step with HTML5 validation
- Flexible extension for validation
- Asynchronous (promises)
- Localisation
- Multi-stage forms
- Form flow / dependencies

### Dependencies
- jQuery

### User-centric behaviour
- Input is selected - show input hint
- User enters their first attempt
- System checks validity on each key press, so we can put a validation tick next to the input if acceptable. No errors are visibly raised yet.
- When the input is finished ('change' event) then display if there's an error
- System checks validity on each key press, so we can put a validation tick next to the input if acceptable, or errors.

## Usage

1. Create an HTML5 page and include, in the following order:


	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>		
	<script type="text/javascript" src="~proform/lib/proform.js"></script>
	<script type="text/javascript" src="~proform/lib/proform-validators.js"></script>
	<script type="text/javascript" src="~proform/lib/proform-lang-en-gb.js"></script>

2. Set validation requirements on your inputs


	<input type="text" name="postcode" placeholder="Enter a UK postcode" data-pf-mandatory data-pf-validator="uk-postcode" />

3. Assign proform to the relevant forms in the document.ready


	<script>
		$( document ).ready( function() {
					
			$( 'form.proform' ).proform();
		});
	</script>

4. Try, then customise!


## Customisation

### Validation Options

- Mandatory - the user must enter something in this input if the section is unhidden

	data-pf-mandatory

- Built in validators

	data-pf-validator="uk-postcode"

- Regex match

	data-pf-pattern="/regex/i"


### Language Selection

	$.proform.option( 'language', 'fr-fr' );


## Extension

### Validators

Add, or override PROFORM.validators

	// cb( null ) for no error
	// cb( something ) for error
	PROFORM.validators[ validator-id ] = function( value, cb ) {

		cb( ! /^[a-z]{2}[0-9]{1,2} ?[0-9]{1,2}[a-z]{2}$/i.test( value ) );
	}

### Languages

	PROFORM.languages[ language-code ] = {		// language code should be like en-gb
		string_id: string
		...
	}
