'use strict';

const hooks = require( './hooks' );
const knex = require( 'feathers-knex' );

module.exports = function() {

	const app = this;

	const options = {
		Model: app.get( 'knex' ),
		name: 'rooms'
	};

	app.use( '/rooms', knex( options ) );

	const service = app.service( '/rooms' );
	service.hooks( hooks );

};
