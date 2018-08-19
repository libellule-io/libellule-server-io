'use strict';

const cors = require( 'cors' );
const path = require( 'path' );
const helmet = require( 'helmet' );
const winston = require( 'winston' );
const compress = require( 'compression' );
const favicon = require( 'serve-favicon' );

const express = require( '@feathersjs/express' );
const feathers = require( '@feathersjs/feathers' );
const socketio = require( '@feathersjs/socketio' );
const configuration = require( '@feathersjs/configuration' );

const hooks = require( './hooks' );
const services = require( '../services' );
const channels = require( '../channels' );
const middleware = require( '../middleware' );

const app = express( feathers() );

// load app configuration
app.configure( configuration() );

// enable security, CORS, compression, favicon and body parsing
app.use( helmet() );
app.use( cors() );
app.use( compress() );
app.use( express.json() );
app.use( express.urlencoded( { extended: true } ) );
app.use( favicon( path.join( app.get( 'public' ), 'favicon.ico' ) ) );

// host the public folder
app.use( '/', express.static(app.get( 'public' ) ) );

// set up plugins and providers
app.configure( express.rest() );
app.configure( socketio() );

// api configuration
app.configure( middleware );
app.configure( services );
app.configure( channels );
app.use( express.notFound() );
app.use( express.errorHandler( { winston } ) );

app.hooks( hooks );

// others config
require( '../config/postgres.config' );

module.exports = app;