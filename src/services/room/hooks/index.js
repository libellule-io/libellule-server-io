'use strict';

const hooks = require( 'feathers-hooks-common' );
const auth = require( '@feathersjs/authentication' );

const before = {
	all: [
		auth.hooks.authenticate( 'jwt' )
	],
	find: [],
	get: [],
	create: [],
	update: [
		hooks.disallow()
	],
	patch: [],
	remove: []
};

const after = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};

const error = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};

module.exports = { before, after, error };
