'use strict';

// lib
const knex = require( 'knex' );

// ports
const serial = require( './serial' );

// services
const log = require( './log' );
const authentication = require( './authentication' );

const hardware = require( './hardware' );
const water_record = require( './water_record' );
const power_record = require( './power_record' );
const humidity_record = require( './humidity_record' );
const temperature_record = require( './temperature_record' );

module.exports = function ( app ) {

	const knex_connection = knex( {
		client: 'pg',
		connection: app.get( 'postgres' )
	} );
	app.set( 'knex', knex_connection );

	// base
	app.configure( log );
	app.configure( serial );
	app.configure( authentication );

	// hardware
	app.configure( hardware );
	app.configure( humidity_record );
	app.configure( temperature_record );
	app.configure( water_record );
	app.configure( power_record );

};
