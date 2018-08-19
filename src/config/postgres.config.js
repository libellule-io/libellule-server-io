'use strict';

const pg = require( 'pg' );

// set decimal type as decimals
pg.types.setTypeParser( 1700, 'text', parseFloat );