'use strict';

exports.up = function( knex, Promise ) {

  	return Promise.all( [

		knex.schema.createTable( 'users', table => {
			table.increments( 'id' ).primary();
			table.string( 'username' ).notNullable().unique();
			table.string( 'password' ).notNullable();
 		    table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
			table.timestamp( 'updated_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
	    } )

  	] );

};

exports.down = function( knex, Promise ) {

	return Promise.all( [

	  	knex.schema.dropTable( 'users' )

	] );

};
