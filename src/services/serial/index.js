'use strict';

const hooks = require( './hooks' );
const knex = require( './serial.service.extend' );

module.exports = function () {

    const app = this;

    // Initialize our service with any options it requires
    app.use( '/serial', knex() );

    const service = app.service( '/serial' );
    service.before( hooks );

};
