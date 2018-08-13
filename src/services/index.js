'use strict';

// lib
const knex = require( 'knex' );
// services
const authentication = require( './authentication' );

module.exports = function ( app ) {

	const knex_connection = knex( {
		client: 'pg',
		connection: app.get( 'postgres' )
	} );
	app.set( 'knex', knex_connection );

	// base
	app.configure( authentication );

};
