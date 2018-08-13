'use strict';

const _  = require( 'lodash' );
const hooks = require( 'feathers-hooks-common' );

/**
 * set the user on the auth payload to be returned directly along the auth request to avoid a round-trip to get it,
 * knowing that the client will want to have that data available on the client in any situation
 * note: the hook will only load safe data, avoiding property like `password` to be returned
 * 
 * @throws {Error} hooks used on wrong method(s) or hook type (before, after...)
 *
 * @return {Promise}
 *
 * @author shad
 */
exports.populateUser = function() {

  	return function( hook ) {

		hooks.checkContext( hook, 'before', [ 'create' ], 'populateUser' );

		// extract only the data we want, avoiding unsafe data like the `password`
		const user = _.pick( hook.params.user, [ 'id', 'email', 'username', 'roles' ] );

		// set on the auth. payload
	    hook.params.payload = Object.assign( hook.params.payload, { user } );

    	return hook;

  	};

};
