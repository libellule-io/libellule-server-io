'use strict';

const hooks = require( './hooks' );
const knex = require( 'feathers-knex' );

module.exports = function () {
    const app = this;

    const options = {
        Model: app.get( 'knex' ),
        name: 'powers_records'
    };

    app.use( '/hardwares/powers/records', knex( options ) );

    const service = app.service( '/hardwares/powers/records' );
    service.before( hooks );

};
