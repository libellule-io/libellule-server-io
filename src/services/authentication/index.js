'use strict';

const hooks = require( './hooks' );
const jwt = require( '@feathersjs/authentication-jwt' );
const local = require( '@feathersjs/authentication-local' );
const authentication = require( '@feathersjs/authentication' );

module.exports = function() {

	const app = this;

	let config = app.get( 'auth' );

	app.configure( authentication( config ) );
	app.configure( jwt() );
	app.configure( local() );

	const service = app.service( 'authentication' );
	service.hooks( hooks );

};
