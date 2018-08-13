'use strict';

module.exports = {

    development: {
        client: 'postgresql',
        connection: 'postgres://postgres:postgres@postgres:5432/libellule',
        migrations: {
            tableName: 'migrations',
            directory: './migrations'
        }
    }

};
