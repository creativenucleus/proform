<?php

sleep( 1 );

if( $_GET[ 'value' ] == 'proform' ) {

	echo json_encode( true );
} else {

	echo json_encode( false );
}
