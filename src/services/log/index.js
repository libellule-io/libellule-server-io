'use strict';

const hooks = require( './hooks' );
const knex = require( 'feathers-knex' );

module.exports = function () {
    const app = this;

    const options = {
        Model: app.get( 'knex' ),
        name: 'logs',
        paginate: {
            default: 5,
            max: 25
        }
    };

    // Initialize our service with any options it requires
    app.use( '/logs', knex( options ) );

    const service = app.service( '/logs' );
    service.before( hooks );

    // set a globally accessible function to log messages
    app.set( 'log', ( message, type = 'info' ) => {

        app.service( '/logs' ).create( { type, message } );

    } );

};
