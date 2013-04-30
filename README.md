# proform

## Outline

### Desirables
- Easy validation
- Sensible config out of the box
- Validation markup hinting
- Work in step with HTML5 validation
- Flexible extension for validation
- Asynchronous (promises)
- Localisation
- Multi-stage forms
- Form flow / dependencies

### Dependencies
- jQuery

User-centric behaviour
- Input is selected - show input hint
- User enters their first attempt
- System checks validity on each key press, so we can put a validation tick next to the input if acceptable. No errors are visibly raised yet.
- When the input is finished ('change' event) then display if there's an error
- System checks validity on each key press, so we can put a validation tick next to the input if acceptable, or errors.

## Customisation

### Validators

Add, or override PROFORM.validators

	// cb( null ) for no error
	// cb( something ) for error
	PROFORM.validators[ validator-id ] = function( value, cb ) {

		cb( ! /^[a-z]{2}[0-9]{1,2} ?[0-9]{1,2}[a-z]{2}$/i.test( value ) );
	}

### Languages

	PROFORM.languages[ language-code ] = {
		string_id: string
		...
	}