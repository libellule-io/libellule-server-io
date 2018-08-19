'use strict';

const hooks = require( 'feathers-hooks-common' );
const auth = require( '@feathersjs/authentication' );

const before = {
	all: [
		auth.hooks.authenticate( 'jwt' )
	],
	find: [],
	get: [],
	create: [
		hooks.disallow( 'external' )
	],
	update: [
		hooks.disallow()
	],
	patch: [
		hooks.disallow()
	],
	remove: [
		hooks.disallow()
	]
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

