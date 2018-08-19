'use strict';

const moment = require( 'moment' );
const errors = require( 'feathers-errors' );

/**
 * convert the power result depending on timespan
 * between now and the last result recorded to get
 * accurate power use
 *
 * @return {Object}
 *
 * @author shad
 */
exports.convertData = function() {

	return function( hook ) {

		if ( hook.type !== 'before' ) {
		    throw new errors.BadRequest( `The 'convertData' hook should only be used as a 'before' hook.` );
		}

		if ( [ 'create' ].indexOf( hook.method ) === -1 ) {
            throw new errors.BadRequest( `The 'convertData' hook should only be used with the create method.` );
        }

        return new Promise( ( resolve, reject ) => {

        	const now = moment();

			const query = { query: {

				// limit to one result
				$limit: 1,

				// sort to only get the last one
				$sort: { created_at: -1 }

			} };

        	hook.app.service( '/hardwares/powers/records' )
			.find( query )
        	.then( records => {

				// if we've found a record
        		if( records.length === 1 ) {

        			const record = records[ 0 ];

					// get the difference in seconds between the last record and the current time
        			const diff = now.diff( record.created_at, 'milliseconds' );

					// if we have a difference inferior to 20 minutes, calculate
					// the real power used on this timespan
        			if( diff < ( 1200 * 1000 ) ) {

        				hook.data.power = +hook.data.pulse / ( diff / ( 3600 * 1000 ) );

        			}

        		}

        		resolve( hook );

        	} )
        	.catch( reject );

        } );

	}

}
