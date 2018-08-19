'use strict';

module.exports = function() {

    const app = this;

    let is_connected = false;

    // try to open the serial port connection
    // @author shad
    const try_connection = async function() {

		try {

			await app.service( '/serial' )
				.create( { command: 'open' } );
			
		} catch ( err ) {

			console.error( err );
			
		}

    };

    // serial connection events
    app.service( '/serial' ).on( 'open', () => is_connected = true );
    app.service( '/serial' ).on( 'closed', () => is_connected = false );

    // set interval to check every 15 seconds the current serial
    // connection status, and try connecting if needed
    setInterval( () => {

        if ( !is_connected ) try_connection();

    }, 15000 );

};