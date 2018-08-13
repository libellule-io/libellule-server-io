'use strict';

exports.up = function( knex, Promise ) {

    return Promise.all( [

        knex.schema.createTable( 'logs', table => {
			table.increments( 'id' ).primary();
			table.enum( 'type', [ 'info', 'warning', 'error', 'debug' ] ).notNullable().defaultTo( 'info' );
			table.string( 'message' ).notNullable();
            table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );

            table.index( 'type' );
		} )

    ] );

};

exports.down = function( knex, Promise ) {

    return Promise.all( [

        knex.schema.dropTable( 'logs' )

    ] );

};