'use strict';

const hooks = require( 'feathers-hooks-common' );
const auth = require( '@feathersjs/authentication' );

const before = {
	all: [
		auth.hooks.authenticate( 'jwt' )
	],
	find: [],
	get: [
		hooks.disallow()
	],
	create: [],
	update: [
		hooks.disallow()
	],
	patch: [
		hooks.disallow()
	],
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

