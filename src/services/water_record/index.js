'use strict';

const hooks = require( './hooks' );
const knex = require( 'feathers-knex' );

module.exports = function () {
    const app = this;

    const options = {
        Model: app.get( 'knex' ),
        name: 'waters_records'
    };

    app.use( '/hardwares/waters/records', knex( options ) );

    const service = app.service( '/hardwares/waters/records' );
    service.before( hooks );

};
