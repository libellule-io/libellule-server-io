'use strict';

const hooks = require( './hooks' );
const knex = require( 'feathers-knex' );

module.exports = function () {
    const app = this;

    const options = {
        Model: app.get( 'knex' ),
        name: 'humidities_records'
    };

    app.use( '/hardwares/humidities/records', knex( options ) );

    const service = app.service( '/hardwares/humidities/records' );
    service.before( hooks );

};
