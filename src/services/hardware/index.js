'use strict';

const hooks = require( './hooks' );
const knex = require( 'feathers-knex' );

module.exports = function () {
	
    const app = this;

    const options = {
        Model: app.get( 'knex' ),
        name: 'hardwares'
    };

    app.use( '/hardwares', knex( options ) );

    const service = app.service( '/hardwares' );
    service.hooks( hooks );

};
