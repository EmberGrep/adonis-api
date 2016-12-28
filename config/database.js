'use strict';

const Env = use('Env');

console.log(Env.get('DB_DATABASE'));

module.exports = {

  /*
  |--------------------------------------------------------------------------
  | Default Connection
  |--------------------------------------------------------------------------
  |
  | Connection defines the default connection settings to be used while
  | interacting with SQL databases.
  |
  */
  connection: Env.get('DB_CONNECTION', 'pg'),

  testing: {
    client: 'pg',
    connection: Env.get('DATABASE_URL', {
      host: Env.get('DB_HOST', 'localhost'),
      user: Env.get('DB_USER', 'embergrep_testing'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'embergrep_testing'),
    }),
  },

  /*
  |--------------------------------------------------------------------------
  | PostgreSQL
  |--------------------------------------------------------------------------
  |
  | Here we define connection settings for Mysql database.
  |
  | npm i --save pg
  |
  */
  pg: {
    client: 'pg',
    connection: Env.get('DATABASE_URL', {
      host: Env.get('DB_HOST', 'localhost'),
      user: Env.get('DB_USER', 'root'),
      password: Env.get('DB_PASSWORD', ''),
      database: Env.get('DB_DATABASE', 'adonis'),
    }),
  },

};
