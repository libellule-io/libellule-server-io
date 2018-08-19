'use strict';

const hooks = require( './hooks' );
const knex = require( 'feathers-knex' );

module.exports = function () {
    const app = this;

    const options = {
        Model: app.get( 'knex' ),
        name: 'temperatures_records'
    };

    app.use( '/hardwares/temperatures/records', knex( options ) );

    const service = app.service( '/hardwares/temperatures/records' );
    service.before( hooks );

};
