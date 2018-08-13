'use strict';

exports.up = function( knex, Promise ) {

    return Promise.all( [

        knex.schema.createTable( 'hardwares', table => {
			table.increments( 'id' ).primary();
            table.integer( 'room_id' ).notNullable().references( 'id' ).inTable( 'rooms' ).onDelete( 'CASCADE' );
            table.string( 'identifier' ).notNullable().unique().comment( 'is "ID" from arduino' );
			table.string( 'type' ).notNullable().comment( 'is "TYPE" from arduino' );
			table.integer( 'node' ).notNullable().unique().comment( 'is "NODE" from arduino' );
            table.string( 'name' ).notNullable();
			table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
		} ),

        knex.schema.createTable( 'temperatures_records', table => {
			table.increments( 'id' ).primary();
			table.integer( 'hardware_id' ).notNullable().references( 'id' ).inTable( 'hardwares' ).onDelete( 'CASCADE' );
			table.decimal( 'temperature' ).notNullable();
			table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );

			table.index( 'hardware_id' );
		} ),

		knex.schema.createTable( 'humidities_records', table => {
			table.increments( 'id' ).primary();
			table.integer( 'hardware_id' ).notNullable().references( 'id' ).inTable( 'hardwares' ).onDelete( 'CASCADE' );
			table.decimal( 'temperature' ).notNullable();
			table.decimal( 'humidity' ).notNullable();
			table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );

			table.index( 'hardware_id' );
		} ),

		knex.schema.createTable( 'powers_records', table => {
			table.increments( 'id' ).primary();
			table.integer( 'hardware_id' ).notNullable().references( 'id' ).inTable( 'hardwares' ).onDelete( 'CASCADE' );
			table.decimal( 'power' ).notNullable().defaultTo( 0 );
			table.integer( 'pulse' ).notNullable();
			table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );

			table.index( 'hardware_id' );
		} ),

		knex.schema.createTable( 'waters_records', table => {
			table.increments( 'id' ).primary();
			table.integer( 'hardware_id' ).notNullable().references( 'id' ).inTable( 'hardwares' ).onDelete( 'CASCADE' );
			table.decimal( 'water' ).notNullable();
			table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );

			table.index( 'hardware_id' );
		} )

    ] );

};

exports.down = function( knex, Promise ) {

    return Promise.all( [

        knex.schema.dropTable( 'temperatures_records' ),
        knex.schema.dropTable( 'humidities_records' ),
        knex.schema.dropTable( 'powers_records' ),
        knex.schema.dropTable( 'waters_records' ),
        knex.schema.dropTable( 'hardwares' )

    ] );

};