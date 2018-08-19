'use strict';

const errors = require( 'feathers-errors' );
const utils = require( 'feathers-hooks-common/lib/utils' );

/**
 * request the database to generate a node id
 *
 * @return {Object}
 *
 * @author shad
 */
exports.generateNodeID = function () {

	return function ( hook ) {

		utils.checkContext( hook, 'before', [ 'create' ], 'generateNodeID' );

		return new Promise( function( resolve, reject ) {

			const knex = hook.app.get( 'knex' );

			// request the proper function to obtain a unique node id
			const query = knex.select( '*' ).from( knex.raw( 'fn_generate_node_id()' ) );

			return query.then( result => {

				// hook.app.get( 'log' )( 'successfully created a node id: ${result[ 0 ]}', 'debug' );

				// set the newly generated node id
				hook.data.node = result[ 0 ].node_id;

				resolve( hook );

			} ).catch( reject );

		} );

	}

}

/**
 * notify arduino after creation to specify the new node id
 *
 * @return {Object}
 *
 * @author shad
 */
exports.notifyArduino = function () {

	return function ( hook ) {

		utils.checkContext( hook, 'after', [ 'create' ], 'notifyArduino' );

		// build the command query to be send to the arduino
		const serial_cmd = {

			// make sure to use the send method
			command: 'send',

			// request type
			request_type: 'P',

			// config' type
			type: 'SNI',

			// just created hardware identifier
			identifier: hook.result.identifier,

			// just generated hardware node id
			value: hook.result.node,

			// hardcoded value for setup mode hardware
			to_node: 255

		};

		// build the command query for removal of the just
		// created hardware to avoid duplicates
		const remove_setup_hardware = { query: {

			// remove the current identifier from setup
			identifier: hook.result.identifier

		} };

		return Promise.all( [

			hook.app.service( '/serial' ).create( serial_cmd ),

			hook.app.service( '/setup/hardwares' ).remove( null, remove_setup_hardware )

		] )
		.then( () => hook )
		.catch( err => {

			throw new errors.BadRequest( 'error while notifying arduino for hardware creation.' );

		})

	}

}
