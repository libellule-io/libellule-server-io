'use strict';

const app = require( './app' );
const port = app.get( 'port' );
const logger = require( './config/logger' );

const server = app.listen( port );

process.on( 'unhandledRejection', ( reason, p ) =>
  	logger.error( 'unhandled Rejection at: Promise ', p, reason )
);

server.on( 'listening', () =>
  	logger.info( 'libellule api server started on http://%s:%d', app.get( 'host' ), port )
);
