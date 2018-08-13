'use strict';

const bossbooster = require( './hooks' );
const auth = require( '@feathersjs/authentication' );

const before = {
	all: [],
	create: [
		auth.hooks.authenticate( [ 'jwt', 'local' ] ),
		bossbooster.populateUser()
	],
	remove: [
		auth.hooks.authenticate( 'jwt' )
	]
};

const after = {
	all: [],
	create: [],
	remove: []
};

const error = {
	all: [],
	create: [],
	remove: []
};

module.exports = { before, after, error };
