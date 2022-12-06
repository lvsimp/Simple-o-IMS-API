// Update with your config settings.
require('dotenv').config();
const {DB_PASSWORD, DB_SCHEMA_NAME, DB_USERNAME} = process.env;
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_SCHEMA_NAME,
      charset: 'utf8',
    }
  }
};
